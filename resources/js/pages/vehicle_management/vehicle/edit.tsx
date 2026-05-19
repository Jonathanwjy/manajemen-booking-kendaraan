import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { VehicleFormProps } from '@/types/vehicle';
import { Head } from '@inertiajs/react';
import VehicleForm from './component/vehicle-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Vehicle',
        href: '/vehicle',
    },
    {
        title: 'Create',
        href: '/vehicle/create',
    },
];

export default function CreateVehicle({ vehicle, vehicle_types, offices }: VehicleFormProps) {
    return (
        <>
            <Head title="Create Vehicle" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="flex justify-center p-4 sm:p-8">
                    <VehicleForm vehicle={vehicle} vehicle_types={vehicle_types} offices={offices} />
                </div>
            </AppLayout>
        </>
    );
}
