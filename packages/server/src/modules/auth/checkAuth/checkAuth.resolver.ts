import { GraphQLError } from "graphql";
import { requireAuth } from "../../../middleware/requireAuth.js";
import { MyContext } from "../../../types/graphql.js";
import { CheckAuthResponse, Resolvers } from "../../../__generated__/graphql.js";

const resolvers: Resolvers<MyContext> = {
    Query: {
        checkAuth: requireAuth<{}, CheckAuthResponse>(async (_, args, context, info) => {
            const existingUser = await context.prisma.user.findUnique({
                where: {
                    id: context.user?.id,
                },
            });

            if (!existingUser) {
                throw new GraphQLError("User is not authenticated", {
                    extensions: {
                        code: "UNAUTHENTICATED",
                        http: { status: 401 },
                    },
                });
            }

            return {
                user: {
                    ...existingUser,
                    createdAt: existingUser?.createdAt.toString(),
                    updatedAt: existingUser?.updatedAt.toString(),
                },
            };
        }),
    },
};

export default resolvers;
