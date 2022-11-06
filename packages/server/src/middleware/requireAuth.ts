import { GraphQLResolveInfo } from "graphql";
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
        if (!context.user?.id) {
            throw new UnauthorizedGQLError("token is invalid");
        }

        const existingUser = await context.prisma.user.findUnique({
            where: {
                id: context.user.id,
            },
        });

        if (!existingUser) {
            throw new UnauthorizedGQLError("token is invalid");
        }

        context.user = {
            ...context.user,
            ...existingUser,
            createdAt: existingUser.createdAt.toString(),
            updatedAt: existingUser.updatedAt.toString(),
        };

        return next(parent, args, context, info);
    };
