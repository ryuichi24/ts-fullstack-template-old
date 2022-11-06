import jwt from "jsonwebtoken";
import { appSettings } from "../../../config/index.js";
import { BadRequestGQLError } from "../../../errors/BadRequestGQLError.js";
import { MyContext } from "../../../types/graphql.js";
import { ConfirmEmailResponse, Resolvers } from "../../../__generated__/graphql.js";

export const resolvers: Resolvers<MyContext> = {
    Mutation: {
        confirmEmail: async (
            _,
            { confirmEmailInput },
            context,
            info
        ): Promise<ConfirmEmailResponse> => {
            const existingUser = await context.prisma.user.findUnique({
                where: {
                    emailConfirmToken: confirmEmailInput.token,
                },
            });

            if (!existingUser) {
                throw new BadRequestGQLError("invalid token");
            }

            const isValid = !!jwt.verify(
                confirmEmailInput.token,
                appSettings.AUTH.EMAIL_CONFIRM_TOKEN.SECRET
            );

            if (!isValid) {
                throw new BadRequestGQLError("invalid token");
            }

            await context.prisma.user.update({
                where: { id: existingUser.id },
                data: { isEmailConfirmed: true, emailConfirmToken: "" },
            });

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
                    createdAt: existingUser.createdAt.toString(),
                    updatedAt: existingUser.updatedAt.toString(),
                },
            };
        },
    },
};

