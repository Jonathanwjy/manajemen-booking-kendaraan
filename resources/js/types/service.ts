import { PaginatedData } from './pagination';
import { Vehicle } from './vehicle';

export interface Service {
    id: number;
    vehicle_id: number;
    service_date: string;
    odometer: number;
    next_service_date: string;
    next_service_odometer: number;
    status: 'service' | 'finished';
    notes: string | null;
    vehicle?: Vehicle;
    created_at?: string;
    updated_at?: string;
}

export interface ServiceFormProps {
    service?: Service;
    vehicles: Vehicle[];
}

export interface ServiceProps {
    services: PaginatedData<Service>;
}
