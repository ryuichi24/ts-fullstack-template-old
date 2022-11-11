import argon2 from "argon2";
import { NotFoundGQLError } from "../../../errors/NotFoundGQLError.js";
import { MyContext } from "../../../types/graphql.js";
import { Resolvers } from "../../../__generated__/graphql.js";

export const resolvers: Resolvers<MyContext> = {
    Mutation: {
        updateUser: async (_, { updateUserInput }, context, info) => {
            const existingUser = await context.prisma.user.findUnique({
                where: {
                    id: updateUserInput.userId,
                },
            });

            if (!existingUser) {
                throw new NotFoundGQLError(`the user(id=${updateUserInput.userId}) is not found.`);
            }

            if (updateUserInput.user.password) {
                existingUser.passwordHash = await argon2.hash(updateUserInput.user.password);
            }

            if (updateUserInput.user.email) {
                existingUser.email = updateUserInput.user.email;
            }

            const updatedUser = await context.prisma.user.update({
                where: {
                    id: updateUserInput.userId,
                },
                data: {
                    email: existingUser.email,
                    passwordHash: existingUser.passwordHash,
                },
            });

            return {
                user: {
                    ...updatedUser,
                },
            };
        },
    },
};
