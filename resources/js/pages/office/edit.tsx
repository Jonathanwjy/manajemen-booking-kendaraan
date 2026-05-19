import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Office } from '@/types/office';
import { Head } from '@inertiajs/react';
import OfficeForm from './_component/office-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Office',
        href: '/office',
    },
    {
        title: 'Edit',
        href: '/office/edit',
    },
];

export default function EditOffice({ office }: { office?: Office }) {
    return (
        <>
            <Head title="Edit Office" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="flex justify-center p-4 sm:p-8">
                    <OfficeForm office={office} />
                </div>
            </AppLayout>
        </>
    );
}
