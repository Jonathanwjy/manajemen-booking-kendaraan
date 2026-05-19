import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import VehicleTypeForm from './component/vehicle-type-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Vehicle Type',
        href: '/vehicle',
    },
    {
        title: 'Create',
        href: '/vehicle-type/create',
    },
];

export default function CreateVehicleType() {
    return (
        <>
            <Head title="Create Vehicle Type" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="flex justify-center p-4 sm:p-8">
                    <VehicleTypeForm />
                </div>
            </AppLayout>
        </>
    );
}
