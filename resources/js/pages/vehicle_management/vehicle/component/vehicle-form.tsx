import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VehicleFormProps } from '@/types/vehicle';
import { useForm } from '@inertiajs/react';
import { CarFront } from 'lucide-react';

export default function VehicleForm({ vehicle, offices, vehicle_types }: VehicleFormProps) {
    const isEdit = !!vehicle;

    const { data, setData, post, put, processing, errors } = useForm({
        office_id: vehicle?.office_id ?? '',
        vehicle_type_id: vehicle?.vehicle_type_id ?? '',
        model: vehicle?.model ?? '',
        year: vehicle?.year ?? '',
        registration_number: vehicle?.registration_number ?? '',
        ownership: vehicle?.ownership ?? 'owned',
        vendor: vehicle?.vendor ?? '',
        odometer: vehicle?.odometer ?? 0,
        status: vehicle?.status ?? 'available',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(`/vehicle/${vehicle.id}`);
        } else {
            post('/vehicle');
        }
    };

    const selectClassName =
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    return (
        <div className="w-full max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <CarFront className="h-5 w-5" />
                </div>
                <div>
                    <h2 className="text-base font-semibold">{isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
                    <p className="text-muted-foreground text-sm">
                        {isEdit ? 'Update vehicle detail information' : 'Fill in the complete vehicle detail information'}
                    </p>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className="bg-card rounded-xl border p-4 shadow-sm sm:p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="model" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                Vehicle Model
                            </Label>
                            <Input
                                id="model"
                                type="text"
                                placeholder="e.g. Toyota Avanza"
                                value={data.model}
                                onChange={(e) => setData('model', e.target.value)}
                            />
                            <InputError message={errors.model} />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="registration_number" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                License Plate
                            </Label>
                            <Input
                                id="registration_number"
                                type="text"
                                placeholder="e.g. B 1234 XYZ"
                                value={data.registration_number}
                                onChange={(e) => setData('registration_number', e.target.value)}
                            />
                            <InputError message={errors.registration_number} />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="vehicle_type_id" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                Vehicle Type
                            </Label>
                            <select
                                id="vehicle_type_id"
                                className={selectClassName}
                                value={data.vehicle_type_id}
                                onChange={(e) => setData('vehicle_type_id', e.target.value)}
                            >
                                <option value="" disabled>
                                    Select Vehicle Type
                                </option>
                                {vehicle_types.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.types}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.vehicle_type_id} />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="office_id" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                Office
                            </Label>
                            <select
                                id="office_id"
                                className={selectClassName}
                                value={data.office_id}
                                onChange={(e) => setData('office_id', e.target.value)}
                            >
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
                            <Label htmlFor="year" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                Manufacture Year
                            </Label>
                            <Input
                                id="year"
                                type="number"
                                placeholder="e.g. 2022"
                                value={data.year}
                                onChange={(e) => setData('year', e.target.value)}
                            />
                            <InputError message={errors.year} />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="odometer" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                Odometer (km)
                            </Label>
                            <Input
                                id="odometer"
                                type="number"
                                placeholder="e.g. 15000"
                                value={data.odometer}
                                onChange={(e) => setData('odometer', Number(e.target.value))}
                            />
                            <InputError message={errors.odometer} />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="ownership" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                Ownership
                            </Label>
                            <select
                                id="ownership"
                                className={selectClassName}
                                value={data.ownership}
                                onChange={(e) => setData('ownership', e.target.value as 'owned' | 'rent')}
                            >
                                <option value="owned">Owned</option>
                                <option value="rent">Rented</option>
                            </select>
                            <InputError message={errors.ownership} />
                        </div>

                        {isEdit && (
                            <div className="space-y-1.5">
                                <Label htmlFor="status" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                    Status Kendaraan
                                </Label>

                                <select
                                    id="status"
                                    className={selectClassName}
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value as 'available' | 'booked' | 'inuse' | 'service')}
                                >
                                    <option value="available">Available</option>
                                    <option value="booked">Booked</option>
                                    <option value="inuse">In Use</option>
                                    <option value="service">Service</option>
                                </select>

                                <InputError message={errors.status} />
                            </div>
                        )}
                    </div>

                    <div className="mt-6 mb-6 space-y-1.5">
                        <Label htmlFor="vendor" className="text-muted-foreground text-xs font-semibold tracking-wide">
                            Vendor <span className="font-normal opacity-70">(Optional / If Rented)</span>
                        </Label>
                        <Input
                            id="vendor"
                            type="text"
                            placeholder="Rental Vendor Name (Optional)"
                            value={data.vendor ?? ''}
                            onChange={(e) => setData('vendor', e.target.value)}
                        />
                        <InputError message={errors.vendor} />
                    </div>

                    <div className="mt-4 flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
                        <Button type="button" variant="destructive" onClick={() => window.history.back()} className="w-full cursor-pointer sm:w-auto">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="w-full cursor-pointer sm:w-auto">
                            {processing ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Vehicle'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
