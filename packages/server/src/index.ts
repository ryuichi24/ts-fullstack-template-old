import http from "http";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
// https://www.the-guild.dev/graphql/tools/docs/introduction
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { authResolvers, authTypeDefs } from "./modules/auth/index.js";
import { MyContext } from "./types/graphql.js";
import { rootTypeDefs } from "./modules/root/index.js";
// https://stackoverflow.com/questions/65873101/node-requires-file-extension-for-import-statement/65874173#65874173
// https://stackoverflow.com/a/70682797/13723015
// https://stackoverflow.com/questions/72213760/typescript-node-error-err-module-not-found-cannot-find-module/72215487#72215487
// https://www.memory-lovers.blog/entry/2022/05/31/110000
// https://stackoverflow.com/a/64543163/13723015

async function main() {
    const PORT = process.env.PORT || 5555;
    const HOST = process.env.HOST || "localhost";

    const app = express();

    // https://www.apollographql.com/docs/apollo-server/api/express-middleware/#example
    const httpServer = http.createServer(app);

    const server = new ApolloServer<MyContext>({
        typeDefs: mergeTypeDefs([rootTypeDefs, authTypeDefs]),
        resolvers: mergeResolvers([authResolvers]),
        // shut down gracefully.
        // https://www.apollographql.com/docs/apollo-server/workflow/build-run-queries
        // https://www.apollographql.com/docs/apollo-server/api/plugin/drain-http-server
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    // global middle must be come before expressMiddleware
    app.use(
        cors({
            origin: ["http://127.0.0.1:3333", "http://localhost:3333"],
            credentials: true,
        })
    );

    app.use(express.json());

    app.use(
        "/graphql",
        expressMiddleware(server, {
            context: async ({ req, res }) => ({ req, res }),
        })
    );

    app.get("*", (_, res) => {
        res.status(200).send("server is up and running");
    });

    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 server is up and running at http://${HOST}:${PORT}/`);
}

main().catch((err) => console.error(err));
