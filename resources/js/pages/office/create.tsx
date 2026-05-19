import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import OfficeForm from './_component/office-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Office',
        href: '/office',
    },
    {
        title: 'Create',
        href: '/office/create',
    },
];

export default function CreateOffice() {
    return (
        <>
            <Head title="Create Office" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="flex justify-center p-4 sm:p-8">
                    <OfficeForm />
                </div>
            </AppLayout>
        </>
    );
}
