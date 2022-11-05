// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Express {
    export interface Request {
        parsedCookies: { [key: string]: string };
    }
}
