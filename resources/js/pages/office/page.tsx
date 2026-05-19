import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { OfficeProps } from '@/types/office';
import { showConfirm } from '@/utils/alert';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Office',
        href: '/office',
    },
];

export default function OfficeIndex({ offices }: OfficeProps) {
    const handleDelete = async (id: number) => {
        const isConfirmed = await showConfirm('Remove Office?', 'Are you sure you want to remove this office?', 'Yes, Remove');

        if (isConfirmed) {
            router.delete(`/office/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Office" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-6 p-4 sm:p-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-2xl font-semibold">Office</h1>

                        <Button asChild className="w-full sm:w-auto">
                            <Link href="/office/create">Add Office</Link>
                        </Button>
                    </div>

                    <div className="hidden rounded-xl border md:block">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {offices.length > 0 ? (
                                    offices.map((office, index) => (
                                        <TableRow key={office.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{office.name}</TableCell>
                                            <TableCell>{office.location}</TableCell>
                                            <TableCell className="flex gap-2">
                                                <Button size="sm" variant="default" asChild>
                                                    <Link href={`/office/${office.id}/edit`}>Edit</Link>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="cursor-pointer"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(office.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center">
                                            Tidak ada data
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="space-y-3 md:hidden">
                        {offices.length > 0 ? (
                            offices.map((office, index) => (
                                <div key={office.id} className="rounded-xl border p-4 shadow-sm">
                                    <div className="mb-3 flex items-start justify-between gap-2">
                                        <div>
                                            <p className="text-muted-foreground text-xs">#{index + 1}</p>
                                            <p className="font-medium">{office.name}</p>
                                            <p className="text-muted-foreground text-sm">{office.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="default" asChild className="flex-1">
                                            <Link href={`/office/${office.id}/edit`}>Edit</Link>
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="flex-1 cursor-pointer"
                                            variant="destructive"
                                            onClick={() => handleDelete(office.id)}
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
        </>
    );
}
