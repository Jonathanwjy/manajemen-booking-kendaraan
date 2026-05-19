<?php

namespace App\Exports;

use App\Models\Booking;
use App\Models\User;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Border;

class BookingsExport implements FromQuery, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
    protected ?string $search;
    protected ?string $startDate;
    protected ?string $endDate;
    protected User $user;

    public function __construct(?string $search, ?string $startDate, ?string $endDate, User $user)
    {
        $this->search = $search;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->user = $user;
    }

    public function query()
    {
        $query = Booking::with(['vehicle', 'driver', 'office']);

        if ($this->user->role !== 'admin') {
            $query->whereHas('BookingApproval', function ($q) {
                $q->where('approver_id', $this->user->id);
            });
        }

        return $query->when($this->search, fn($q, $s) => $q->where('booking_code', 'ilike', "%{$s}%"))
            ->when($this->startDate, fn($q, $date) => $q->whereDate('start_date', '>=', $date))
            ->when($this->endDate, fn($q, $date) => $q->whereDate('end_date', '<=', $date))
            ->latest();
    }

    public function headings(): array
    {
        return [
            'Booking Code',
            'Office',
            'Vehicle',
            'Driver',
            'Purpose',
            'Start Date',
            'End Date',
            'Status',
            'Created At'
        ];
    }

    public function map($booking): array
    {
        return [
            $booking->booking_code,
            $booking->office->name ?? '-',
            $booking->vehicle->model ?? '-',
            $booking->driver->name ?? '-',
            $booking->purpose,
            $booking->start_date,
            $booking->end_date,
            ucfirst($booking->status),
            $booking->created_at->format('Y-m-d H:i:s'),
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();
        $range = 'A1:' . $highestColumn . $highestRow;

        return [
            1 => ['font' => ['bold' => true]],

            $range => [
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['argb' => '00000000'],
                    ],
                ],
            ],
        ];
    }
}
