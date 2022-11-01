/* eslint-disable */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "../components/Counter";
import "@testing-library/jest-dom";

test("increment test", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const button = screen.getByRole("button", { name: "+" });
    await user.click(button);

    expect(screen.getByText(1)).toBeInTheDocument();
});
