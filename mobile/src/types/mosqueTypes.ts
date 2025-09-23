import { z } from "zod";

export interface MosqueCoordinates {
    latitude: number;
    longitude: number;
}

export interface MosqueAddress {
    street: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
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

// Zod schemas for runtime validation

export const MosqueCoordinatesSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
});

export const MosqueAddressSchema = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    pinCode: z.string(),
});

export const MosqueSchema = z.object({
    id: z.string(),
    name: z.string(),
    photos: z.array(z.string().url()).default([]),
    address: MosqueAddressSchema,
    carpetAreaSqFt: z.number().optional(),
    floors: z.number().optional(),
    capacity: z.number().optional(),
    coordinates: MosqueCoordinatesSchema,
    plusCode: z.string().optional(),
    description: z.string().optional(),
});

export const MosquesResponseSchema = z.object({
    mosques: z.array(MosqueSchema),
});

export type MosquesResponse = z.infer<typeof MosquesResponseSchema>;
