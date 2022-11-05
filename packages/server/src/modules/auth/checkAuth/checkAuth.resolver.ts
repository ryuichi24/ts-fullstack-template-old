import { MyContext } from "../../../types/graphql.js";
import { Resolvers } from "../../../__generated__/graphql.js";

const resolvers: Resolvers<MyContext> = {
    Query: {
        checkAuth: async (_, args, context, info) => {
            if (!context.user) {
                return {
                    errors: [
                        {
                            message: "not authenticated",
                        },
                    ],
                };
            }
            const existingUser = await context.prisma.user.findUnique({
                where: {
                    id: context.user.id,
                },
            });
            return {
                user: {
                    ...existingUser,
                    createdAt: existingUser?.createdAt.toString(),
                    updatedAt: existingUser?.updatedAt.toString(),
                },
            };
        },
    },
};

export default resolvers;
