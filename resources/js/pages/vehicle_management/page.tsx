import { router } from '@inertiajs/react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import AppLayout from '@/layouts/app-layout';

import { PaginatedData } from '@/types/pagination';
import { VehicleWithRelation } from '@/types/vehicle';
import { VehicleTypes } from '@/types/vehicle-types';

import VehiclePage from './vehicle/page';
import VehicleTypePage from './vehicle_type/page';

interface Props {
    vehicles: PaginatedData<VehicleWithRelation>;

    vehicleTypes: PaginatedData<VehicleTypes>;

    filters: {
        search?: string;
        tab?: string;
    };
}

export default function VehicleIndex({ vehicles, vehicleTypes, filters }: Props) {
    return (
        <AppLayout>
            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">Vehicle Management</h1>

                    <p className="text-muted-foreground">Manage vehicles and vehicle types</p>
                </div>

                <Tabs
                    value={filters.tab || 'vehicles'}
                    onValueChange={(value) => {
                        router.get(
                            '/vehicle',
                            {
                                ...filters,
                                tab: value,
                            },
                            {
                                preserveState: true,
                                replace: true,
                            },
                        );
                    }}
                    className="space-y-6"
                >
                    <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                        <TabsTrigger value="vehicles">Vehicles</TabsTrigger>

                        <TabsTrigger value="vehicle-types">Vehicle Types</TabsTrigger>
                    </TabsList>

                    <TabsContent value="vehicles">
                        <VehiclePage vehicles={vehicles} filters={filters} />
                    </TabsContent>

                    <TabsContent value="vehicle-types">
                        <VehicleTypePage vehicle_types={vehicleTypes} />
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
