import TablePagination from '@/components/common/pagination-table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Booking, BookingApproval, BookingProps } from '@/types/booking';
import { showConfirm } from '@/utils/alert';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Check, CheckCircle2, Download, Edit, Eye, MoreVertical, Trash2, X } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Booking',
        href: '/booking',
    },
];

export default function BookingIndex({ bookings, filters, isAdmin }: BookingProps) {
    const bookingsData = bookings.data || [];
    const [search, setSearch] = useState(filters.search || '');
    const [startDate, setStartDate] = useState(filters.start_date || '');
    const [endDate, setEndDate] = useState(filters.end_date || '');

    const { auth } = usePage<{ auth: { user: { id: number } } }>().props;

    const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const { data, setData, post, processing, reset } = useForm({
        start_odometer: '',
        end_odometer: '',
        fuel_used: '',
    });

    const applyFilters = (newSearch: string, newStart: string, newEnd: string) => {
        router.get(
            '/booking',
            {
                search: newSearch,
                start_date: newStart,
                end_date: newEnd,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleDelete = async (id: number) => {
        const isConfirmed = await showConfirm('Remove Booking?', 'Are you sure you want to remove this booking?', 'Yes, Remove');

        if (isConfirmed) {
            router.delete(`/booking/${id}`, {
                preserveScroll: true,
            });
        }
    };

    // UPDATE: Menambahkan alert konfirmasi pada saat approve/decline
    const handleAction = async (id: number, status: 'accepted' | 'declined') => {
        const title = status === 'accepted' ? 'Approve Booking?' : 'Decline Booking?';
        const text = `Are you sure you want to ${status === 'accepted' ? 'approve' : 'decline'} this booking?`;
        const confirmText = status === 'accepted' ? 'Yes, Approve' : 'Yes, Decline';

        const isConfirmed = await showConfirm(title, text, confirmText);

        if (isConfirmed) {
            router.patch(`/booking/${id}/approve`, { status: status }, { preserveScroll: true });
        }
    };

    const openFinishModal = (booking: Booking) => {
        setSelectedBooking(booking);

        setData({
            start_odometer: booking.vehicle?.odometer?.toString() || '',
            end_odometer: '',
            fuel_used: '',
        });

        setIsFinishModalOpen(true);
    };

    const closeFinishModal = () => {
        setIsFinishModalOpen(false);
        setSelectedBooking(null);
        reset();
    };

    const submitFinishBooking = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBooking) return;

        post(`/booking/${selectedBooking.id}/complete`, {
            preserveScroll: true,
            onSuccess: () => closeFinishModal(),
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'ongoing':
                return 'bg-blue-100 text-blue-800';
            case 'accepted':
            case 'completed':
            case 'finished':
                return 'bg-green-100 text-green-800';
            case 'declined':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getDisplayStatus = (booking: Booking) => {
        const userApproval = booking.booking_approval?.find(
            (approval: BookingApproval) => approval.approver_id === auth.user.id || approval.user?.id === auth.user.id,
        );

        if (userApproval) {
            return userApproval.status;
        }

        return booking.status;
    };

    return (
        <>
            <Head title="Booking" />

            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-6 p-4 sm:p-8">
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                        <h1 className="text-2xl font-semibold">Booking</h1>

                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                            <Input
                                placeholder="Search booking code..."
                                value={search}
                                className="w-full sm:w-56"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSearch(value);
                                    applyFilters(value, startDate, endDate);
                                }}
                            />

                            <Input
                                type="date"
                                value={startDate}
                                className="w-full sm:w-40"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setStartDate(value);
                                    applyFilters(search, value, endDate);
                                }}
                            />

                            <Input
                                type="date"
                                value={endDate}
                                className="w-full sm:w-40"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setEndDate(value);
                                    applyFilters(search, startDate, value);
                                }}
                            />

                            <Button asChild variant="outline" className="w-full sm:w-auto">
                                <a href={`/booking/export?search=${search}&start_date=${startDate}&end_date=${endDate}`}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Export Excel
                                </a>
                            </Button>

                            {isAdmin && (
                                <Button asChild className="w-full sm:w-auto">
                                    <Link href={route('booking.create')}>Add Booking</Link>
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="hidden rounded-xl border md:block">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Booking Code</TableHead>
                                    <TableHead>Office</TableHead>
                                    <TableHead>Vehicle</TableHead>
                                    <TableHead>Driver</TableHead>
                                    <TableHead>Dates</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-[80px] text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {bookingsData.length > 0 ? (
                                    bookingsData.map((booking, index) => {
                                        const displayStatus = getDisplayStatus(booking);
                                        return (
                                            <TableRow key={booking.id}>
                                                <TableCell>{(bookings.current_page - 1) * bookings.per_page + index + 1}</TableCell>
                                                <TableCell className="font-medium">{booking.booking_code}</TableCell>
                                                <TableCell>{booking.office?.name || '-'}</TableCell>
                                                <TableCell>{booking.vehicle?.model || '-'}</TableCell>
                                                <TableCell>{booking.driver?.name || '-'}</TableCell>
                                                <TableCell className="text-xs">
                                                    {booking.start_date} <br />
                                                    <span className="text-muted-foreground">s/d</span> <br />
                                                    {booking.end_date}
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor(displayStatus)}`}
                                                    >
                                                        {displayStatus}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/booking/${booking.id}`} className="flex cursor-pointer items-center">
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    Show Detail
                                                                </Link>
                                                            </DropdownMenuItem>

                                                            {booking.status === 'ongoing' && isAdmin && (
                                                                <DropdownMenuItem
                                                                    onClick={() => openFinishModal(booking)}
                                                                    className="flex cursor-pointer items-center text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                                                                >
                                                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                                                    Finish Book
                                                                </DropdownMenuItem>
                                                            )}

                                                            {isAdmin ? (
                                                                <>
                                                                    {booking.status === 'pending' && (
                                                                        <>
                                                                            <DropdownMenuItem asChild>
                                                                                <Link
                                                                                    href={`/booking/${booking.id}/edit`}
                                                                                    className="flex cursor-pointer items-center"
                                                                                >
                                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                                    Edit
                                                                                </Link>
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem
                                                                                onClick={() => handleDelete(booking.id)}
                                                                                className="flex cursor-pointer items-center text-red-600 focus:bg-red-50 focus:text-red-600"
                                                                            >
                                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                                Delete
                                                                            </DropdownMenuItem>
                                                                        </>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {displayStatus === 'pending' && (
                                                                        <>
                                                                            <DropdownMenuItem
                                                                                onClick={() => handleAction(booking.id, 'accepted')}
                                                                                className="flex cursor-pointer items-center text-green-600"
                                                                            >
                                                                                <Check className="mr-2 h-4 w-4" />
                                                                                Approve
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem
                                                                                onClick={() => handleAction(booking.id, 'declined')}
                                                                                className="flex cursor-pointer items-center text-red-600 focus:bg-red-50 focus:text-red-600"
                                                                            >
                                                                                <X className="mr-2 h-4 w-4" />
                                                                                Decline
                                                                            </DropdownMenuItem>
                                                                        </>
                                                                    )}
                                                                </>
                                                            )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center">
                                            Tidak ada data
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="space-y-3 md:hidden">
                        {bookingsData.length > 0 ? (
                            bookingsData.map((booking, index) => {
                                const displayStatus = getDisplayStatus(booking);
                                return (
                                    <div key={booking.id} className="relative rounded-xl border p-4 shadow-sm">
                                        <div className="absolute top-4 right-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/booking/${booking.id}`} className="flex cursor-pointer items-center">
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Show Detail
                                                        </Link>
                                                    </DropdownMenuItem>

                                                    {booking.status === 'ongoing' && isAdmin && (
                                                        <DropdownMenuItem
                                                            onClick={() => openFinishModal(booking)}
                                                            className="flex cursor-pointer items-center text-blue-600 focus:bg-blue-50 focus:text-blue-600"
                                                        >
                                                            <CheckCircle2 className="mr-2 h-4 w-4" />
                                                            Finish Book
                                                        </DropdownMenuItem>
                                                    )}

                                                    {isAdmin && booking.status === 'pending' && (
                                                        <>
                                                            <DropdownMenuItem asChild>
                                                                <Link
                                                                    href={`/booking/${booking.id}/edit`}
                                                                    className="flex cursor-pointer items-center"
                                                                >
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleDelete(booking.id)}
                                                                className="flex cursor-pointer items-center text-red-600 focus:bg-red-50 focus:text-red-600"
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                    {!isAdmin && displayStatus === 'pending' && (
                                                        <>
                                                            <DropdownMenuItem
                                                                onClick={() => handleAction(booking.id, 'accepted')}
                                                                className="flex cursor-pointer items-center text-green-600"
                                                            >
                                                                <Check className="mr-2 h-4 w-4" />
                                                                Approve
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleAction(booking.id, 'declined')}
                                                                className="flex cursor-pointer items-center text-red-600 focus:bg-red-50 focus:text-red-600"
                                                            >
                                                                <X className="mr-2 h-4 w-4" />
                                                                Decline
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div className="mb-2 space-y-1 pr-10">
                                            <p className="text-muted-foreground text-xs">
                                                #{(bookings.current_page - 1) * bookings.per_page + index + 1}
                                            </p>
                                            <p className="text-lg font-semibold">{booking.booking_code}</p>
                                            <p className="text-muted-foreground text-sm font-medium">{booking.vehicle?.model || '-'}</p>
                                            <p className="text-muted-foreground text-sm">
                                                {booking.driver?.name || '-'} • {booking.office?.name || '-'}
                                            </p>
                                            <p className="text-muted-foreground flex items-center gap-1 text-sm">
                                                {booking.start_date} - {booking.end_date}
                                            </p>

                                            <div className="pt-2">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor(displayStatus)}`}
                                                >
                                                    {displayStatus}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-muted-foreground rounded-xl border p-8 text-center">Tidak ada data</div>
                        )}
                    </div>

                    <TablePagination links={bookings.links} />
                </div>
            </AppLayout>

            {isFinishModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-background w-full max-w-md rounded-xl p-6 shadow-lg">
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">Selesaikan Booking</h2>
                            <p className="text-muted-foreground text-sm">Masukkan data pemakaian kendaraan</p>
                        </div>

                        <form onSubmit={submitFinishBooking} className="space-y-4">
                            <div className="space-y-1.5">
                                <label htmlFor="start_odometer" className="text-sm font-medium">
                                    Odometer Awal
                                </label>
                                <Input
                                    id="start_odometer"
                                    type="number"
                                    placeholder="Contoh: 15000"
                                    value={data.start_odometer}
                                    onChange={(e) => setData('start_odometer', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="end_odometer" className="text-sm font-medium">
                                    Odometer Akhir
                                </label>
                                <Input
                                    id="end_odometer"
                                    type="number"
                                    placeholder="Contoh: 15400"
                                    value={data.end_odometer}
                                    onChange={(e) => setData('end_odometer', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="fuel_used" className="text-sm font-medium">
                                    BBM Terpakai (Liter)
                                </label>
                                <Input
                                    id="fuel_used"
                                    type="number"
                                    placeholder="Contoh: 20"
                                    value={data.fuel_used}
                                    onChange={(e) => setData('fuel_used', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={closeFinishModal} disabled={processing}>
                                    Batal
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    Selesaikan
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
