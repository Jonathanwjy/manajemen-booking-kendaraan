import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { DriverWithRelation } from '@/types/driver';
import { Office } from '@/types/office';
import { Head } from '@inertiajs/react';
import DriverForm from './component/driver-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Driver', href: '/driver' },
    { title: 'Edit', href: '/driver/edit' },
];

export default function EditDriver({ driver, offices }: { driver?: DriverWithRelation; offices: Office[] }) {
    return (
        <>
            <Head title="Edit Driver" />
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="flex justify-center p-4 sm:p-8">
                    <DriverForm offices={offices} driver={driver} />
                </div>
            </AppLayout>
        </>
    );
}
