// https://jacobruiz.com/blog/2019/6/11/why-use-custom-date-scalar-types-in-graphql

const typeDefs = `#graphql
    type User {
        id: String
        email: String
        createdAt: String
        updatedAt: String
    }
`;

export default typeDefs;
