/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as fs from "fs";
import path from "path";
import glob from "glob";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

export const buildSchema = async () => {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const pathToModules = path.join(__dirname, "../modules");

    const resolvers = (await Promise.all(
        glob.sync(`${pathToModules}/**/*.resolver.?s`).map((resolverFile) => import(resolverFile))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    )).map(x => x.resolvers);

    const typeDefs = glob
        .sync(`${pathToModules}/**/*.graphql`)
        .map((typeDefsFile) => fs.readFileSync(typeDefsFile, { encoding: "utf8" }));

    return makeExecutableSchema({
        resolvers: mergeResolvers([...resolvers]),
        typeDefs: mergeTypeDefs([...typeDefs]),
    });
};
