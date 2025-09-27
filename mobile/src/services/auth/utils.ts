import { type TokenPayload, type UserAttributes } from "./types";

function decodeBase64Universal(base64: string): string {
    if (typeof window !== "undefined" && typeof window.atob === "function") {
        return window.atob(base64);
    }
    return Buffer.from(base64, "base64").toString("binary");
}

export function parseJwt(token: string): TokenPayload {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeBase64Universal(base64));
}

export function extractAttributesFromToken(token: string): UserAttributes {
    const payload = parseJwt(token) as any;
    const attrs: UserAttributes = {
        email: payload.email,
        given_name: payload.given_name,
        family_name: payload.family_name,
    } as UserAttributes;
    for (const key of Object.keys(payload)) {
        const value = (payload as any)[key];
        if (typeof value === "string" && !(key in attrs)) {
            (attrs as any)[key] = value;
        }
    }
    return attrs;
}
