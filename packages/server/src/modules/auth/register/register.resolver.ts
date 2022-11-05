import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { appSettings } from "../../../config/index.js";
import { MyContext } from "../../../types/graphql.js";
import { createError } from "../../../utils/createError.js";
import { sendEmail } from "../../../utils/sendEmail.js";
import { Resolvers, RegisterResponse } from "../../../__generated__/graphql.js";
import { validateRegisterInput } from "./validateRegisterInput.js";

const resolvers: Resolvers<MyContext> = {
    Mutation: {
        register: async (_, { registerInput }, context, info): Promise<RegisterResponse> => {
            const errors = validateRegisterInput(registerInput);
            if (errors) {
                return { errors };
            }

            const existingUser = await context.prisma.user.findUnique({
                where: {
                    email: registerInput?.email,
                },
            });

            if (existingUser) {
                return {
                    errors: [
                        createError({ message: "the email is already taken", field: "email" }),
                    ],
                };
            }

            const emailConfirmToken = jwt.sign({}, appSettings.AUTH.EMAIL_CONFIRM_TOKEN.SECRET, {
                expiresIn: appSettings.AUTH.EMAIL_CONFIRM_TOKEN.EXPIRES_IN,
            });

            const passwordHash = await argon2.hash(registerInput.password);

            const newUser = await context.prisma.user.create({
                data: {
                    email: registerInput.email,
                    passwordHash,
                    emailConfirmToken,
                },
            });

            await sendEmail({
                to: [newUser.email],
                subject: "Please confirm your email.",
                html: `<a href="${appSettings.SERVER.FRONTEND_HOST}/confirm-email?token=${emailConfirmToken}">Click here to confirm</a>`,
            });

            return {
                errors: [],
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    createdAt: newUser.createdAt.toString(),
                    updatedAt: newUser.updatedAt.toString(),
                },
            };
        },
    },
};

export default resolvers;
