const typeDefs = `#graphql
    input ConfirmEmailInput {
        token: String!
    }

    type ConfirmEmailResponse {
        errors: [FieldError]
        user: User
    }

    type Mutation {
        confirmEmail(confirmEmailInput: ConfirmEmailInput!): ConfirmEmailResponse
    }
`;

export default typeDefs;
