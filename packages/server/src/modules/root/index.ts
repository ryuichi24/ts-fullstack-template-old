import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

// https://stackoverflow.com/questions/54322029/graphqljs-query-root-type-must-be-provided

const typeDefs = `#graphql
    type Query {
        health: Boolean
    }
`;

export const rootResolvers = mergeResolvers([]);
export const rootTypeDefs = mergeTypeDefs([typeDefs]);
