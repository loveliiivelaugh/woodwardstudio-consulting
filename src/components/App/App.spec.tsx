import { describe, test, expect } from "vitest";
// import { render } from "../../testing/testing";
import { render } from '@testing-library/react';
import App from "./App";

describe("App", () => {
    test("Snapshot", () => {
        const screen = render(<App />);
        expect(screen).toMatchSnapshot();
    });
});