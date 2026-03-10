<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Illuminate\Database\Seeder;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        $certificates = [
            [
                'name'           => 'CDSA',
                'full_name'      => 'Certified Data Science Associate',
                'issuer'         => 'East West International Educational Specialists, Inc.',
                'image'          => '/certificates/CDSA.jpg',
                'issue_date'     => '2024-12-31',
                'certificate_no' => null,
                'score'          => null,
                'skills'         => 'Data Science, Python, Statistics, Machine Learning',
                'description'    => 'Certified Data Science Associate credential validating proficiency in data science fundamentals.',
                'is_visible'     => true,
            ],
            [
                'name'           => 'CDSP',
                'full_name'      => 'Certified Data Science Professional',
                'issuer'         => 'East West International Educational Specialists, Inc.',
                'image'          => '/certificates/CDSP.jpg',
                'issue_date'     => '2025-11-13',
                'certificate_no' => null,
                'score'          => null,
                'skills'         => 'Data Science, Python, Data Analysis, Visualization',
                'description'    => 'Certified Data Science Professional credential demonstrating advanced data science capabilities.',
                'is_visible'     => true,
            ],
            [
                'name'           => 'DATABASE',
                'full_name'      => 'Database Management Fundamentals',
                'issuer'         => 'Simplilearn',
                'image'          => '/certificates/DATABASE.jpg',
                'issue_date'     => '2024-12-07',
                'certificate_no' => null,
                'score'          => null,
                'skills'         => 'SQL, Database Design, Normalization, CRUD Operations',
                'description'    => 'Certificate covering relational database concepts, SQL queries, and database administration basics.',
                'is_visible'     => true,
            ],
            [
                'name'           => 'Networking Basics',
                'full_name'      => 'Networking Basics Certificate',
                'issuer'         => 'Cisco Networking Academy',
                'image'          => '/certificates/NetworkingBasics.jpg',
                'issue_date'     => '2024-02-05',
                'certificate_no' => null,
                'score'          => null,
                'skills'         => 'Networking, TCP/IP, OSI Model, Routing, Switching',
                'description'    => 'Foundational networking certificate covering network protocols, architecture, and troubleshooting.',
                'is_visible'     => true,
            ],
            [
                'name'           => 'NoSQL',
                'full_name'      => 'NoSQL Database Certificate',
                'issuer'         => 'Simplilearn',
                'image'          => '/certificates/NoSQL.jpg',
                'issue_date'     => '2025-12-08',
                'certificate_no' => null,
                'score'          => null,
                'skills'         => 'NoSQL, MongoDB, Document Databases, Data Modeling',
                'description'    => 'Certificate validating knowledge of NoSQL database concepts and MongoDB operations.',
                'is_visible'     => true,
            ],
            [
                'name'           => 'REACT',
                'full_name'      => 'React.js Development Certificate',
                'issuer'         => 'Simplilearn',
                'image'          => '/certificates/REACT.jpg',
                'issue_date'     => '2025-11-21',
                'certificate_no' => null,
                'score'          => null,
                'skills'         => 'React, JavaScript, JSX, Hooks, State Management',
                'description'    => 'Certificate covering React.js fundamentals including components, hooks, and state management.',
                'is_visible'     => true,
            ],
            [
                'name'           => 'TOPCIT',
                'full_name'      => 'Test of Practical Competency in ICT',
                'issuer'         => 'Test of Practical Competency in ICT (TOPCIT) in Korea',
                'image'          => '/certificates/TOPCIT.jpg',
                'issue_date'     => '2025-08-23',
                'certificate_no' => null,
                'score'          => 'Level 3',
                'skills'         => 'Software Development, Database, Networking, IT Business, Information Security',
                'description'    => 'National ICT competency exam measuring practical skills across software engineering domains.',
                'is_visible'     => true,
            ],
        ];

        foreach ($certificates as $cert) {
            Certificate::create($cert);
        }
    }
}
