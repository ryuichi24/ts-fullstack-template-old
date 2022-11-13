## scaffold frontend

```bash
t=packages
mkdir ${t} && cd ${t}
```

```bash
t=web
# https://vitejs.dev/guide/
npm create vite@latest ${t} -- --template react-ts
cd ${t} && npm install -E
```

```bash
npm run dev
```

## scaffold backend

```bash
t=server
cd .. && mkdir ${t} && cd ${t}
```

```bash
npm init -y
```

```bash
npm install -E express cors
```

```bash
npm install -D -E @types/node @types/express @types/cors typescript nodemon
```

```bash
npx tsc --init
```

## add eslint and formatter

```bash
npm install -D -E eslint prettier
npm install -DE eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

```bash
npx eslint --init
```

```bash
vscode@fc1b701e9cf0:~/workspace/packages/web$ npx eslint --init
You can also run this command directly using 'npm init @eslint/config'.
Need to install the following packages:
  @eslint/create-config@0.4.0
Ok to proceed? (y) y
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JavaScript
The config that you've selected requires the following dependencies:

eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
Installing eslint-plugin-react@latest, @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest

added 70 packages, and audited 353 packages in 31s

84 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
A config file was generated, but the config file itself may not follow your linting rules.
Successfully created .eslintrc.cjs file in /home/vscode/workspace/packages/web
```

```bash
npm install -D -E eslint-plugin-react-hooks
```

```bash
touch .prettierrc.cjs
```

## pre commit

https://stackoverflow.com/a/40828248/13723015
https://gist.github.com/linhmtran168/2286aeafe747e78f53bf#file-pre-commit-eslint-L23
https://stackoverflow.com/questions/3703159/git-remote-shared-pre-commit-hook

## add jest in server

```bash
npm install -D -E jest ts-jest @types/jest ts-node ts-jest-resolver
```

```bash
npx ts-jest config:init
```

## add tailwind

https://tailwindcss.com/docs/configuration#type-script-types
s

```bash
npm install -D -E tailwindcss postcss autoprefixer
```

```bash
npx tailwindcss init -p
```

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## jest in web

https://stackoverflow.com/a/69228464/13723015
https://tech.fun-toy-life.com/entry/2022/09/09/202450
https://zenn.dev/naonao70/articles/26fa670a2ef31c
https://www.webopixel.net/javascript/1777.html
https://zenn.dev/iamtillmans/articles/171f41fbd03c89
https://zenn.dev/longbridge/articles/9e9758181c8846

```bash
npm install -D -E jest ts-jest @types/jest @testing-library/react @testing-library/user-event @testing-library/jest-dom jest-environment-jsdom cross-fetch
```

## es module vs commonjs

https://zenn.dev/longbridge/articles/9e9758181c8846

## sum

https://www.pixelmatters.com/blog/how-to-set-up-a-front-end-project-with-vite-react-and-typescript

## add apollo server

```bash
npm -E install @apollo/server graphql
```

## add graphql type code generator for web

```bash
npm install -E @apollo/client graphql
```

```bash
npm install -D -E @graphql-codegen/cli @graphql-codegen/typescript-react-apollo @graphql-codegen/typescript @graphql-codegen/typescript-operations
```

```bash
mkdir src/graphql && mkdir generated
```

```bash
npx graphql-code-generator init
```

```bash
vscode@fc1b701e9cf0:~/workspace/packages/web$ npx graphql-code-generator init

    Welcome to GraphQL Code Generator!
    Answer few questions and we will setup everything for you.

? What type of application are you building? Application built with React
? Where is your schema?: (path or url) http://localhost:5555/graphql
? Where are your operations and fragments?: src/graphql/**/*.graphql
? Where to write the output: src/generated
? Do you want to generate an introspection file? No
? How to name the config file? codegen.yml
? What script in package.json should run the codegen? gen

    Config file generated at codegen.yml

      $ npm install

    To install the plugins.

      $ npm run gen

    To run GraphQL Code Generator.
```

https://github.com/dotansimha/graphql-code-generator/issues/8488

## add graphql type code generator for server

https://www.apollographql.com/docs/apollo-server/workflow/generate-types/

```bash
npm install -D -E @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers
```

```bash
mkdir src/generated
```

```bash
npx graphql-code-generator init
```

```bash
vscode@fc1b701e9cf0:~/workspace/packages/server$ npx graphql-code-generator init

    Welcome to GraphQL Code Generator!
    Answer few questions and we will setup everything for you.

? What type of application are you building? Backend - API or server
? Where is your schema?: (path or url) http://localhost:5555/graphql
? Pick plugins: TypeScript (required by other typescript plugins), TypeScript Resolvers (strongly typed resolve functions)
? Where to write the output: src/generated/graphql.ts
? Do you want to generate an introspection file? No
? How to name the config file? codegen.yml
? What script in package.json should run the codegen? gen
Fetching latest versions of selected plugins...
(node:22641) ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)

    Config file generated at codegen.yml

      $ npm install

    To install the plugins.

      $ npm run gen

    To run GraphQL Code Generator.
```

## add prisma

https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb
https://www.prisma.io/docs/guides/migrate-to-prisma/migrate-from-mongoose
https://stackoverflow.com/questions/72282755/prisma-mongodb-cant-create-a-user-model

```bash
npm install -E prisma @prisma/client
```

```bash
npx prisma init
```

```bash
vscode@dc9e62cad3fe:~/workspace/packages/server$ npx prisma init

✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started
```

## add auth

```bash
npm install -E jsonwebtoken argon2 nodemailer dotenv
```

```bash
npm install -D -E @types/nodemailer dotenv-cli
```

## add auto import schema

```bash
npm install -E glob -w server
```

```bash
npm install -E -D @types/glob -w server
```

https://vccolombo.github.io/blog/tsc-how-to-copy-non-typescript-files-when-building/

```bash
npm install -E -D copyfiles rimraf -w server
```

## add router

```bash
npm install -E react-router-dom -w web
```

## add custom scalar

```bash
npm install -E  graphql-scalars -w server
```

https://the-guild.dev/graphql/scalars/docs

## others

https://github.com/vitejs/vite/issues/383
https://sachee.medium.com/200-ok-error-handling-in-graphql-7ec869aec9bc
https://shinesolutions.com/2021/06/30/automatically-handling-apollo-client-errors-in-your-react-ui/
