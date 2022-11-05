import http from "http";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { ApolloServer } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
// https://www.the-guild.dev/graphql/tools/docs/introduction
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { authResolvers, authTypeDefs } from "./modules/auth/index.js";
import { MyContext } from "./types/graphql.js";
import { rootTypeDefs } from "./modules/root/index.js";
import { appSettings } from "./config/index.js";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { cookieParser } from "./middleware/cookieParser.js";
// https://stackoverflow.com/questions/65873101/node-requires-file-extension-for-import-statement/65874173#65874173
// https://stackoverflow.com/a/70682797/13723015
// https://stackoverflow.com/questions/72213760/typescript-node-error-err-module-not-found-cannot-find-module/72215487#72215487
// https://www.memory-lovers.blog/entry/2022/05/31/110000
// https://stackoverflow.com/a/64543163/13723015

const prisma = new PrismaClient();

async function main() {
    const PORT = appSettings.SERVER.PORT;
    const HOST = appSettings.SERVER.HOST;

    await prisma.$connect();

    const app = express();

    // https://www.apollographql.com/docs/apollo-server/api/express-middleware/#example
    const httpServer = http.createServer(app);

    const server = new ApolloServer<MyContext>({
        typeDefs: mergeTypeDefs([rootTypeDefs, authTypeDefs]),
        resolvers: mergeResolvers([authResolvers]),
        // shut down gracefully.
        // https://www.apollographql.com/docs/apollo-server/workflow/build-run-queries
        // https://www.apollographql.com/docs/apollo-server/api/plugin/drain-http-server
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            // https://www.apollographql.com/docs/apollo-server/api/plugin/landing-pages/
            ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
        ],
    });

    await server.start();

    // global middle must be come before expressMiddleware
    app.use(
        cors({
            origin: [
                appSettings.SERVER.FRONTEND_HOST,
                "chrome-extension://kjhjcgclphafojaeeickcokfbhlegecd",
            ],
            credentials: true,
        })
    );

    app.use(express.json());

    app.use(cookieParser());

    app.use(
        "/graphql",
        expressMiddleware(server, {
            context: async ({ req, res }) => {
                const accessToken = req.parsedCookies?.at;
                if (!accessToken) {
                    return { req, res, prisma };
                }

                const jwtPayload = jwt.verify(
                    accessToken,
                    appSettings.AUTH.ACCESS_TOKEN.SECRET
                ) as { [key: string]: string | string[] };

                const user = {
                    id: jwtPayload.id as string,
                    roles: [],
                };

                return { req, res, prisma, user };
            },
        })
    );

    app.get("*", (_, res) => {
        res.status(200).send("server is up and running");
    });

    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 server is up and running at http://${HOST}:${PORT}/`);
}

main().catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
});
