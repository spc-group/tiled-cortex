import { BeakerIcon } from '@heroicons/react/24/solid';


export default function RunTable({runs, selectRun}) {
    // A table for displaying a sequence of runs to the user
    // Includes widgets for sorting, etc

    return (
        <table className="table table-pin-rows w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th><BeakerIcon /></th>
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
            {runs.map(run => (
                <Row run={run} key={run.id} onSelect={selectRun} />
            ))}
          </tbody>
        </table>
    );
};

export function Row({ run, onSelect }) {
    // A row in the run table for a given run
    
    // Handler for selecting a run
    const handleCheckboxChecked = (event) => {
        onSelect(run.id, event.target.checked);
    };

    // Prepare additional data
    let start_time = "";
    if ( run.hasOwnProperty("start_time") ) {
        start_time = run.start_time.toLocaleString();
    }
    return (
        <tr>
	  <td><input type="checkbox" id="checkbox" className="checkbox" onChange={handleCheckboxChecked} /></td>
          <td>{run.plan}</td>
          <td>{run.scan_name}</td>
          <td>{run.sample_name}</td>
          <td>{run.exit_status}</td>
          <td>{start_time}</td>
          <td>{run.id}</td>
          <td>{run.proposal}</td>
          <td>{run.esaf}</td>
        </tr>

    );
};
