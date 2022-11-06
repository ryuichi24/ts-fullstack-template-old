/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */
import { GraphQLError, GraphQLResolveInfo } from "graphql";
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
            throw new GraphQLError("User is not authenticated", {
                extensions: {
                    code: "UNAUTHENTICATED",
                    http: { status: 401 },
                },
            });
        }

        return next(parent, args, context, info);
    };
