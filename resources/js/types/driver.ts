import { Office } from './office';
import { PaginatedData } from './pagination';

export interface Driver {
    id: number;
    office_id: number;
    name: string;
    status: 'available' | 'unavailable';
    phone_number: string;
}

export interface DriverWithRelation extends Driver {
    office: Office;
}

export interface DriverProps {
    drivers: PaginatedData<DriverWithRelation>;
    filters: {
        search?: string;
    };
}

export interface DriverFormProps {
    driver?: Driver;
    offices: Office[];
}
