import { requireAuth } from "../../../middleware/requireAuth.js";
import { MyContext } from "../../../types/graphql.js";
import { CheckAuthResponse, Resolvers } from "../../../__generated__/graphql.js";

export const resolvers: Resolvers<MyContext> = {
    Query: {
        checkAuth: requireAuth<{}, CheckAuthResponse>(async (_, args, context, info) => {
            return {
                user: {
                    ...context.user,
                },
            };
        }),
    },
};

