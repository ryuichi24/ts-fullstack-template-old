import argon2 from "argon2";
import { BadRequestGQLError } from "../../../errors/BadRequestGQLError.js";
import { requireAuth } from "../../../middleware/requireAuth.js";
import { MyContext } from "../../../types/graphql.js";
import {
    CreateUserResponse,
    MutationCreateUserArgs,
    Resolvers,
} from "../../../__generated__/graphql.js";
import { validateCreateUserInput } from "./validateCreateUserInput.js";

export const resolvers: Resolvers<MyContext> = {
    Mutation: {
        createUser: requireAuth<MutationCreateUserArgs, CreateUserResponse>(
            async (_, { createUserInput }, context, info) => {
                validateCreateUserInput(createUserInput);

                const existingUser = await context.prisma.user.findUnique({
                    where: {
                        email: createUserInput.email,
                    },
                });

                if (existingUser) {
                    throw new BadRequestGQLError("the email is already taken", "email");
                }

                const passwordHash = await argon2.hash(createUserInput.password);

                const newUser = await context.prisma.user.create({
                    data: {
                        email: createUserInput.email,
                        passwordHash,
                        isEmailConfirmed: true,
                    },
                });

                return {
                    user: {
                        ...newUser
                    },
                };
            }
        ),
    },
};
