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
        title: 'Edit',
        href: '/booking/edit',
    },
];

export default function EditBooking({ booking, offices, drivers, vehicles, users }: BookingFormProps) {
    return (
        <>
            <Head title="Edit Booking" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="flex justify-center p-4 sm:p-8">
                    <BookingForm booking={booking} offices={offices} drivers={drivers} vehicles={vehicles} users={users} />
                </div>
            </AppLayout>
        </>
    );
}
