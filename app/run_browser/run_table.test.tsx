import * as React from "react";
import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import RunTable, {Row} from "./run_table";


describe("run table", () => {
    let user, setSortField;
    beforeEach(() => {
        user = userEvent.setup();
        setSortField = jest.fn((newLimit) => {});
    });
    it("creates rows for each run", () => {
	const runs = [
	    {"start.uid": "4e4a2ec3-5d33-4f47-b6a3-15cfdf1e41aa"},
	    {"start.uid": "391c9a55-8dfa-4faa-be49-e60140596b7c"},
	];
	render(<RunTable runs={runs} />);
	expect(screen.getByText("4e4a2ec3-5d33-4f47-b6a3-15cfdf1e41aa")).toBeInTheDocument();
	expect(screen.getByText("391c9a55-8dfa-4faa-be49-e60140596b7c")).toBeInTheDocument();
    });
    it("can (de)select a run", async () => {
	const selectRun = jest.fn((uid, isSelected) => {});
	// Prepare the UI
	const runs = [{"start.uid": "4e4a2ec3-5d33-4f47-b6a3-15cfdf1e41aa"}];
	render(<RunTable runs={runs} selectRun={selectRun} />);
	const checkbox = screen.getByRole("checkbox");
	// Check the box
	await user.click(checkbox);
	expect(checkbox).toBeChecked();
	// Un-check the box
	await user.click(checkbox);
	expect(checkbox).not.toBeChecked();
	// Was the selection updated properly?
	expect(selectRun.mock.calls).toHaveLength(2);
	expect(selectRun.mock.calls[0][0]).toEqual("4e4a2ec3-5d33-4f47-b6a3-15cfdf1e41aa");
	expect(selectRun.mock.calls[0][1]).toBe(true);
	expect(selectRun.mock.calls[1][0]).toEqual("4e4a2ec3-5d33-4f47-b6a3-15cfdf1e41aa");
	expect(selectRun.mock.calls[1][1]).toBe(false);

    });
    it("sorts ascending by column", async () => {
	render(<RunTable runs={[]} setSortField={setSortField} sortField={null} />);
        const heading = screen.getByText("UID");
        await user.click(heading);
        // Check that we updated the sort field properly
        expect(setSortField.mock.calls).toHaveLength(1);
        expect(setSortField.mock.calls[0][0](null)).toEqual("start.uid");
    });
    it("sorts descending by column", async () => {
	render(<RunTable runs={[]} setSortField={setSortField} sortField={"start.uid"} />);
        const heading = screen.getByText("UID");
        await user.click(heading);
        // Check that we updated the sort field properly
        expect(setSortField.mock.calls).toHaveLength(1);
        expect(setSortField.mock.calls[0][0]("start.uid")).toEqual("-start.uid");
    });
    it("turns off sorting", async () => {
	render(<RunTable runs={[]} setSortField={setSortField} sortField={"-start.uid"} />);
        const heading = screen.getByText("UID");
        await user.click(heading);
        // Check that we updated the sort field properly
        expect(setSortField.mock.calls).toHaveLength(1);
        expect(setSortField.mock.calls[0][0]("-start.uid")).toEqual(null);
    });

});


describe("run table row", () => {
    it("has the correct columns", () => {
        const run = {
            "start.uid": "4e4a2ec3-5d33-4f47-b6a3-15cfdf1e41aa",
            "start.plan_name": "rel_scan",
	    "start.scan_name": "copper tastic",
	    "start.sample_name": "SrN03",
	    "stop.exit_status": "success",
	    "start.time": new Date(0),
	    "start.proposal": "2",
	    "start.esaf": "13",

        };
	render(<table><tbody><Row run={run} /></tbody></table>);
        expect(screen.getByText("4e4a2ec3-5d33-4f47-b6a3-15cfdf1e41aa")).toBeInTheDocument();
        expect(screen.getByText("rel_scan")).toBeInTheDocument();
        expect(screen.getByText("SrN03")).toBeInTheDocument();
        expect(screen.getByText("success")).toBeInTheDocument();
        expect(screen.getByText("12/31/1969, 6:00:00 PM")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("13")).toBeInTheDocument();
    });
});
