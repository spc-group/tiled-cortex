import { CheckIcon, ArrowUpIcon, ArrowDownIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';

import { useState } from "react";
import { tiledUri, getApiInfo } from "./tiled_api";


export const SortIcon = ({fieldName, sortField}) => {
    if (sortField == fieldName) {
        return <ArrowDownIcon className="size-4 inline" />;
    } else if (sortField == "-" + fieldName) {
        return <ArrowUpIcon className="size-4 inline" />;
    } else {
        return null;
    }
};


export const allColumns = [
    {
        label:  "Plan",
        name: "plan",
        field: "start.plan_name",
    },
    {
        label:  "Scan",
        name: "scan",
        field: "start.scan_name",
    },
    {
        label:  "Sample",
        name: "sample",
        field: "start.sample_name",
    },
    {
        label:  "Exit Status",
        name: "exit-status",
        field: "stop.exit_status",
    },
    {
        label:  "Start",
        name: "start-time",
        field: "start.time",
    },
    {
        label:  "UID",
        name: "uid",
        field: "start.uid",
    },
    {
        label:  "Proposal",
        name: "proposal",
        field: "start.proposal",
    },
    {
        label:  "ESAF",
        name: "esaf",
        field: "start.esaf",
    },
];


export default function RunTable({runs, selectRun, sortField, setSortField, columns=allColumns}) {
    // A table for displaying a sequence of runs to the user
    // Includes widgets for sorting, etc

    // Curried version of setSortField for each column
    const sortFieldParser = (field) => {
        return (event) => {
            setSortField((prevField) => {
                if (prevField == field) {
                    // Reverse sort order
                    return "-" + field;
                } else if (prevField == "-" + field) {
                    // Turn off sorting
                    return null;
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
              <th className="text-center"><CheckIcon className="inline" /></th>
              <th className="text-center"><ArrowDownTrayIcon className="size-6 inline" /></th>
              {columns.map((col) => {
                  return (
                      <th key={"column-" + col.name}>
                        <div onClick={sortFieldParser(col.field)}>
                          { col.label } <SortIcon fieldName={col.field} sortField={sortField} />
                        </div>
                        <div>
                          <input type="text"
                                 placeholder={"Filter " + col.label}
                                 className="input input-xs input-ghost w-full max-w-xs" value={col.filter}
                                 onChange={(e) => col.setFilter(e.target.value)} />
                        </div>
                      </th>
                  );
              })}
            </tr>
          </thead>
          <tbody>
            {runs ? runs.map(run => (
                <Row run={run} key={run["start.uid"]} onSelect={selectRun} columns={columns} />
            )) : []}
          </tbody>
        </table>
    );
};


const exportFormat = (mimetype) => {
    return {
    }
};

export function Row({ run, onSelect, columns=allColumns, apiUri }) {
    // A row in the run table for a given run
    
    // Handler for selecting a run
    const handleCheckboxChecked = (event) => {
        onSelect(run['start.uid'], event.target.checked);
    };

    // Decide which export formats we support
    const { isLoading, error, data } = useQuery({
        queryKey: ['api-info'],
        queryFn: async () => {
            return await getApiInfo();
        },
    });
    const exportFormats = [];
    if (!isLoading) {
        // Add formats from structure family
        for (let mimeType of data.formats[run.structure_family] || []) {
            const aliases = data.aliases[run.structure_family][mimeType] || [];
            exportFormats.push({
                mimeType: mimeType,
                label: [...aliases, mimeType][0],
                defaultFilename: `test_run.${run.uid}`,
            });
        }
        // Add formats from specs
        for (let spec of run.specs || []) {
            for (let mimeType of data.formats[spec.name] || []) {
                const aliases = data.aliases[spec.name][mimeType] || [];
                const uidFragment = run.uid.split("-")[0];
                const suffix = aliases.length > 0 ? `.${aliases[0]}` : "";
                const scanName = run['start.scan_name'];
                const sampleName = run["start.sample_name"];
                exportFormats.push({
                    mimeType: mimeType,
                    label: [...aliases, mimeType][0],
                    defaultFilename: `${uidFragment}-${sampleName}-${scanName}${suffix}`,
                });
            }
        }
    }
    // Prepare additional data
    let start_time = "";
    if ( run.hasOwnProperty("start_time") ) {
        start_time = run.start_time.toLocaleString();
    }
    const uid = run['start.uid'];
    const runUri = apiUri + "container/full/" + run.uid;
    

    return (
        <tr>
	  <td>
            <input type="checkbox" id="checkbox" className="checkbox" onChange={handleCheckboxChecked} /></td>
          <td>
            <div className="dropdown dropdown-hover dropdown-right">
              <div tabIndex={0} role="button" className="btn btn-ghost m-1 btn-sm"><ArrowDownTrayIcon className="inline size-4" /></div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {
                    exportFormats.map((format) => {
                        return (
                            <li key={`${run.uid}-${format.mimeType}`}>
			      <a href={`${runUri}?format=${format.mimeType}`}
                                 download={format.defaultFilename}>
			        {format.label}
			      </a>
			    </li>);
                    })
                }
              </ul>
                      </div>
          </td>

          {columns.map((col) => {
              let value = run[col.field];
              // Format dates
              if (value instanceof Date) {
                  value = value.toLocaleString();
              }
              return (
                  <td key={uid+col.name}>{value}</td>
              );
          })}
        </tr>

    );
};
