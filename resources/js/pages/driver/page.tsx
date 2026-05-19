import TablePagination from '@/components/common/pagination-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { DriverProps } from '@/types/driver';
import { showConfirm } from '@/utils/alert';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Driver',
        href: '/driver',
    },
];

export default function DriverIndex({ drivers, filters }: DriverProps) {
    const handleDelete = async (id: number) => {
        const isConfirmed = await showConfirm('Remove driver?', 'Are you sure you want to remove this driver?', 'Yes, Remove');

        if (isConfirmed) {
            router.delete(`/driver/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const driversData = drivers?.data || [];
    const [search, setSearch] = useState(filters.search || '');

    return (
        <>
            <Head title="Driver" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-6 p-4 sm:p-8">
                    {/* HEADER */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-2xl font-semibold">Driver</h1>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <Input
                                placeholder="Search driver or office..."
                                value={search}
                                className="w-full sm:w-72"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSearch(value);
                                    router.get('/driver', { search: value }, { preserveState: true, replace: true });
                                }}
                            />

                            <Button asChild className="w-full sm:w-auto">
                                <Link href="/driver/create">Add Driver</Link>
                            </Button>
                        </div>
                    </div>

                    {/* TABLE — tampil di md ke atas */}
                    <div className="hidden rounded-xl border md:block">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Office</TableHead>
                                    <TableHead>Phone Number</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {driversData.length > 0 ? (
                                    driversData.map((driver, index) => (
                                        <TableRow key={driver.id}>
                                            <TableCell>{(drivers.current_page - 1) * drivers.per_page + index + 1}</TableCell>
                                            <TableCell>{driver.name}</TableCell>
                                            <TableCell>{driver.office?.name}</TableCell>
                                            <TableCell>{driver.phone_number}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                        driver.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}
                                                >
                                                    {driver.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="flex gap-2">
                                                <Button size="sm" className="cursor-pointer" asChild>
                                                    <Link href={`/driver/${driver.id}/edit`}>Edit</Link>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="cursor-pointer"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(driver.id)}
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

                    {/* CARD LIST — tampil di bawah md */}
                    <div className="space-y-3 md:hidden">
                        {driversData.length > 0 ? (
                            driversData.map((driver, index) => (
                                <div key={driver.id} className="rounded-xl border p-4 shadow-sm">
                                    <div className="mb-3">
                                        <p className="text-muted-foreground text-xs">#{(drivers.current_page - 1) * drivers.per_page + index + 1}</p>
                                        <p className="font-medium">{driver.name}</p>
                                        <p className="text-muted-foreground text-sm">{driver.office?.name}</p>
                                        <p className="text-muted-foreground text-sm">{driver.phone_number}</p>
                                        <div className="mt-2">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    driver.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}
                                            >
                                                {driver.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" className="flex-1 cursor-pointer" asChild>
                                            <Link href={`/driver/${driver.id}/edit`}>Edit</Link>
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="flex-1 cursor-pointer"
                                            variant="destructive"
                                            onClick={() => handleDelete(driver.id)}
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

                    <TablePagination links={drivers.links} />
                </div>
            </AppLayout>
        </>
    );
}
