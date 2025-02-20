import { useState, useEffect } from "react";
import axios from "axios";

export default function RunList() { 
   // State for keeping track of filters
    const [filters, setFilters] = useState({});
    const [pageLimit, setPageLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    function previousPage() {
        setCurrentPage(currentPage-1);
    }
    function nextPage() {
        setCurrentPage(currentPage+1);
    }
    // Hook to retrieve new runs from the API
    async function getRuns() {
	const response = await axios.get('http://localhost:8000/api/v1/search/scans', {
	    params: {
		sort: "-start.time",
                fields: ["metadata"],
                "page[offset]": currentPage*pageLimit,
                "page[limit]": pageLimit,
	    }
	});
	const runs = response.data.data.map((run) => {
	    // Parse into a sensible list defintion
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
              </svg>
              Filters
            </div>
            <div className="collapse-content">
              Filter me!
            </div>
          </div>

          <button className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
            </svg>

            Plot</button>

          <div className="join">
            <button className="join-item btn" onClick={previousPage} disabled={currentPage < 2}>«</button>
            <button className="join-item btn">Page {currentPage}</button>
            <button className="join-item btn" onClick={nextPage}>»</button>
          </div>
          <select className="select w-20" value={pageLimit} onChange={e => setPageLimit(e.target.value)}>
            <option disabled>Runs per page</option>
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>

          <div className="relative overflow-x-auto">
            <table className="table table-pin-rows w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </th>
                  <th>Plan</th>
                  <th>Scan</th>
                  <th>Sample</th>
                  <th>Exit Status</th>
                  <th>Datetime</th>
                  <th>UID</th>
                  <th>Proposal</th>
                  <th>ESAF</th>
                </tr>
              </thead>
              <tbody>
                {allRuns.map(run => (
                    <tr key={run.id}>
		      <td><input type="checkbox" id="checkbox" className="checkbox" /></td>
        	      <td>{run.plan}</td>
                      <td>{run.scan_name}</td>
                      <td>{run.sample_name}</td>
                      <td>{run.exit_status}</td>
                      <td>{run.start_time}</td>
                      <td>{run.id}</td>
                      <td>{run.proposal}</td>
                      <td>{run.esaf}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    );
}
