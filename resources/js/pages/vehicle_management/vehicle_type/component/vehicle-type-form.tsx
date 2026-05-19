import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VehicleTypesForm } from '@/types/vehicle-types';
import { useForm } from '@inertiajs/react';
import { Car } from 'lucide-react';

export default function VehicleTypeForm({ vehicleType }: VehicleTypesForm) {
    const isEdit = !!vehicleType;

    const { data, setData, post, put, processing, errors } = useForm({
        types: vehicleType?.types ?? '',
        description: vehicleType?.description ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            put(`/vehicle-type/${vehicleType.id}`);
        } else {
            post('/vehicle-type');
        }
    };

    return (
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-3/8">
            <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <Car className="h-5 w-5" />
                </div>

                <div>
                    <h2 className="text-base font-semibold">{isEdit ? 'Edit Vehicle Type' : 'Buat Vehicle Type Baru'}</h2>
                    <p className="text-muted-foreground text-sm">{isEdit ? 'Perbarui informasi tipe kendaraan' : 'Isi informasi tipe kendaraan'}</p>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className="bg-card rounded-xl border p-4 shadow-sm sm:p-6">
                    <div className="mb-5 space-y-1.5">
                        <Label htmlFor="types" className="text-muted-foreground text-xs font-semibold tracking-wide">
                            Vehicle Type
                        </Label>
                        <Input
                            id="types"
                            type="text"
                            placeholder="e.g. SUV, Truck, Sedan"
                            value={data.types}
                            onChange={(e) => setData('types', e.target.value)}
                        />
                        <InputError message={errors.types} />
                    </div>

                    <div className="mb-6 space-y-1.5">
                        <Label htmlFor="description" className="text-muted-foreground text-xs font-semibold tracking-wide">
                            Description
                        </Label>
                        <Input
                            id="description"
                            type="text"
                            placeholder="Description of the vehicle type"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
                        <Button type="button" variant="destructive" onClick={() => window.history.back()} className="w-full cursor-pointer sm:w-auto">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="w-full cursor-pointer sm:w-auto">
                            {processing ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Vehicle Type'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
