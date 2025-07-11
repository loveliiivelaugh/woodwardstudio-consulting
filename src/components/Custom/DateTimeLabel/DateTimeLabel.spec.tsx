import { act, render, screen } from "@testing-library/react";
import DateTimeLabel from "./DateTimeLabel";
import moment from "moment";

describe("DateTimeLabel", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2024-01-01T12:00:00")); // Fixed starting time
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("renders the current time in 'h:mm:ss A' format", () => {
        render(<DateTimeLabel />);
        const expectedTime = moment().format("h:mm:ss A");
        // @ts-expect-error
        expect(screen.getByText(expectedTime)).toBeInTheDocument();
    });

    it("updates the time every second", () => {
        render(<DateTimeLabel />);

        const firstTime = moment().format("h:mm:ss A");
        // @ts-expect-error
        expect(screen.getByText(firstTime)).toBeInTheDocument();

        // Advance timers by 1 second
        act(() => {
            vi.advanceTimersByTime(1000);
        });

        const secondTime = moment().add(1, "second").format("h:mm:ss A");
        // @ts-expect-error
        expect(screen.getByText(secondTime)).toBeInTheDocument();

        // Advance timers by another second
        act(() => {
            vi.advanceTimersByTime(1000);
        });

        const thirdTime = moment().add(2, "seconds").format("h:mm:ss A");
        // @ts-expect-error
        expect(screen.getByText(thirdTime)).toBeInTheDocument();
    });
});
