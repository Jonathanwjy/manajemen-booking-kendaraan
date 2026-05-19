import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { VehicleType } from '@/types/vehicle-types';
import { Head } from '@inertiajs/react';
import VehicleTypeForm from './component/vehicle-type-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Vehicle Type',
        href: '/vehicle',
    },
    {
        title: 'Edit',
        href: '/vehicle-type/edit',
    },
];

export default function EditVehicleType({ vehicle_type }: { vehicle_type?: VehicleType }) {
    return (
        <>
            <Head title="Edit Vehicle Type" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="flex justify-center p-4 sm:p-8">
                    <VehicleTypeForm vehicleType={vehicle_type} />
                </div>
            </AppLayout>
        </>
    );
}
