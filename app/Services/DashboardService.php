<?php

namespace App\Services;

use App\Models\Vehicle;
use App\Models\VehicleUsage;
use App\Models\Service as VehicleService;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardService
{
    /**
     * Get summary stats for the dashboard cards.
     */
    public function getSummaryStats(): array
    {
        return [
            'total_vehicles'  => Vehicle::count(),
            'available'       => Vehicle::where('status', 'available')->count(),
            'in_use'          => Vehicle::where('status', 'inuse')->count(),
            'booked'          => Vehicle::where('status', 'booked')->count(),
            'in_service'      => Vehicle::where('status', 'service')->count(),
            'total_usages'    => VehicleUsage::count(),
            'total_fuel_used' => (float) VehicleUsage::sum('fuel_used'),
            'total_distance'  => (float) (VehicleUsage::selectRaw('SUM(end_odometer - start_odometer) as total')->value('total') ?? 0),
        ];
    }

    /**
     * Get vehicle status distribution (for pie chart).
     */
    public function getStatusDistribution(): array
    {
        $statuses = Vehicle::select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        $labels = ['available', 'booked', 'inuse', 'service'];
        $data   = array_map(fn($s) => $statuses[$s] ?? 0, $labels);

        return compact('labels', 'data');
    }

    /**
     * Get upcoming / ongoing service alerts.
     */
    public function getServiceAlerts(int $limit = 5): array
    {
        return VehicleService::with('vehicle:id,model,registration_number')
            ->where(function ($q) {
                $q->where('status', 'service')
                    ->orWhere('next_service_date', '<=', Carbon::now()->addDays(30));
            })
            ->orderBy('next_service_date')
            ->limit($limit)
            ->get()
            ->map(fn($s) => [
                'id'                    => $s->id,
                'vehicle_label'         => "{$s->vehicle->model} ({$s->vehicle->registration_number})",
                'next_service_date'     => $s->next_service_date,
                'next_service_odometer' => $s->next_service_odometer,
                'status'                => $s->status,
            ])
            ->toArray();
    }

    /**
     * Aggregate all dashboard data.
     */
    public function getDashboardData(): array
    {
        return [
            'summary'              => $this->getSummaryStats(),
            'status_distribution'  => $this->getStatusDistribution(),
            'service_alerts'       => $this->getServiceAlerts(),
        ];
    }
}
