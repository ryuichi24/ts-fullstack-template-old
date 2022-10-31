import express from "express";
import cors from "cors";

async function main() {
  const PORT = process.env.PORT || 5555;
  const HOST = process.env.HOST || "localhost";
  const app = express();

  app.use(
    cors({
      origin: ["http://127.0.0.1:3333"],
      credentials: true,
    })
  );

  app.get("*", (_, res) => {
    res.status(200).send("server is up and running");
  });

  app.listen(PORT, () =>
    console.log(`server is up and running at http://${HOST}:${PORT}`)
  );
}

main();
