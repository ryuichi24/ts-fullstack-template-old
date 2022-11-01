import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter hook", () => {
    test("increment test", () => {
        const { result } = renderHook(() => useCounter());
        act(() => result.current.increment());
        expect(result.current.count).toBe(1);
    });

    test("decrement test", () => {
        const { result } = renderHook(() => useCounter());
        act(() => result.current.decrement());
        expect(result.current.count).toBe(-1);
    });
});
