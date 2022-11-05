const typeDefs = `#graphql

input LoginInput {
    email: String!
    password: String!
}

type LoginResponse {
    errors: [FieldError]
    user: User
}

type Mutation {
    login(loginInput: LoginInput!): LoginResponse
}
`;

export default typeDefs;
