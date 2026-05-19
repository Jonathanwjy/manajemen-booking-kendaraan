import { PaginatedData } from './pagination';
import { Service } from './service';
import { VehicleType } from './vehicle-types';

export interface Vehicle {
    id: number;
    office_id: number;
    vehicle_type_id: number;
    model: string;
    year: string;
    registration_number: string;
    ownership: 'owned' | 'rent';
    vendor: string | null;
    odometer: number;
    status: 'available' | 'booked' | 'inuse' | 'service';
}

interface Office {
    id: number;
    name: string;
}

export interface VehicleWithRelation extends Vehicle {
    office: Office;
    vehicle_type: VehicleType;
}

export interface VehicleFormProps {
    vehicle?: Vehicle;
    offices: Office[];
    vehicle_types: VehicleType[];
}

export interface VehicleProps {
    vehicles: PaginatedData<VehicleWithRelation>;
    filters: {
        search?: string;
    };
}

interface Driver {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface VehicleUsage {
    id: number;
    booking_id: number;
    vehicle_id: number;
    driver_id: number;
    fuel_used: number;
    start_odometer: number;
    end_odometer: number;
    created_at: string;
    updated_at: string;
    driver?: Driver;
}

export interface VehicleShowProps extends Vehicle {
    office: Office;
    vehicle_type: VehicleType;
    vehicle_usage?: VehicleUsage[];
    service?: Service[];
}
