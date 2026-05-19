import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ServiceFormProps } from '@/types/service';
import { useForm } from '@inertiajs/react';
import { Wrench } from 'lucide-react';

export default function ServiceForm({ service, vehicles }: ServiceFormProps) {
    const isEdit = !!service;

    const { data, setData, post, put, processing, errors } = useForm({
        vehicle_id: service?.vehicle_id?.toString() ?? '',
        service_date: service?.service_date ?? '',
        odometer: service?.odometer?.toString() ?? '',
        next_service_date: service?.next_service_date ?? '',
        next_service_odometer: service?.next_service_odometer?.toString() ?? '',
        status: service?.status ?? 'service',
        notes: service?.notes ?? '',
    });

    const handleVehicleChange = (value: string) => {
        setData('vehicle_id', value);

        // Auto-fill odometer dari vehicle yang dipilih
        const selectedVehicle = vehicles.find((v) => v.id.toString() === value);
        if (selectedVehicle) {
            setData('odometer', selectedVehicle.odometer.toString());
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(`/service/${service.id}`);
        } else {
            post('/service');
        }
    };

    return (
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5">
            <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <Wrench className="h-5 w-5" />
                </div>
                <div>
                    <h2 className="text-base font-semibold">{isEdit ? 'Edit Service' : 'Tambah Service'}</h2>
                    <p className="text-muted-foreground text-sm">{isEdit ? 'Perbarui data service kendaraan' : 'Isi data service kendaraan'}</p>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className="bg-card rounded-xl border p-4 shadow-sm sm:p-6">
                    {/* Vehicle */}
                    <div className="mb-5 space-y-1.5">
                        <Label className="text-muted-foreground text-xs font-semibold tracking-wide">Vehicle</Label>
                        <Select value={data.vehicle_id} onValueChange={handleVehicleChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Vehicle" />
                            </SelectTrigger>
                            <SelectContent>
                                {vehicles.map((vehicle) => (
                                    <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                                        {vehicle.registration_number}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.vehicle_id} />
                    </div>

                    {/* Service Date */}
                    <div className="mb-5 space-y-1.5">
                        <Label htmlFor="service_date" className="text-muted-foreground text-xs font-semibold tracking-wide">
                            Service Date
                        </Label>
                        <Input id="service_date" type="date" value={data.service_date} onChange={(e) => setData('service_date', e.target.value)} />
                        <InputError message={errors.service_date} />
                    </div>

                    {/* Odometer - readonly, auto filled */}
                    <div className="mb-5 space-y-1.5">
                        <Label htmlFor="odometer" className="text-muted-foreground text-xs font-semibold tracking-wide">
                            Odometer
                        </Label>
                        <Input
                            id="odometer"
                            type="number"
                            placeholder="Pilih kendaraan terlebih dahulu"
                            value={data.odometer}
                            readOnly
                            className="bg-muted cursor-not-allowed"
                        />
                        <p className="text-muted-foreground text-xs">Otomatis diisi dari data kendaraan</p>
                        <InputError message={errors.odometer} />
                    </div>

                    {/* Next Service Date & Odometer - hanya tampil saat edit */}
                    {isEdit && (
                        <>
                            <div className="mb-5 space-y-1.5">
                                <Label htmlFor="next_service_date" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                    Next Service Date
                                </Label>
                                <Input
                                    id="next_service_date"
                                    type="date"
                                    value={data.next_service_date}
                                    onChange={(e) => setData('next_service_date', e.target.value)}
                                />
                                <InputError message={errors.next_service_date} />
                            </div>

                            <div className="mb-5 space-y-1.5">
                                <Label htmlFor="next_service_odometer" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                    Next Service Odometer
                                </Label>
                                <Input
                                    id="next_service_odometer"
                                    type="number"
                                    placeholder="Input next odometer"
                                    value={data.next_service_odometer}
                                    onChange={(e) => setData('next_service_odometer', e.target.value)}
                                />
                                <InputError message={errors.next_service_odometer} />
                            </div>
                        </>
                    )}

                    {/* Status - hidden, otomatis 'service' */}

                    {/* Notes */}
                    <div className="mb-6 space-y-1.5">
                        <Label htmlFor="notes" className="text-muted-foreground text-xs font-semibold tracking-wide">
                            Notes
                        </Label>
                        <Textarea id="notes" placeholder="Input notes" value={data.notes} onChange={(e) => setData('notes', e.target.value)} />
                        <InputError message={errors.notes} />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
                        <Button type="button" variant="destructive" onClick={() => window.history.back()} className="w-full cursor-pointer sm:w-auto">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="w-full cursor-pointer sm:w-auto">
                            {processing ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Service'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
