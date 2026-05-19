import { PaginatedData } from './pagination';

export interface Booking {
    id: number;
    vehicle_id: number;
    driver_id: number;
    office_id: number;
    booking_code: string;
    purpose: string;
    start_date: string;
    end_date: string;
    status: 'pending' | 'ongoing' | 'finished' | 'declined';
    booking_approval?: BookingApproval[];
    vehicle?: Vehicle;
}

export interface Driver {
    id: number;
    office_id: number;
    name: string;
}

export interface Office {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
}

export interface Vehicle {
    id: number;
    model: string;
    office_id: number;
    odometer: number;
    registration_number: string;
}

export interface BookingWithRelation extends Booking {
    office: Office;
    driver: Driver;
    vehicle: Vehicle;
}

export interface BookingApproval {
    id: number;
    booking_id: number;
    approver_id: number;
    status: 'pending' | 'accepted' | 'declined';
    user?: User;
}

export interface BookingFormProps {
    booking?: Booking;
    offices: Office[];
    drivers: Driver[];
    vehicles: Vehicle[];
    users: User[];
}

export interface ShowBookingProps {
    booking: BookingWithRelation;
    isApprover: boolean;
}

export interface BookingProps {
    booking: BookingWithRelation;
    bookings: PaginatedData<BookingWithRelation>;
    filters: {
        search?: string;
        start_date?: string;
        end_date?: string;
    };
    isAdmin: boolean;
}
