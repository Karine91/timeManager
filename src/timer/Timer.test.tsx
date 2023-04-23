import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Timer from ".";

describe("timer", function () {
  it("init state of start button", () => {
    render(<Timer />);

    const button = screen.getByRole("button", { name: "Start" });
    expect(button).toBeInTheDocument();
  });

  it("start button should say Pause if timer have started", async () => {
    const user = userEvent.setup();

    render(<Timer />);

    const button = screen.getByRole("button", { name: "Start" });
    await user.click(button);
    expect(button).toHaveTextContent("Pause");
  });
});
