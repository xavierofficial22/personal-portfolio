<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class SupabaseStorage
{
    private string $url;
    private string $key;
    private string $bucket;

    public function __construct()
    {
        $this->url = rtrim(env('SUPABASE_URL', ''), '/');
        $this->key = env('SUPABASE_KEY', '');
        $this->bucket = env('SUPABASE_BUCKET', 'updates');
    }

    /**
     * Upload a file to Supabase Storage.
     * Returns the public URL of the uploaded file.
     */
    public function upload(UploadedFile $file, string $folder = ''): string
    {
        $filename = $folder . '/' . Str::uuid() . '.' . $file->getClientOriginalExtension();

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->key,
            'Content-Type'  => $file->getMimeType(),
        ])->withBody(
            file_get_contents($file->getRealPath()),
            $file->getMimeType()
        )->post("{$this->url}/storage/v1/object/{$this->bucket}/{$filename}");

        if ($response->failed()) {
            throw new \RuntimeException('Supabase upload failed: ' . $response->body());
        }

        // Return the public URL
        return "{$this->url}/storage/v1/object/public/{$this->bucket}/{$filename}";
    }

    /**
     * Delete a file from Supabase Storage by its public URL.
     */
    public function delete(string $publicUrl): void
    {
        // Extract the path from the full URL
        $prefix = "{$this->url}/storage/v1/object/public/{$this->bucket}/";
        $path = str_replace($prefix, '', $publicUrl);

        if (empty($path) || $path === $publicUrl) {
            return; // Not a Supabase URL, skip
        }

        Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->key,
        ])->delete("{$this->url}/storage/v1/object/{$this->bucket}", [
            'prefixes' => [$path],
        ]);
    }
}
