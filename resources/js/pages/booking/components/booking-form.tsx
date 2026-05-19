import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BookingFormProps } from '@/types/booking';
import { useForm } from '@inertiajs/react';
import { CalendarCheck } from 'lucide-react';
import { useMemo } from 'react';

export default function BookingForm({ booking, offices, vehicles, drivers, users }: BookingFormProps) {
    const isEdit = !!booking;

    const { data, setData, post, put, processing, errors } = useForm({
        office_id: booking?.office_id ?? '',
        vehicle_id: booking?.vehicle_id ?? '',
        driver_id: booking?.driver_id ?? '',
        approver_ids: booking?.booking_approval?.map((a: any) => a.approver_id) ?? ([] as number[]),
        booking_code: booking?.booking_code ?? '',
        purpose: booking?.purpose ?? '',
        start_date: booking?.start_date ?? '',
        end_date: booking?.end_date ?? '',
        status: booking?.status ?? 'pending',
    });

    const filteredVehicles = useMemo(() => {
        if (!data.office_id) return [];
        return vehicles.filter((v) => v.office_id == data.office_id);
    }, [data.office_id, vehicles]);

    const filteredDrivers = useMemo(() => {
        if (!data.office_id) return [];
        return drivers.filter((d) => d.office_id == data.office_id);
    }, [data.office_id, drivers]);

    const handleOfficeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newOfficeId = Number(e.target.value);
        setData((prevData) => ({
            ...prevData,
            office_id: newOfficeId,
            vehicle_id: '',
            driver_id: '',
        }));
    };

    const handleApproverChange = (userId: number, checked: boolean) => {
        if (checked) {
            setData('approver_ids', [...data.approver_ids, userId]);
        } else {
            setData(
                'approver_ids',
                data.approver_ids.filter((id: number) => id !== userId),
            );
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && booking) {
            put(`/booking/${booking.id}`);
        } else {
            post('/booking');
        }
    };

    const selectClassName =
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50';

    return (
        <div className="w-full max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <CalendarCheck className="h-5 w-5" />
                </div>

                <div>
                    <h2 className="text-base font-semibold">{isEdit ? 'Edit Booking' : 'Add New Booking'}</h2>

                    <p className="text-muted-foreground text-sm">
                        {isEdit ? 'Update vehicle booking detail information' : 'Fill in the complete vehicle booking information'}
                    </p>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className="bg-card rounded-xl border p-4 shadow-sm sm:p-6">
                    {isEdit && (
                        <div className="mb-6 space-y-1.5">
                            <Label htmlFor="booking_code" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                Booking Code
                            </Label>

                            <Input id="booking_code" type="text" value={data.booking_code} disabled className="bg-gray-100" />
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="office_id" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                Office (Departure Location)
                            </Label>

                            <select id="office_id" className={selectClassName} value={data.office_id} onChange={handleOfficeChange}>
                                <option value="" disabled>
                                    Select Office
                                </option>

                                {offices.map((office) => (
                                    <option key={office.id} value={office.id}>
                                        {office.name}
                                    </option>
                                ))}
                            </select>

                            <InputError message={errors.office_id} />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="vehicle_id" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                Vehicle
                            </Label>

                            <select
                                id="vehicle_id"
                                className={selectClassName}
                                value={data.vehicle_id}
                                onChange={(e) => setData('vehicle_id', Number(e.target.value))}
                                disabled={!data.office_id}
                            >
                                <option value="" disabled>
                                    {data.office_id ? ' Select Vehicle ' : 'Select Office First'}
                                </option>

                                {filteredVehicles.map((vehicle) => (
                                    <option key={vehicle.id} value={vehicle.id}>
                                        {vehicle.model} - {vehicle.registration_number}
                                    </option>
                                ))}
                            </select>

                            {data.office_id && filteredVehicles.length === 0 && (
                                <p className="text-xs text-red-500">No vehicles available in this office.</p>
                            )}

                            <InputError message={errors.vehicle_id} />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="driver_id" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                Driver
                            </Label>

                            <select
                                id="driver_id"
                                className={selectClassName}
                                value={data.driver_id}
                                onChange={(e) => setData('driver_id', Number(e.target.value))}
                                disabled={!data.office_id}
                            >
                                <option value="" disabled>
                                    {data.office_id ? ' Select Driver ' : 'Select Office First'}
                                </option>

                                {filteredDrivers.map((driver) => (
                                    <option key={driver.id} value={driver.id}>
                                        {driver.name}
                                    </option>
                                ))}
                            </select>

                            {data.office_id && filteredDrivers.length === 0 && (
                                <p className="text-xs text-red-500">No drivers available in this office.</p>
                            )}

                            <InputError message={errors.driver_id} />
                        </div>

                        {isEdit && (
                            <div className="space-y-1.5">
                                <Label htmlFor="status" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                    Booking Status
                                </Label>

                                <select
                                    id="status"
                                    className={selectClassName}
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value as typeof data.status)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="finished">Finished</option>
                                    <option value="declined">Declined</option>
                                </select>

                                <InputError message={errors.status} />
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <Label htmlFor="start_date" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                Start Date
                            </Label>

                            <Input id="start_date" type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} />

                            <InputError message={errors.start_date} />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="end_date" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                End Date
                            </Label>

                            <Input id="end_date" type="date" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} />

                            <InputError message={errors.end_date} />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <Label className="text-muted-foreground text-xs font-semibold tracking-wide">Select Approvers</Label>

                            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                                {users.map((user) => (
                                    <label
                                        key={user.id}
                                        className="flex cursor-pointer items-center space-x-3 rounded-md border p-3 hover:bg-gray-50"
                                    >
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            value={user.id}
                                            checked={data.approver_ids.includes(user.id)}
                                            onChange={(e) => handleApproverChange(user.id, e.target.checked)}
                                        />

                                        <span className="text-sm font-medium">{user.name}</span>
                                    </label>
                                ))}
                            </div>

                            <InputError message={errors.approver_ids as string} />
                        </div>
                    </div>

                    <div className="mt-6 mb-6 space-y-1.5">
                        <Label htmlFor="purpose" className="text-muted-foreground text-xs font-semibold tracking-wide">
                            Purpose / Booking Objective
                        </Label>

                        <Textarea
                            id="purpose"
                            placeholder="Describe the purpose of vehicle usage in detail..."
                            value={data.purpose}
                            onChange={(e) => setData('purpose', e.target.value)}
                            className="h-24 resize-none"
                        />

                        <InputError message={errors.purpose} />
                    </div>

                    <div className="mt-4 flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
                        <Button type="button" variant="destructive" onClick={() => window.history.back()} className="w-full cursor-pointer sm:w-auto">
                            Cancel
                        </Button>

                        <Button type="submit" disabled={processing} className="w-full cursor-pointer sm:w-auto">
                            {processing ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Booking'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
