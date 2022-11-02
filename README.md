<h1 align="center">TS Fullstack Template</h1>

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
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
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

## add graphql type code generator
```bash
npm install -D -E @graphql-codegen/cli @graphql-codegen/typescript-react-apollo
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