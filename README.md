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