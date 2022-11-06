const typeDefs = `#graphql
    type CheckAuthResponse {
        user: User
    }

    type Query {
        checkAuth: CheckAuthResponse
    }
`;

export default typeDefs;
