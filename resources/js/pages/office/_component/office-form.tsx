import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OfficeFormProps } from '@/types/office';
import { useForm } from '@inertiajs/react';
import { Building } from 'lucide-react';

export default function OfficeForm({ office }: OfficeFormProps) {
    const isEdit = !!office;

    const { data, setData, post, put, processing, errors } = useForm({
        name: office?.name ?? '',
        location: office?.location ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            put(`/office/${office.id}`);
        } else {
            post('/office');
        }
    };

    return (
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-3/8">
            <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <Building className="h-5 w-5" />
                </div>

                <div>
                    <h2 className="text-base font-semibold">{isEdit ? 'Edit Office' : 'Buat Office Baru'}</h2>
                    <p className="text-muted-foreground text-sm">{isEdit ? 'Perbarui informasi office' : 'Isi informasi office'}</p>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className="bg-card rounded-xl border p-4 shadow-sm sm:p-6">
                    <div className="mb-5 space-y-1.5">
                        <Label htmlFor="name" className="text-muted-foreground text-xs font-semibold tracking-wide">
                            Office Name
                        </Label>
                        <Input id="name" type="text" placeholder="Office name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name} />
                    </div>

                    <div className="mb-6 space-y-1.5">
                        <Label htmlFor="location" className="text-muted-foreground text-xs font-semibold tracking-wide">
                            Location
                        </Label>
                        <Input
                            id="location"
                            type="text"
                            placeholder="Office Location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                        />
                        <InputError message={errors.location} />
                    </div>

                    <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
                        <Button type="button" variant="destructive" onClick={() => window.history.back()} className="w-full cursor-pointer sm:w-auto">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="w-full cursor-pointer sm:w-auto">
                            {processing ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Office'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
