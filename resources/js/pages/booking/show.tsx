import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ShowBookingProps } from '@/types/booking';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Building, Calendar, Car, CheckCircle2, Clock, FileText, User as UserIcon, XCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Booking', href: '/booking' },
    { title: 'Detail', href: '#' },
];

export default function ShowBooking({ booking, isApprover }: ShowBookingProps) {
    const { auth } = usePage<{ auth: { user: { id: number } } }>().props;

    const currentUserApproval = booking.booking_approval?.find((approval) => approval.user?.id === auth.user.id);

    const hasActioned = currentUserApproval?.status === 'accepted' || currentUserApproval?.status === 'declined';

    const handleAction = (status: 'accepted' | 'declined') => {
        router.patch(`/booking/${booking.id}/approve`, {
            status: status,
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 capitalize">Pending</span>;

            case 'ongoing':
                return <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 capitalize">Ongoing</span>;

            case 'finished':
                return <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 capitalize">Finished</span>;

            case 'declined':
                return <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800 capitalize">Declined</span>;

            default:
                return <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800 capitalize">{status}</span>;
        }
    };

    const getApprovalStatusIcon = (status: string) => {
        switch (status) {
            case 'accepted':
                return (
                    <div className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                        <CheckCircle2 className="h-4 w-4" /> Approved
                    </div>
                );

            case 'declined':
                return (
                    <div className="flex items-center gap-1.5 text-sm font-medium text-red-600">
                        <XCircle className="h-4 w-4" /> Declined
                    </div>
                );

            default:
                return (
                    <div className="flex items-center gap-1.5 text-sm font-medium text-yellow-600">
                        <Clock className="h-4 w-4" /> Pending
                    </div>
                );
        }
    };

    return (
        <>
            <Head title={`Booking Detail - ${booking.booking_code}`} />

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-8">
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" asChild className="gap-2">
                            <Link href="/booking">
                                <ArrowLeft className="h-4 w-4" /> Back
                            </Link>
                        </Button>

                        <div className="flex items-center gap-3">
                            <span className="text-muted-foreground text-sm">Main Status:</span>
                            {getStatusBadge(booking.status)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="space-y-6 md:col-span-2">
                            <div className="bg-card space-y-6 rounded-xl border p-6 shadow-sm">
                                <div>
                                    <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">Booking Code</p>

                                    <h1 className="text-primary mt-1 text-2xl font-bold">{booking.booking_code}</h1>
                                </div>

                                <hr />

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="flex items-start gap-3">
                                        <Building className="text-muted-foreground mt-0.5 h-5 w-5" />

                                        <div>
                                            <p className="text-muted-foreground text-xs font-semibold">Office</p>

                                            <p className="mt-0.5 font-medium">{booking.office?.name || '-'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Car className="text-muted-foreground mt-0.5 h-5 w-5" />

                                        <div>
                                            <p className="text-muted-foreground text-xs font-semibold">Vehicle</p>

                                            <p className="mt-0.5 font-medium">{booking.vehicle?.model || '-'}</p>

                                            <p className="text-muted-foreground text-xs font-medium">{booking.vehicle?.registration_number}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <UserIcon className="text-muted-foreground mt-0.5 h-5 w-5" />

                                        <div>
                                            <p className="text-muted-foreground text-xs font-semibold">Driver</p>

                                            <p className="mt-0.5 font-medium">{booking.driver?.name || '-'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />

                                        <div>
                                            <p className="text-muted-foreground text-xs font-semibold">Usage Duration</p>

                                            <p className="mt-0.5 text-sm font-medium">
                                                {formatDate(booking.start_date)} <br />
                                                <span className="text-muted-foreground text-xs font-normal">until</span> <br />
                                                {formatDate(booking.end_date)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <div className="flex items-start gap-3">
                                    <FileText className="text-muted-foreground mt-0.5 h-5 w-5" />

                                    <div className="w-full">
                                        <p className="text-muted-foreground text-xs font-semibold">Purpose / Objective</p>

                                        <div className="bg-muted/40 text-foreground mt-1.5 rounded-lg p-4 text-sm leading-relaxed whitespace-pre-line">
                                            {booking.purpose}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-card space-y-4 rounded-xl border p-6 shadow-sm">
                                {isApprover && !hasActioned ? (
                                    <>
                                        <h3 className="text-base font-semibold">Approval Action</h3>

                                        <p className="text-muted-foreground text-sm">Please review this booking request.</p>

                                        <div className="flex gap-3 pt-2">
                                            <Button
                                                className="w-full cursor-pointer bg-green-600 hover:bg-green-700"
                                                onClick={() => handleAction('accepted')}
                                            >
                                                Approve
                                            </Button>

                                            <Button variant="destructive" className="w-full cursor-pointer" onClick={() => handleAction('declined')}>
                                                Decline
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-base font-semibold tracking-tight">Authorized Approvals</h3>

                                        <p className="text-muted-foreground text-xs">
                                            This booking requires approval from all of the following parties:
                                        </p>

                                        <div className="space-y-3 pt-2">
                                            {booking.booking_approval && booking.booking_approval.length > 0 ? (
                                                booking.booking_approval.map((approval) => (
                                                    <div
                                                        key={approval.id}
                                                        className="bg-muted/20 flex items-center justify-between rounded-lg border p-3"
                                                    >
                                                        <div className="space-y-0.5">
                                                            <p className="text-sm font-medium">
                                                                {approval.user?.name || 'Unknown User'}
                                                                {approval.approver_id === auth.user.id && ' (You)'}
                                                            </p>

                                                            <p className="text-muted-foreground text-[10px]">Approver</p>
                                                        </div>

                                                        {getApprovalStatusIcon(approval.status)}
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-muted-foreground py-4 text-center text-xs">
                                                    No approver assigned for this booking.
                                                </p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
