import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Service, ServiceProps } from '@/types/service';
import { showConfirm } from '@/utils/alert';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Service',
        href: '/service',
    },
];

export default function ServiceIndex({ services }: ServiceProps) {
    const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const { data, setData, patch, processing, reset, errors } = useForm({
        next_service_date: '',
        next_service_odometer: '',
    });

    const openFinishModal = (service: Service) => {
        setSelectedService(service);
        setData({ next_service_date: '', next_service_odometer: '' });
        setIsFinishModalOpen(true);
    };

    const closeFinishModal = () => {
        setIsFinishModalOpen(false);
        setSelectedService(null);
        reset();
    };

    const submitFinishService = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedService) return;

        patch(`/service/${selectedService.id}/finish`, {
            preserveScroll: true,
            onSuccess: () => closeFinishModal(),
        });
    };

    const handleDelete = async (id: number) => {
        const isConfirmed = await showConfirm('Remove Service?', 'Are you sure you want to remove this service?', 'Yes, Remove');

        if (isConfirmed) {
            router.delete(`/service/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Service" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-6 p-4 sm:p-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-2xl font-semibold">Service</h1>

                        <Button asChild className="w-full sm:w-auto">
                            <Link href="/service/create">Add Service</Link>
                        </Button>
                    </div>

                    {/* Desktop */}
                    <div className="hidden rounded-xl border md:block">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Vehicle</TableHead>
                                    <TableHead>Service Date</TableHead>
                                    <TableHead>Odometer</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {services.data.length > 0 ? (
                                    services.data.map((service, index) => (
                                        <TableRow key={service.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{service.vehicle?.registration_number}</TableCell>
                                            <TableCell>{service.service_date}</TableCell>
                                            <TableCell>{service.odometer}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                        service.status === 'finished'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-yellow-100 text-yellow-700'
                                                    }`}
                                                >
                                                    {service.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="flex gap-2">
                                                {service.status === 'service' && (
                                                    <Button
                                                        size="sm"
                                                        variant="default"
                                                        className="cursor-pointer bg-green-600 hover:bg-green-700"
                                                        onClick={() => openFinishModal(service)}
                                                    >
                                                        Finish
                                                    </Button>
                                                )}

                                                <Button size="sm" variant="outline" asChild>
                                                    <Link href={`/service/${service.id}/edit`}>Edit</Link>
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    className="cursor-pointer"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(service.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            Tidak ada data
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile */}
                    <div className="space-y-3 md:hidden">
                        {services.data.length > 0 ? (
                            services.data.map((service, index) => (
                                <div key={service.id} className="rounded-xl border p-4 shadow-sm">
                                    <div className="mb-3 flex items-start justify-between gap-2">
                                        <div>
                                            <p className="text-muted-foreground text-xs">#{index + 1}</p>
                                            <p className="font-medium">{service.vehicle?.registration_number}</p>
                                            <p className="text-muted-foreground text-sm">{service.service_date}</p>
                                            <p className="text-muted-foreground text-sm">Odometer: {service.odometer}</p>
                                            <div className="mt-2">
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                        service.status === 'finished'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-yellow-100 text-yellow-700'
                                                    }`}
                                                >
                                                    {service.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        {service.status === 'service' && (
                                            <Button
                                                size="sm"
                                                className="flex-1 cursor-pointer bg-green-600 hover:bg-green-700"
                                                onClick={() => openFinishModal(service)}
                                            >
                                                Finish
                                            </Button>
                                        )}

                                        <Button size="sm" variant="outline" asChild className="flex-1">
                                            <Link href={`/service/${service.id}/edit`}>Edit</Link>
                                        </Button>

                                        <Button
                                            size="sm"
                                            className="flex-1 cursor-pointer"
                                            variant="destructive"
                                            onClick={() => handleDelete(service.id)}
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
                </div>
            </AppLayout>

            {/* Modal Finish Service */}
            {isFinishModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-background w-full max-w-md rounded-xl p-6 shadow-lg">
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">Selesaikan Service</h2>
                            <p className="text-muted-foreground text-sm">Kendaraan: {selectedService?.vehicle?.registration_number}</p>
                        </div>

                        <form onSubmit={submitFinishService} className="space-y-4">
                            <div className="space-y-1.5">
                                <label htmlFor="next_service_date" className="text-sm font-medium">
                                    Next Service Date
                                </label>
                                <Input
                                    id="next_service_date"
                                    type="date"
                                    value={data.next_service_date}
                                    onChange={(e) => setData('next_service_date', e.target.value)}
                                    required
                                />
                                {errors.next_service_date && <p className="text-destructive text-xs">{errors.next_service_date}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="next_service_odometer" className="text-sm font-medium">
                                    Next Service Odometer
                                </label>
                                <Input
                                    id="next_service_odometer"
                                    type="number"
                                    placeholder="Contoh: 25000"
                                    value={data.next_service_odometer}
                                    onChange={(e) => setData('next_service_odometer', e.target.value)}
                                    required
                                />
                                {errors.next_service_odometer && <p className="text-destructive text-xs">{errors.next_service_odometer}</p>}
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={closeFinishModal} disabled={processing}>
                                    Batal
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Selesaikan'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
