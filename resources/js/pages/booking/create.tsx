import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { BookingFormProps } from '@/types/booking';
import { Head } from '@inertiajs/react';
import BookingForm from './components/booking-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Booking',
        href: '/booking',
    },
    {
        title: 'Create',
        href: '/booking/create',
    },
];

export default function CreateBooking({ offices, drivers, vehicles, users }: BookingFormProps) {
    return (
        <>
            <Head title="Create Booking" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="flex justify-center p-4 sm:p-8">
                    <BookingForm offices={offices} drivers={drivers} vehicles={vehicles} users={users} />
                </div>
            </AppLayout>
        </>
    );
}
