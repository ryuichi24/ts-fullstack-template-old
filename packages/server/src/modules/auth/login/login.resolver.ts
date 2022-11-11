import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { appSettings } from "../../../config/index.js";
import { BadRequestGQLError } from "../../../errors/BadRequestGQLError.js";
import { MyContext } from "../../../types/graphql.js";
import { Resolvers } from "../../../__generated__/graphql.js";

export const resolvers: Resolvers<MyContext> = {
    Mutation: {
        login: async (_, { loginInput }, context, info) => {
            const existingUser = await context.prisma.user.findUnique({
                where: {
                    email: loginInput.email,
                },
            });

            if (!existingUser) {
                throw new BadRequestGQLError("email or password is invalid", "password");
            }

            const isValidPassword = await argon2.verify(
                existingUser.passwordHash,
                loginInput.password
            );

            if (!isValidPassword) {
                throw new BadRequestGQLError("email or password is invalid", "password");
            }

            const accessToken = jwt.sign(
                { id: existingUser.id },
                appSettings.AUTH.ACCESS_TOKEN.SECRET,
                { expiresIn: appSettings.AUTH.ACCESS_TOKEN.EXPIRES_IN }
            );

            const maxAge = appSettings.AUTH.ACCESS_TOKEN.EXPIRES_IN;
            context.res.cookie("at", accessToken, {
                httpOnly: true,
                maxAge: typeof maxAge === "number" ? maxAge : parseInt(maxAge),
                sameSite: "lax",
                secure: appSettings.SERVER.SECURE_COOKIE,
                // path: "/graphql",
            });

            return {
                user: {
                    ...existingUser,
                },
            };
        },
    },
};
