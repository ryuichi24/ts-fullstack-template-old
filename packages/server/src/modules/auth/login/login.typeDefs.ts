const typeDefs = `#graphql

input LoginInput {
    email: String!
    password: String!
}

type LoginResponse {
    user: User
}

type Mutation {
    login(loginInput: LoginInput!): LoginResponse
}
`;

export default typeDefs;
