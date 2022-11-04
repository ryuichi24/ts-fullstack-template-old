import dotEnv from "dotenv";
import path from "path";

if (process.env.NODE_ENV) {
    // http://var.blog.jp/archives/75679197.html
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const workingDir = path.dirname(path.dirname(__dirname));
    const dotenvFile = path.join(workingDir, `.env.${process.env.NODE_ENV}`);
    dotEnv.config({ path: dotenvFile });
} else {
    dotEnv.config();
}

const appSettings = {
    SERVER: {
        PORT: process.env.PORT || 5555,
        HOST: process.env.HOST || "localhost",
        ENV: process.env.NODE_ENV || "development",
        SECURE_COOKIE: process.env.SECURE_COOKIE === "true",
        FRONTEND_HOST: process.env.FRONTEND_URL || "http://localhost:3333",
    },
    DB_SETTING: {
        HOST: process.env.DB_HOST || "localhost",
        PORT: process.env.DB_PORT || "27017",
        PASSWORD: process.env.DB_PASSWORD || "thisIsReallyStrongPassword123",
        USERNAME: process.env.DB_USERNAME || "dbuser",
        DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING || null,
    },
    AUTH: {
        ACCESS_TOKEN: {
            SECRET:
                process.env.AUTH_ACCESS_TOKEN_SECRET || "AI5aJJhx_NqD74LG6WeCdMBIgE7yX9rwaLUMMoLT",
            EXPIRES_IN: process.env.AUTH_ACCESS_TOKEN_EXPIRES_IN || "900000",
        },
        REFRESH_TOKEN: {
            SECRET:
                process.env.AUTH_REFRESH_TOKEN_SECRET || "qUfUAFZAz4POAVfmHx5I_Gk1jszRGFY2zXaL9CpY",
            EXPIRES_IN: process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN || "86400000",
        },
        EMAIL_CONFIRM_TOKEN: {
            SECRET:
                process.env.AUTH_EMAIL_CONFIRM_TOKEN_SECRET ||
                "f4fj94iruj29okwrjdi23r2uifhuwfhweifdu2h",
            EXPIRES_IN: process.env.AUTH_EMAIL_CONFIRM_TOKEN_EXPIRES_IN || "86400000",
        },
    },
    MAILER: {
        HOST: process.env.MAILER_HOST || "smtp.ethereal.email",
        PORT: typeof process.env.MAILER_PORT === "string" ? parseInt(process.env.MAILER_PORT) : 587,
        AUTH: {
            USER: process.env.MAILER_AUTH_USER || "skouzui2u2vs4lsk@ethereal.email",
            PASSWORD: process.env.MAILER_AUTH_PASSWORD || "FHd5XjNH2GNN96AVqY",
        },
    },
};

export { appSettings };
