<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        protected DashboardService $dashboardService
    ) {}

    public function index(): Response
    {
        $data = $this->dashboardService->getDashboardData();

        return Inertia::render('dashboard', [
            'summary'            => $data['summary'],
            'statusDistribution' => $data['status_distribution'],
            'serviceAlerts'      => $data['service_alerts'],
        ]);
    }
}
