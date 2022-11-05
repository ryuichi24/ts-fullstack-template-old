const typeDefs = `#graphql
    type CheckAuthResponse {
        errors: [FieldError]
        user: User
    }

    type Query {
        checkAuth: CheckAuthResponse
    }
`;

export default typeDefs;
