import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Service } from '@/types/service';
import { VehicleShowProps } from '@/types/vehicle';
import { Head, Link } from '@inertiajs/react';
import { Building, CarFront, Hash, History, Info, Settings, Tag, Wrench } from 'lucide-react';

export default function ShowVehicle({ vehicle }: { vehicle: VehicleShowProps }) {
    // Add these interfaces near the top of the file (after imports)
    interface VehicleUsage {
        id: number;
        created_at: string;
        driver?: { name: string };
        start_odometer: number;
        end_odometer: number;
        fuel_used: number;
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Vehicle',
            href: '/vehicle',
        },
        {
            title: 'Detail',
            href: `/vehicle/${vehicle.id}`,
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'booked':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'inuse':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'service':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <>
            <Head title={`Vehicle Detail - ${vehicle.model}`} />

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="mx-auto flex max-w-5xl justify-center p-4 sm:p-8">
                    <div className="w-full space-y-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                                    <CarFront className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">{vehicle.model}</h2>
                                    <p className="text-muted-foreground text-sm">{vehicle.registration_number}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" asChild>
                                    <Link href="/vehicle">Back</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={`/vehicle/${vehicle.id}/edit`}>Edit Vehicle</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="bg-card rounded-xl border shadow-sm">
                            <div className="grid grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
                                <div className="space-y-6 p-6">
                                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                                        <Info className="text-muted-foreground h-5 w-5" />
                                        General Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-muted-foreground text-sm">Vehicle Model</p>
                                            <p className="text-base font-medium">{vehicle.model}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-sm">License Plate</p>
                                            <p className="text-base font-medium uppercase">{vehicle.registration_number}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-sm">Manufacture Year</p>
                                            <p className="text-base font-medium">{vehicle.year}</p>
                                        </div>
                                        <div>
                                            <div>
                                                <p className="text-muted-foreground text-sm">Vehicle Type</p>
                                                <p className="text-base font-medium">{vehicle.vehicle_type?.types}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 p-6">
                                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                                        <Settings className="text-muted-foreground h-5 w-5" />
                                        Status & Ownership
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-muted-foreground text-sm">Office / Placement</p>
                                            <p className="flex items-center gap-1 text-base font-medium">
                                                <Building className="text-muted-foreground h-4 w-4" />
                                                {vehicle.office?.name}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between border-t pt-4">
                                            <div>
                                                <p className="text-muted-foreground text-sm">Odometer</p>
                                                <p className="flex items-center gap-1 text-base font-medium">
                                                    <Hash className="text-muted-foreground h-4 w-4" />
                                                    {vehicle.odometer?.toLocaleString('en-US')} km
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-right text-sm">Status</p>
                                                <span
                                                    className={`mt-1 inline-block rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase ${getStatusColor(vehicle.status)}`}
                                                >
                                                    {vehicle.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4">
                                            <p className="text-muted-foreground text-sm">Ownership Status</p>
                                            <div className="mt-1 flex items-center gap-2">
                                                <span className="bg-secondary text-secondary-foreground rounded-md px-2.5 py-0.5 text-sm font-medium capitalize">
                                                    {vehicle.ownership === 'owned' ? 'Owned' : 'Rented'}
                                                </span>
                                                {vehicle.ownership === 'rent' && vehicle.vendor && (
                                                    <span className="text-muted-foreground flex items-center gap-1 text-sm">
                                                        <Tag className="h-3 w-3" />
                                                        Vendor: <span className="text-foreground font-medium">{vehicle.vendor}</span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card rounded-xl border p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                                <History className="text-muted-foreground h-5 w-5" />
                                Usage History
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-muted text-muted-foreground border-b">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">Date</th>
                                            <th className="px-4 py-3 font-medium">Driver</th>
                                            <th className="px-4 py-3 font-medium">Start Odometer</th>
                                            <th className="px-4 py-3 font-medium">End Odometer</th>
                                            <th className="px-4 py-3 font-medium">Fuel Used</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {vehicle.vehicle_usage && vehicle.vehicle_usage.length > 0 ? (
                                            vehicle.vehicle_usage.map((usage: VehicleUsage) => (
                                                <tr key={usage.id} className="hover:bg-muted/50">
                                                    <td className="px-4 py-3">{formatDate(usage.created_at)}</td>
                                                    <td className="px-4 py-3 font-medium">{usage.driver?.name || '-'}</td>
                                                    <td className="px-4 py-3">{usage.start_odometer.toLocaleString('en-US')} km</td>
                                                    <td className="px-4 py-3">{usage.end_odometer.toLocaleString('en-US')} km</td>
                                                    <td className="px-4 py-3">{usage.fuel_used.toLocaleString('en-US')} L</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="text-muted-foreground px-4 py-6 text-center">
                                                    No usage history available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-card rounded-xl border p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                                <Wrench className="text-muted-foreground h-5 w-5" />
                                Service History
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-muted text-muted-foreground border-b">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">Service Date</th>
                                            <th className="px-4 py-3 font-medium">Odometer</th>
                                            <th className="px-4 py-3 font-medium">Status</th>
                                            <th className="px-4 py-3 font-medium">Notes</th>
                                            <th className="px-4 py-3 font-medium">Next Service</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {vehicle.service && vehicle.service.length > 0 ? (
                                            vehicle.service.map((serviceItem: Service) => (
                                                <tr key={serviceItem.id} className="hover:bg-muted/50">
                                                    <td className="px-4 py-3">{formatDate(serviceItem.service_date)}</td>
                                                    <td className="px-4 py-3">{serviceItem.odometer.toLocaleString('en-US')} km</td>
                                                    <td className="px-4 py-3 capitalize">
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                                serviceItem.status === 'finished'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : 'bg-orange-100 text-orange-700'
                                                            }`}
                                                        >
                                                            {serviceItem.status}
                                                        </span>
                                                    </td>
                                                    <td className="max-w-[200px] truncate px-4 py-3" title={serviceItem.notes ?? undefined}>
                                                        {serviceItem.notes ?? '-'}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {formatDate(serviceItem.next_service_date)} <br />
                                                        <span className="text-muted-foreground text-xs">
                                                            ({serviceItem.next_service_odometer.toLocaleString('en-US')} km)
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="text-muted-foreground px-4 py-6 text-center">
                                                    No service history available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
