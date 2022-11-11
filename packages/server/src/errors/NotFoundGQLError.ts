import { ApolloServerErrorCode } from "@apollo/server/errors";
import { CustomGQLError } from "./CustomGQLError.js";

export class NotFoundGQLError extends CustomGQLError {
    constructor(message: string, field?: string) {
        super(message, field, {
            extensions: {
                code: ApolloServerErrorCode.PERSISTED_QUERY_NOT_FOUND,
                http: { status: 404 },
                field,
            },
        });
    }
}
