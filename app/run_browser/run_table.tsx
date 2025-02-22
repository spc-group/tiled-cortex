import { CheckIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';



export const SortIcon = ({fieldName, sortField}) => {
    if (sortField == fieldName) {
        return <ArrowDownIcon />;
    } else if (sortField == "-" + fieldName) {
        return <ArrowUpIcon />;
    } else {
        return null;
    }
};


let columns = new Map([
    ["Plan", "start.plan_name"],
    ["Scan", "start.scan_name"],
    ["Sample", "start.sample_name"],
    ["Exit Status", "stop.exit_status"],
    ["Start", "start.time"],
    ["UID", "start.uid"],
    ["Proposal", "start.proposal"],
    ["ESAF", "start.esaf"],
]);


export default function RunTable({runs, selectRun, sortField, setSortField}) {
    // A table for displaying a sequence of runs to the user
    // Includes widgets for sorting, etc

    // Curried version of setSortField for each column
    const sortFieldParser = (field) => {
        return (event) => {
            setSortField((prevField) => {
                if (prevField == field) {
                    // Reverse sort order
                    return "-" + field;
                } else {
                    // Forward sort order
                    return field;
                }
            });
        };
    };

    // Render
    return (
        <table className="table table-pin-rows w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th><CheckIcon /></th>
              {[...columns.keys()].map((name) => {
                  const field = columns.get(name);
                  return (
                      <th onClick={sortFieldParser(field)} key={"column-" + field}>
                        { name } <SortIcon fieldName={field} sortField={sortField} />
                      </th>
                  );
              })}
            </tr>
          </thead>
          <tbody>
            {runs.map(run => (
                <Row run={run} key={run["start.uid"]} onSelect={selectRun} />
            ))}
          </tbody>
        </table>
    );
};

export function Row({ run, onSelect }) {
    // A row in the run table for a given run
    
    // Handler for selecting a run
    const handleCheckboxChecked = (event) => {
        onSelect(run['start.uid'], event.target.checked);
    };

    // Prepare additional data
    let start_time = "";
    if ( run.hasOwnProperty("start_time") ) {
        start_time = run.start_time.toLocaleString();
    }
    const uid = run['start.uid'];
    return (
        <tr>
	  <td><input type="checkbox" id="checkbox" className="checkbox" onChange={handleCheckboxChecked} /></td>
          {[...columns.keys()].map((key) => {
              let value = run[columns.get(key)];
              // Format dates
              if (value instanceof Date) {
                  value = value.toLocaleString();
              }
              return (
                  <td key={uid+columns.get(key)}>{value}</td>
              );
          })}
        </tr>

    );
};
