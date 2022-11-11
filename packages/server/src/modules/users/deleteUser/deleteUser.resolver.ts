import { NotFoundGQLError } from "../../../errors/NotFoundGQLError.js";
import { MyContext } from "../../../types/graphql.js";
import { Resolvers } from "../../../__generated__/graphql.js";

export const resolvers: Resolvers<MyContext> = {
    Mutation: {
        deleteUser: async (_, { deleteUserInput }, context, info) => {
            const existingUser = await context.prisma.user.findUnique({
                where: {
                    id: deleteUserInput.userId,
                },
            });

            if (!existingUser) {
                throw new NotFoundGQLError(`the user(id=${deleteUserInput.userId}) is not found.`);
            }

            await context.prisma.user.delete({
                where: {
                    id: existingUser.id,
                },
            });

            // maybe not need to return user
            return {
                user: existingUser,
            };
        },
    },
};
