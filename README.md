<h1 align="center">TS Fullstack Template</h1>

This is a template project for typescript full-stack project.

# Technologies
- TypeScript
- React
- Express
- Mongo DB
- electron
- Prisma (ORM)
- jest (testing lib)
- eslint
- Apollo server
- Apollo client
- GraphQL Code Generator (auto generate TypeScript types)
- vite (build tool)
- tailwind (css)

# How to get started

just copy and paste the script below to your terminal, replace `<PROJECT NAME>` with your arbitrary project name, and execute it.

```bash
PROJECT_NAME=<PROJECT NAME>

WORKSPACE_URL="https://raw.githubusercontent.com/ryuichi24/ts-fullstack-template/main/init.sh"

curl -s ${WORKSPACE_URL} | bash -s -- ${PROJECT_NAME} \
    && cd ${PROJECT_NAME}
```

once you set up the project, just turn on docker in your machine and enter the dev container.
and then execute the command below:

```bash
npm install
```

You need to update some of the environmental variables in `./packages/server/.env.development` file such as:

- `DATABASE_URL`
- `MAILER_HOST`
- `MAILER_PORT`
- `MAILER_AUTH_USER`
- `MAILER_AUTH_PASSWORD`

you can replace `DATABASE_URL` with your own mongodb connection string but I suggest you use MongoDB atlas because Prisma requires mongo db replica to make it work.

As for `MAILER_*`, you can of course, use your own mail server but to make it simple, you can use nodemailer dummy server, to make a test account, you can run the command below:

```bash
npm run createNodemailerTestAccount:server
```

you can find the credentials at `./packages/server/nodemailer-test-account.json`. and update .env.development file accordingly.

once everything is setup, you can finally run the project like:

## Server

```bash
npm run dev:server
```

## React front end

```bash
npm run dev:web
```

enjoy!
