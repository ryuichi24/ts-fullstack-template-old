import express from "express";
import cors from "cors";
import { fetch } from "./fetch.js";
// https://stackoverflow.com/questions/65873101/node-requires-file-extension-for-import-statement/65874173#65874173
// https://stackoverflow.com/a/70682797/13723015
// https://stackoverflow.com/questions/72213760/typescript-node-error-err-module-not-found-cannot-find-module/72215487#72215487
// https://www.memory-lovers.blog/entry/2022/05/31/110000
// https://stackoverflow.com/a/64543163/13723015

async function main() {
    const PORT = process.env.PORT || 5555;
    const HOST = process.env.HOST || "localhost";
    const app = express();

    fetch("https://example.com", { method: "GET", headers: {} })
        .then(console.log)
        .catch(console.log);

    app.use(
        cors({
            origin: ["http://127.0.0.1:3333"],
            credentials: true,
        })
    );

    app.get("*", (_, res) => {
        res.status(200).send("server is up and running");
    });

    app.listen(PORT, () => console.log(`server is up and running at http://${HOST}:${PORT}`));
}

main().catch((err) => console.error(err));
