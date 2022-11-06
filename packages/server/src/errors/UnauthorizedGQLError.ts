import { CustomGQLError } from "./CustomGQLError.js";

export class UnauthorizedGQLError extends CustomGQLError {
    constructor(message: string, field?: string) {
        super(message, field, {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
                field,
            },
        });
    }
}
