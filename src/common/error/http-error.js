export class HttpError extends Error {
    status;
    constructor(message, status, code) {
        super(message);
        this.status = status;
    }
}
//# sourceMappingURL=http-error.js.map