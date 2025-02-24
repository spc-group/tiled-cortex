import * as React from "react";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getRuns } from "./tiled_api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RunList, { Paginator } from "./run_list";


jest.mock("./tiled_api", () => ({
    "getRuns": jest.fn(() => Promise.resolve([])),
}));


describe("paginator", () => {
    let user, setPageLimit, setPageOffset;
    beforeEach(() => {
        user = userEvent.setup();
        setPageLimit = jest.fn((newLimit) => {});
        setPageOffset = jest.fn((newOffset) => {});
    });
    it("increments the page", async () => {
	// Render the component
	render(<Paginator runCount={50} pageOffset={10} setPageOffset={setPageOffset} setPageLimit={setPageLimit} />);
        // Change the page
        expect(screen.getByText("Page 2")).toBeInTheDocument();
        const button = screen.getByText("»");
        await user.click(button);
        expect(setPageOffset.mock.calls).toHaveLength(1);
        expect(setPageOffset.mock.calls[0][0](10)).toEqual(20);
        expect(setPageLimit.mock.calls).toHaveLength(1);
        expect(setPageLimit.mock.calls[0][0]).toEqual(30);
    });
    it("decrements the page", async () => {
	// Render the component
	render(<Paginator runCount={50} pageOffset={20} setPageOffset={setPageOffset} setPageLimit={setPageLimit} />);
        // Change the page
        expect(screen.getByText("Page 3")).toBeInTheDocument();
        const button = screen.getByText("«");
        await user.click(button);
        expect(setPageOffset.mock.calls).toHaveLength(1);
        expect(setPageOffset.mock.calls[0][0](20)).toEqual(10);
        expect(setPageLimit.mock.calls).toHaveLength(1);
        expect(setPageLimit.mock.calls[0][0]).toEqual(20);
    });
    it("stops at zero", async () => {
        render(<Paginator runCount={50} pageOffset={15} setPageOffset={setPageOffset} setPageLimit={setPageLimit} />);
        // Change the page
        let button = screen.getByText("«");
        await user.click(button);
        expect(setPageOffset.mock.calls).toHaveLength(1);
        expect(setPageOffset.mock.calls[0][0](5)).toEqual(0);
    });
    it("stops at the max count", async () => {
        render(<Paginator runCount={40} pageOffset={25} setPageOffset={setPageOffset} setPageLimit={setPageLimit} />);
        // Change the page
        const button = screen.getByText("»");
        await user.click(button);
        expect(setPageOffset.mock.calls).toHaveLength(1);
        expect(setPageOffset.mock.calls[0][0](25)).toEqual(30);
    });
    it("disables buttons at the limits", () => {
        // This row count should just fit inside the 10 runs per page
        render(<Paginator runCount={10} pageOffset={0} setPageOffset={setPageOffset} setPageLimit={setPageLimit} />);
        let button = screen.getByText("«");
        expect(button).toBeDisabled();
        button = screen.getByText("»");
        expect(button).toBeDisabled();
    });
    it("enables buttons just insde the limits", () => {
        // This row count should have one leftover run that needs to be on each of adjacent pages
        render(<Paginator runCount={12} pageOffset={1} setPageOffset={setPageOffset} setPageLimit={setPageLimit} />);
        let button = screen.getByText("«");
        expect(button).toBeEnabled();
        button = screen.getByText("»");
        expect(button).toBeEnabled();
    });

});


describe("run list", () => {
    let user;
    beforeEach(async () => {
	getRuns.mockClear();
	const queryClient = new QueryClient();
	await React.act(async () => {
	    render(
                <QueryClientProvider client={queryClient}>
                  <RunList />
                </QueryClientProvider>);
	});
	user = userEvent.setup();

    });
    it("selects a run", () => {
    });
    it("applies filters", async () => {
        // Find a filter text box
        const textbox = screen.getByPlaceholderText("Filter by UID");
	getRuns.mockClear();
        await user.type(textbox, "a");
	expect(getRuns.mock.calls).toHaveLength(1);
	expect(getRuns.mock.calls[0][0]["filters"]).toEqual(new Map([["start.uid", "a"]]));
    });

});

describe("API client", () => {
});
