const typeDefs = `#graphql

input RegisterInput {
    email: String
    password: String
}

type RegisterResponse {
    errors: [FieldError]
    user: User
}

type Mutation {
    register(registerInput: RegisterInput): RegisterResponse
}
`;

export default typeDefs;
