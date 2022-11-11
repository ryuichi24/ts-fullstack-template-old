import { requireAuth } from "../../../middleware/requireAuth.js";
import { MyContext } from "../../../types/graphql.js";
import { GetUsersResponse, QueryGetUsersArgs, Resolvers } from "../../../__generated__/graphql.js";

export const resolvers: Resolvers<MyContext> = {
    Query: {
        getUsers: requireAuth<QueryGetUsersArgs, GetUsersResponse>(
            async (_, { getUsersInput }, context, info) => {
                const limit = getUsersInput.limit || 10;
                const limitPlusOne = limit + 1;
                const users = await context.prisma.user.findMany({
                    take: limitPlusOne,
                });
                const hasMore = users.length === limitPlusOne;
                return {
                    users: users.slice(0, limit),
                    hasMore,
                };
            }
        ),
    },
};
