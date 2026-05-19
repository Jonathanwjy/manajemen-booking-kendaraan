import TablePagination from '@/components/common/pagination-table';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { VehicleTypeProps } from '@/types/vehicle-types';
import { Link, router } from '@inertiajs/react';

import { showConfirm } from '@/utils/alert';

export default function VehicleTypePage({ vehicle_types }: VehicleTypeProps) {
    const vehicleTypeData = vehicle_types?.data || [];

    const handleDelete = async (id: number) => {
        const isConfirmed = await showConfirm('Remove vehicle type?', 'Are you sure you want to remove this vehicle type?', 'Yes, Remove');

        if (isConfirmed) {
            router.delete(`/vehicle-type/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold">Vehicle Type</h1>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <Button asChild className="w-full sm:w-auto">
                        <Link href="/vehicle-type/create">Add Vehicle Type</Link>
                    </Button>
                </div>
            </div>

            <div className="hidden rounded-xl border md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Vehicle Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {vehicleTypeData.length > 0 ? (
                            vehicleTypeData.map((vehicleType, index) => (
                                <TableRow key={vehicleType.id}>
                                    <TableCell>{(vehicle_types.current_page - 1) * vehicle_types.per_page + index + 1}</TableCell>
                                    <TableCell>{vehicleType.types}</TableCell>
                                    <TableCell>{vehicleType.description}</TableCell>

                                    <TableCell className="flex gap-2">
                                        <Button size="sm" asChild>
                                            <Link href={`/vehicle-type/${vehicleType.id}/edit`}>Edit</Link>
                                        </Button>

                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(vehicleType.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    Tidak ada data
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="space-y-3 md:hidden">
                {vehicleTypeData.length > 0 ? (
                    vehicleTypeData.map((vehicleType, index) => (
                        <div key={vehicleType.id} className="rounded-xl border p-4">
                            <div className="mb-4">
                                <p className="text-muted-foreground text-xs">
                                    #{(vehicle_types.current_page - 1) * vehicle_types.per_page + index + 1}
                                </p>

                                <p className="font-medium">{vehicleType.types}</p>
                                <p className="text-sm">{vehicleType.description}</p>
                            </div>

                            <div className="flex gap-2">
                                <Button size="sm" className="flex-1" asChild>
                                    <Link href={`/vehicle-type/${vehicleType.id}/edit`}>Edit</Link>
                                </Button>

                                <Button
                                    size="sm"
                                    className="flex-1 cursor-pointer"
                                    variant="destructive"
                                    onClick={() => handleDelete(vehicleType.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-muted-foreground rounded-xl border p-8 text-center">Tidak ada data</div>
                )}
            </div>

            <TablePagination links={vehicle_types.links} />
        </div>
    );
}
