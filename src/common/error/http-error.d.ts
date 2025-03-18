export declare class HttpError extends Error {
    status: number;
    constructor(message: string, status: number, code?: number);
}
