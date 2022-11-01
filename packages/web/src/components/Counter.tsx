import React from "react";
import { useCounter } from "../hooks/useCounter";

export const Counter: React.FC = () => {
    const { count, increment, decrement } = useCounter();

    return (
        <div>
            {count}
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
};
