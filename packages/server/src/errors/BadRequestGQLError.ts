import { CustomGQLError } from "./CustomGQLError.js";
import { ApolloServerErrorCode } from "@apollo/server/errors";

export class BadRequestGQLError extends CustomGQLError {
    constructor(message: string, field?: string) {
        super(message, field, {
            extensions: {
                code: ApolloServerErrorCode.BAD_USER_INPUT,
                http: { status: 400 },
                field,
            },
        });
    }
}
// https://www.apollographql.com/docs/apollo-server/data/errors/
