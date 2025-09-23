export interface MosqueCoordinates {
    latitude: number;
    longitude: number;
}

export interface MosqueAddress {
    street: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
}

export interface Mosque {
    id: string;
    name: string;
    photos: string[];
    address: MosqueAddress;
    carpetAreaSqFt?: number;
    floors?: number;
    capacity?: number;
    coordinates: MosqueCoordinates;
    plusCode?: string;
    description?: string;
}
