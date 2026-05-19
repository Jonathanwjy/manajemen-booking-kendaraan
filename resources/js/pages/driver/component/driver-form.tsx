import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DriverFormProps } from '@/types/driver';
import { useForm } from '@inertiajs/react';
import { CarFront } from 'lucide-react';

export default function DriverForm({ driver, offices }: DriverFormProps) {
    const isEdit = !!driver;

    const { data, setData, post, put, processing, errors } = useForm({
        office_id: driver?.office_id?.toString() ?? '',
        name: driver?.name ?? '',
        phone_number: driver?.phone_number ?? '',
        status: driver?.status ?? 'available',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(`/driver/${driver.id}`);
        } else {
            post('/driver');
        }
    };

    return (
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-3/8">
            {/* HEADER */}
            <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <CarFront className="h-5 w-5" />
                </div>
                <div>
                    <h2 className="text-base font-semibold">{isEdit ? 'Edit Driver' : 'Buat Driver Baru'}</h2>
                    <p className="text-muted-foreground text-sm">{isEdit ? 'Perbarui informasi driver' : 'Isi informasi driver'}</p>
                </div>
            </div>

            {/* FORM */}
            <form onSubmit={submit}>
                <div className="bg-card rounded-xl border p-4 shadow-sm sm:p-6">
                    {/* OFFICE */}
                    <div className="mb-5 space-y-1.5">
                        <Label htmlFor="office_id" className="text-muted-foreground text-xs font-semibold tracking-wide">
                            Office
                        </Label>
                        <Select value={data.office_id} onValueChange={(value) => setData('office_id', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select office" />
                            </SelectTrigger>
                            <SelectContent>
                                {offices.map((office) => (
                                    <SelectItem key={office.id} value={office.id.toString()}>
                                        {office.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.office_id} />
                    </div>

                    {/* NAME */}
                    <div className="mb-5 space-y-1.5">
                        <Label htmlFor="name" className="text-muted-foreground text-xs font-semibold tracking-wide">
                            Driver Name
                        </Label>
                        <Input id="name" type="text" placeholder="Driver name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name} />
                    </div>

                    {/* PHONE NUMBER */}
                    <div className="mb-5 space-y-1.5">
                        <Label htmlFor="phone_number" className="text-muted-foreground text-xs font-semibold tracking-wide">
                            Phone Number
                        </Label>
                        <Input
                            id="phone_number"
                            type="text"
                            placeholder="08123456789"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                        />
                        <InputError message={errors.phone_number} />
                    </div>

                    {isEdit && (
                        <div className="mb-6 space-y-1.5">
                            <Label htmlFor="status" className="text-muted-foreground text-xs font-semibold tracking-wide">
                                Status
                            </Label>
                            <Select value={data.status} onValueChange={(value: 'available' | 'unavailable') => setData('status', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="unavailable">Unavailable</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>
                    )}

                    <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
                        <Button type="button" variant="destructive" onClick={() => window.history.back()} className="w-full cursor-pointer sm:w-auto">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="w-full cursor-pointer sm:w-auto">
                            {processing ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Driver'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
