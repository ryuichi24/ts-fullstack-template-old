import { useState } from "react";

export type returnType = {
    count: number;
    increment: () => void;
    decrement: () => void;
};

export const useCounter = (): returnType => {
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    return {
        count,
        increment,
        decrement,
    };
};
