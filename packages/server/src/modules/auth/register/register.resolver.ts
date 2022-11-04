import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { appSettings } from "../../../config/index.js";
import { MyContext } from "../../../types/graphql.js";
import { sendEmail } from "../../../utils/sendEmail.js";
import { Resolvers, RegisterResponse } from "../../../__generated__/graphql.js";

const resolvers: Resolvers<MyContext> = {
    Mutation: {
        register: async (_, { registerInput }, context, info): Promise<RegisterResponse> => {
            const emailFormatRegex =
                /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
            if (!registerInput?.email) {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "no email provided",
                        },
                    ],
                };
            }

            if (!emailFormatRegex.test(registerInput?.email)) {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "invalid email format",
                        },
                    ],
                };
            }

            if (!registerInput.password) {
                return {
                    errors: [
                        {
                            field: "password",
                            message: "no password provided",
                        },
                    ],
                };
            }

            const existingUser = await context.prisma.user.findUnique({
                where: {
                    email: registerInput?.email,
                },
            });

            if (existingUser) {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "the email is already taken",
                        },
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
