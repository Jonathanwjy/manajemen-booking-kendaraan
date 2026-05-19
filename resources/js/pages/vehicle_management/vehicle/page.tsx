import TablePagination from '@/components/common/pagination-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Import komponen Dropdown Menu dari shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { showConfirm } from '@/utils/alert';

import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

import { VehicleProps, VehicleWithRelation } from '@/types/vehicle';
// Import icon dari lucide-react
import { Edit, Eye, MoreVertical, Trash2 } from 'lucide-react';

export default function VehiclePage({ vehicles, filters }: VehicleProps) {
    const vehiclesData = vehicles.data || [];

    const [search, setSearch] = useState(filters.search || '');

    const handleDelete = async (id: number) => {
        const isConfirmed = await showConfirm('Remove vehicle?', 'Are you sure you want to remove this vehicle?', 'Yes, Remove');

        if (isConfirmed) {
            router.delete(`/vehicle/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const getStatusColor = (status: VehicleWithRelation['status']) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-700';
            case 'booked':
                return 'bg-yellow-100 text-yellow-700';
            case 'inuse':
                return 'bg-blue-100 text-blue-700';
            case 'service':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold">Vehicle</h1>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <Input
                        placeholder="Search vehicle..."
                        value={search}
                        className="w-full sm:w-72"
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearch(value);
                            router.get('/vehicle', { search: value }, { preserveState: true, replace: true });
                        }}
                    />

                    <Button asChild className="w-full sm:w-auto">
                        <Link href="/vehicle/create">Add Vehicle</Link>
                    </Button>
                </div>
            </div>

            {/* TABLE DESKTOP */}
            <div className="hidden rounded-xl border md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Office</TableHead>
                            <TableHead>Vehicle Type</TableHead>
                            <TableHead>Model</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead>Registration Number</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[80px] text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {vehiclesData.length > 0 ? (
                            vehiclesData.map((vehicle, index) => (
                                <TableRow key={vehicle.id}>
                                    <TableCell>{(vehicles.current_page - 1) * vehicles.per_page + index + 1}</TableCell>
                                    <TableCell>{vehicle.office?.name}</TableCell>
                                    <TableCell>{vehicle.vehicle_type?.types}</TableCell>
                                    <TableCell>{vehicle.model}</TableCell>
                                    <TableCell>{vehicle.year}</TableCell>
                                    <TableCell>{vehicle.registration_number}</TableCell>
                                    <TableCell>
                                        <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor(vehicle.status)}`}>
                                            {vehicle.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {/* DROPDOWN DESKTOP */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/vehicle/${vehicle.id}`} className="flex cursor-pointer items-center">
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Show Detail
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/vehicle/${vehicle.id}/edit`} className="flex cursor-pointer items-center">
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(vehicle.id)}
                                                    className="flex cursor-pointer items-center text-red-600 focus:bg-red-50 focus:text-red-600"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center">
                                    Tidak ada data
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* MOBILE CARD */}
            <div className="space-y-3 md:hidden">
                {vehiclesData.length > 0 ? (
                    vehiclesData.map((vehicle, index) => (
                        <div key={vehicle.id} className="relative rounded-xl border p-4 shadow-sm">
                            {/* DROPDOWN MOBILE (Pojok Kanan Atas Card) */}
                            <div className="absolute top-4 right-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link href={`/vehicle/${vehicle.id}`} className="flex cursor-pointer items-center">
                                                <Eye className="mr-2 h-4 w-4" />
                                                Show Detail
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/vehicle/${vehicle.id}/edit`} className="flex cursor-pointer items-center">
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleDelete(vehicle.id)}
                                            className="flex cursor-pointer items-center text-red-600 focus:bg-red-50 focus:text-red-600"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="mb-2 space-y-1 pr-10">
                                <p className="text-muted-foreground text-xs">#{(vehicles.current_page - 1) * vehicles.per_page + index + 1}</p>
                                <p className="text-lg font-semibold">{vehicle.model}</p>
                                <p className="text-muted-foreground text-sm font-medium">{vehicle.registration_number}</p>
                                <p className="text-muted-foreground text-sm">
                                    {vehicle.vehicle_type?.types} • {vehicle.year}
                                </p>
                                <p className="text-muted-foreground flex items-center gap-1 text-sm">{vehicle.office?.name}</p>
                                <p className="text-muted-foreground text-sm">{vehicle.odometer.toLocaleString()} km</p>

                                <div className="pt-2">
                                    <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor(vehicle.status)}`}>
                                        {vehicle.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-muted-foreground rounded-xl border p-8 text-center">Tidak ada data</div>
                )}
            </div>

            <TablePagination links={vehicles.links} />
        </div>
    );
}
