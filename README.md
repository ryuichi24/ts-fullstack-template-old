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