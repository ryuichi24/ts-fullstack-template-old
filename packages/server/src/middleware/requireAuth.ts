import { GraphQLResolveInfo } from "graphql";
import jwt from "jsonwebtoken";
import { appSettings } from "../config/index.js";
import { UnauthorizedGQLError } from "../errors/UnauthorizedGQLError.js";
import { MyContext } from "../types/graphql.js";
import { ResolverFn } from "../__generated__/graphql.js";

export const requireAuth =
    <TArgs, TResponse>(next: ResolverFn<TResponse, {}, MyContext, TArgs>) =>
    async (
        parent: {},
        args: TArgs,
        context: MyContext,
        info: GraphQLResolveInfo
    ): Promise<TResponse> => {
        const accessToken = context.req.parsedCookies?.at;
        if (!accessToken) {
            throw new UnauthorizedGQLError("token is invalid");
        }

        const jwtPayload = jwt.verify(accessToken, appSettings.AUTH.ACCESS_TOKEN.SECRET) as {
            [key: string]: string;
        };

        if(!jwtPayload) {
            throw new UnauthorizedGQLError("token is invalid");
        }

        const existingUser = await context.prisma.user.findUnique({
            where: {
                id: jwtPayload.id,
            },
        });

        if (!existingUser) {
            throw new UnauthorizedGQLError("token is invalid");
        }

        context.user = {
            ...existingUser,
            createdAt: existingUser.createdAt.toString(),
            updatedAt: existingUser.updatedAt.toString(),
        };

        return next(parent, args, context, info);
    };
