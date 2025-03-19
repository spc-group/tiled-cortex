import {ListBulletIcon, CalendarDaysIcon} from "@heroicons/react/24/solid";
import { NavLink } from "react-router";
import {
  useQuery,
} from '@tanstack/react-query';

import { getMetadata } from "./tiled_api";


// Retrieve metadata and data keys for this dataset
const loadRunMetadata = async (catalog: string, uid: string) => {
    // const response = await getMetadata({});
    const response = await getMetadata({path: `${catalog}/${uid}`});
    return response;
};


const loadDataKeys = async () => {
    return [];
};


export default function Run({params}) {
    const uid = params.uid;
    const catalog = "scans";
    const {isLoading, error, data} = useQuery({
        queryFn: async () => loadRunMetadata(catalog, uid),
        queryKey: ["metadata", uid],
    });
    console.log(isLoading, error, data);
    const runMetadata = {
        uid: params.uid,
        "start.scan_name": "o3_capillary+mask. S beam = +1050",
        "start.plan_name": "scan",
        "start.sample_name": "SiN",
    };
    return (
        <div className="m-4">
          {/* Header for the run as a whole */}
          <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">{runMetadata["start.scan_name"]}</h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarDaysIcon area-hidden="true" className="mr-1.5 size-5 shrink-0" />{runMetadata.uid}
            </div>
          </div>
          <div role="tablist" className="tabs tabs-border">
            <NavLink to="multiples" role="tab" className="tab">Multiples</NavLink>
            <NavLink to="lineplot" role="tab" className="tab tab-active">Line</NavLink>
            <NavLink to="gridplot" role="tab" className="tab">Grid</NavLink>
            <NavLink to="frames" role="tab" className="tab">Frames</NavLink>
            <NavLink to="metadata" role="tab" className="tab">Metadata</NavLink>
          </div>
        </div>);
}
