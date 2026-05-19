import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Office } from '@/types/office';
import { Head } from '@inertiajs/react';
import DriverForm from './component/driver-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Driver', href: '/driver' },
    { title: 'Create', href: '/driver/create' },
];

export default function CreateDriver({ offices }: { offices: Office[] }) {
    return (
        <>
            <Head title="Create Driver" />
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="flex justify-center p-4 sm:p-8">
                    <DriverForm offices={offices} />
                </div>
            </AppLayout>
        </>
    );
}
