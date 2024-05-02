export interface IUser {
    id?: number;
    username: string;
    email: string;
    password: string;
    token?: string;
}

export interface ElysiaSet {
    headers?: Record<string, string> & { "Set-Cookie"?: string | string[] | undefined; };
    status: any;
    redirect?: string | undefined;
    cookie?: Record<string, {
        domain?: string | undefined;
        expires?: Date | undefined;
        httpOnly?: boolean | undefined;
        maxAge?: number | undefined;
        path?: string | undefined;
        priority?: "low" | "medium" | "high" | undefined;
        sameSite?: boolean | "none" | "lax" | "strict" | undefined;
        secure?: boolean | undefined;
        secrets?: string | string[] | undefined;
        value?: unknown;
    }> | undefined;
}