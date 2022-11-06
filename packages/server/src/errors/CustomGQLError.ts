import { GraphQLError, GraphQLErrorOptions } from "graphql";

// https://www.apollographql.com/docs/apollo-server/security/authentication/
export class CustomGQLError extends GraphQLError {
    field?: string;
    constructor(message: string, field?: string, options?: GraphQLErrorOptions) {
        super(message, options);
        this.field = field;
    }
}
