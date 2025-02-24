import { useState, useEffect } from "react";
import { FunnelIcon, PresentationChartLineIcon } from '@heroicons/react/24/solid';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

import RunTable, { allColumns } from "./run_table";
import { getRuns } from "./tiled_api";



export function Paginator({ runCount, pageLimit, setPageLimit, pageOffset, setPageOffset }) {
    const [runsPerPage, setRunsPerPage] = useState(10);
    // Handlers for swapping pages
    const previousPage = () => {
        setPageOffset((prevOffset) => {
            const newOffset = Math.max(prevOffset - runsPerPage, 0);
            setPageLimit(newOffset + runsPerPage);
            return newOffset;
        });
    };
    const nextPage = () => {
        setPageOffset((prevOffset) => {
            const newOffset = Math.min(pageOffset + runsPerPage, runCount - runsPerPage);
            setPageLimit(newOffset + runsPerPage);
            return newOffset;
        });
    };

    // Render
    const currentPage = (pageOffset / runsPerPage) + 1;
    return (
        <div>
          <div className="join">
            <button className="join-item btn" onClick={previousPage} disabled={pageOffset == 0}>«</button>
            <button className="join-item btn">Page {currentPage}</button>
            <button className="join-item btn" onClick={nextPage} disabled={pageOffset+runsPerPage>=runCount}>»</button>
            <div>{pageOffset} {runsPerPage} {runCount}</div>
          </div>
          <select className="select w-20" value={pageLimit} onChange={e => setPageLimit(e.target.value)}>
            <option disabled>Runs per page</option>
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>

        </div>
    );
}

export default function RunList() { 
    // State for keeping track of pagination
    const [pageLimit, setPageLimit] = useState(10);
    const [pageOffset, setPageOffset] = useState(0);

    // State for selecting which field to use for sorting
    const [sortField, setSortField] = useState(null);

    // State variables to keep track of how to filer the runs
    const columns = [...allColumns];
    for (let col of columns) {
        [ col.filter, col.setFilter ] = useState("");
    }
    const filterStates = columns.map((col) => col.filter);

    const loadRuns = async () => {
        // Prepare list of filters
        const filters = new Map();
        for (let col of columns) {
            if (col.filter !== "") {
                filters.set(col.field, col.filter);
            }
        }
        return await getRuns({filters, pageLimit, pageOffset, sortField});
    };

    // Query for retrieving data for the list of runs
    const { isLoading, error, result } = useQuery({
        queryKey: ['all-runs'],
        queryFn: loadRuns(),
    });
    const allRuns = result === undefined ? [] : result.runs;
    const runCount = result === undefined ? 0 : result.count;
    return (
        <div>
            <button className="btn btn-primary">
              <PresentationChartLineIcon />Plot
            </button>

          <div>
            <Paginator runCount={runCount} pageLimit={pageLimit} setPageLimit={setPageLimit} pageOffset={pageOffset} setPageOffset={setPageOffset} />
          </div>

            <div className="relative overflow-x-auto">
	      <RunTable runs={allRuns} columns={columns} sortField={sortField} setSortField={setSortField} />
            </div>
        </div>
    );
}
