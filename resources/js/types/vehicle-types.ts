import { PaginatedData } from './pagination';

export interface VehicleType {
    id: number;
    types: string;
    description: string;
}

export interface VehicleTypeProps {
    vehicle_types: PaginatedData<VehicleType>;
}

export interface VehicleTypeForm {
    vehicle_type?: VehicleType;
}
