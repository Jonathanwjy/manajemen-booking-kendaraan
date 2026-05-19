import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ServiceFormProps } from '@/types/service';
import { Head } from '@inertiajs/react';
import ServiceForm from './components/service-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Service',
        href: '/service',
    },
    {
        title: 'Create',
        href: '/service/create',
    },
];

export default function CreateService({ vehicles }: ServiceFormProps) {
    return (
        <>
            <Head title="Create Service" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="flex justify-center p-4 sm:p-8">
                    <ServiceForm vehicles={vehicles} />
                </div>
            </AppLayout>
        </>
    );
}
