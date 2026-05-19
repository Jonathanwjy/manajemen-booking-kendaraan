export interface Office {
    id: number;
    name: string;
    location: string;
}

export interface OfficeFormProps {
    office?: Office;
}

export interface OfficeProps {
    offices: Office[];
}
