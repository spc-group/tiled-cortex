import { useState, useEffect } from "react";
import axios from "axios";
import { FunnelIcon, PresentationChartLineIcon } from '@heroicons/react/24/solid';

import RunTable from "./run_table";


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
    // State for keeping track of filters
    const [filters, setFilters] = useState({});
    // State for keeping track of pagination
    const [pageLimit, setPageLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    function previousPage() {
        setCurrentPage((prevPage) => prevPage-1);
    }
    function nextPage() {
        setCurrentPage((prevPage) => prevPage+1);
    }
    // Hook to retrieve new runs from the API
    async function getRuns() {
        // Retrieve list of runs from the API
	const response = await axios.get('http://localhost:8000/api/v1/search/scans', {
	    params: {
		sort: "-start.time",
                fields: ["metadata"],
                "page[offset]": currentPage*pageLimit,
                "page[limit]": pageLimit,
	    }
	});
        // Parse into a sensible list defintion
	const runs = response.data.data.map((run) => {
	    const start_doc = run.attributes.metadata.start;
	    const stop_doc = (run.attributes.metadata.stop ?? {});
	    const date = new Date(start_doc.time * 1000);
	    return {
		id: run.id,
		plan: start_doc.plan_name,
		scan_name: start_doc.scan_name ?? null,
		sample_name: start_doc.sample_name ?? null,
		exit_status: stop_doc.exit_status ?? null,
		start_time: date.toLocaleString(),
		proposal: start_doc.proposal ?? null,
		esaf: start_doc.esaf ?? null,
	    };
	});
	return await runs;
    }
    useEffect(() => {
	getRuns().then(data => setAllRuns(data));
    }, [filters, pageLimit, currentPage]);
    // Holds the list of all the runs in the run list
    const [allRuns, setAllRuns] = useState([
    ]);
    return (
        <div>
          <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
	      <FunnelIcon />Filters
            </div>
            <div className="collapse-content">
              Filter me!
            </div>
          </div>

          <button className="btn btn-primary">
            <PresentationChartLineIcon />Plot
          </button>

          <div className="relative overflow-x-auto">
	    <RunTable runs={allRuns} />
          </div>
        </div>
    );
}
