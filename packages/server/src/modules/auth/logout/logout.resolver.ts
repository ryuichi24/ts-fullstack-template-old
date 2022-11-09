import { MyContext } from "../../../types/graphql.js";
import { Resolvers } from "../../../__generated__/graphql.js";

export const resolvers: Resolvers<MyContext> = {
    Mutation: {
        logout: async (_, args, context, info) => {
            context.res.clearCookie("at");
        },
    },
};
