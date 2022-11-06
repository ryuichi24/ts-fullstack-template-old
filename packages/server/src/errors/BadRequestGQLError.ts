import { CustomGQLError } from "./CustomGQLError.js";

export class BadRequestGQLError extends CustomGQLError {
    constructor(message: string, field?: string) {
        super(message, field, {
            extensions: {
                code: "BAD_REQUEST",
                http: { status: 400 },
                field,
            },
        });
    }
}
