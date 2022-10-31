import * as https from "https";

interface FetchOptions {
    method: string;
    body?: any;
    headers: { [key: string]: string };
    timeout?: number;
}

export async function fetch<TResponse>(url: string, options: FetchOptions) {
    return new Promise<TResponse>((resolve, reject) => {
        const request = https.request(
            url,
            {
                method: options.method,
                headers: options.headers,
                timeout: options.timeout,
            },
            (response) => {
                if (
                    response.statusCode &&
                    (response.statusCode < 200 || response.statusCode > 299)
                ) {
                    return reject(new Error(`${response.statusMessage!}:${response.statusCode}`));
                }

                const body: any[] = [];
                response.on("data", (chunk) => body.push(chunk));
                response.on("end", () => {
                    const concatenated = Buffer.concat(body).toString();
                    if (response.headers["content-type"]?.includes("application/json")) {
                        return resolve(JSON.parse(concatenated) as TResponse);
                    }

                    return resolve(concatenated as TResponse);
                });
            }
        );

        request.on("error", (err) => {
            reject(err);
        });

        if (options.timeout) {
            request.on("timeout", () => {
                request.destroy();
                reject(new Error(`Timeout: exceeded ${options.timeout!}`));
            });
        }

        if (
            (options.method === "POST" || options.method === "PATCH") &&
            options.headers["content-type"].includes("application/json")
        ) {
            const body = JSON.stringify(options.body);
            request.write(body);
        }

        request.end();
    });
}
