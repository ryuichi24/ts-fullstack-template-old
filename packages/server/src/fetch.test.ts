// https://jestjs.io/docs/mock-function-api
import { expect, jest, test } from "@jest/globals";
import { fetch } from "./fetch";

describe("it should fetch one todo item", () => {
    test("fetch get request test", async () => {
        // Buffer.concat = jest.fn<any>(() =>
        //     JSON.stringify({
        //         userId: 1,
        //         id: 1,
        //         title: "delectus aut autem",
        //         completed: false,
        //     })
        // );

        const response = await fetch<{ [key: string]: string }>(
            `https://jsonplaceholder.typicode.com/todos/1`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        expect(response.title).toBe("delectus aut autem");
    });
});
