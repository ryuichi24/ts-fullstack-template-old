import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

export interface MyContext {
    req: express.Request;
    res: express.Response;
    prisma: PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >;
}

type Resolver = (parent: any, args: any, context: MyContext, info: any) => any;

// https://www.the-guild.dev/graphql/tools/docs/resolvers
export interface ResolverMap {
    [key: string]: {
        [key: string]: Resolver | { [key: string]: Resolver };
    };
}
