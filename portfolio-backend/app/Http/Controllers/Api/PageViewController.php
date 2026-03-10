<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageView;
use App\Models\Update;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PageViewController extends Controller
{
    /**
     * Track a page view (public endpoint).
     */
    public function track(Request $request)
    {
        $validated = $request->validate([
            'page'       => 'nullable|string|max:255',
            'visitor_id' => 'nullable|string|max:255',
        ]);

        PageView::create([
            'page'       => $validated['page'] ?? '/',
            'visitor_id' => $validated['visitor_id'] ?? null,
            'ip_hash'    => hash('sha256', $request->ip()),
            'user_agent' => substr($request->userAgent() ?? '', 0, 500),
            'referrer'   => substr($request->header('referer', ''), 0, 500) ?: null,
        ]);

        return response()->json(['tracked' => true]);
    }

    /**
     * Return aggregated metrics for admin dashboard.
     */
    public function metrics()
    {
        $now      = Carbon::now();
        $today    = $now->copy()->startOfDay();
        $weekAgo  = $now->copy()->subDays(7);
        $monthAgo = $now->copy()->subDays(30);

        // ── Page views ──────────────────────────────────
        $totalViews = PageView::count();
        $todayViews = PageView::where('created_at', '>=', $today)->count();
        $weekViews  = PageView::where('created_at', '>=', $weekAgo)->count();
        $monthViews = PageView::where('created_at', '>=', $monthAgo)->count();

        // ── Unique visitors ─────────────────────────────
        $totalUnique = PageView::whereNotNull('visitor_id')
                               ->distinct('visitor_id')
                               ->count('visitor_id');
        $todayUnique = PageView::where('created_at', '>=', $today)
                               ->whereNotNull('visitor_id')
                               ->distinct('visitor_id')
                               ->count('visitor_id');
        $weekUnique  = PageView::where('created_at', '>=', $weekAgo)
                               ->whereNotNull('visitor_id')
                               ->distinct('visitor_id')
                               ->count('visitor_id');

        // ── Posts ───────────────────────────────────────
        $totalPosts     = Update::count();
        $publishedPosts = Update::where('is_published', true)->count();
        $postsThisWeek  = Update::where('created_at', '>=', $weekAgo)->count();
        $postsThisMonth = Update::where('created_at', '>=', $monthAgo)->count();

        // ── Category breakdown ──────────────────────────
        $categories = Update::whereNotNull('category')
            ->selectRaw('category, count(*) as count')
            ->groupBy('category')
            ->orderByDesc('count')
            ->get();

        // ── Certificates ────────────────────────────────
        $totalCerts   = Certificate::count();
        $visibleCerts = Certificate::where('is_visible', true)->count();

        // ── Daily views (last 7 days) ───────────────────
        $dailyViews = [];
        for ($i = 6; $i >= 0; $i--) {
            $day    = $now->copy()->subDays($i)->startOfDay();
            $dayEnd = $day->copy()->endOfDay();

            $dailyViews[] = [
                'date'   => $day->format('M d'),
                'day'    => $day->format('D'),
                'views'  => PageView::whereBetween('created_at', [$day, $dayEnd])->count(),
                'unique' => PageView::whereBetween('created_at', [$day, $dayEnd])
                                    ->whereNotNull('visitor_id')
                                    ->distinct('visitor_id')
                                    ->count('visitor_id'),
            ];
        }

        // ── Top pages ───────────────────────────────────
        $topPages = PageView::selectRaw('page, count(*) as views')
            ->groupBy('page')
            ->orderByDesc('views')
            ->limit(5)
            ->get();

        return response()->json([
            'page_views' => [
                'total'      => $totalViews,
                'today'      => $todayViews,
                'this_week'  => $weekViews,
                'this_month' => $monthViews,
            ],
            'visitors' => [
                'total'     => $totalUnique,
                'today'     => $todayUnique,
                'this_week' => $weekUnique,
            ],
            'posts' => [
                'total'      => $totalPosts,
                'published'  => $publishedPosts,
                'this_week'  => $postsThisWeek,
                'this_month' => $postsThisMonth,
            ],
            'certificates' => [
                'total'   => $totalCerts,
                'visible' => $visibleCerts,
            ],
            'categories'  => $categories,
            'daily_views' => $dailyViews,
            'top_pages'   => $topPages,
        ]);
    }
}
