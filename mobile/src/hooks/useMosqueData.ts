import { useCallback, useEffect, useMemo, useState } from "react";
import { Mosque, MosquesResponseSchema } from "@/types/mosqueTypes";
import mosqueData from "../../data/mosque.json";

// Mock API function that simulates fetching and validates with Zod
async function fetchMosquesMock(): Promise<Mosque[]> {
    // Simulate minimal latency; keep fast for dev
    await new Promise((r) => setTimeout(r, 50));

    const parsed = MosquesResponseSchema.safeParse(mosqueData);
    if (!parsed.success) {
        const message = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
        throw new Error(`Invalid mosques payload: ${message}`);
    }
    return parsed.data.mosques;
}

export function useMosqueData() {
    const [mosques, setMosques] = useState<Mosque[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchMosquesMock();
            setMosques(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const state = useMemo(() => ({ mosques, loading, error, refresh: load }), [mosques, loading, error, load]);

    return state;
}

export default useMosqueData;
