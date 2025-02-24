import axios from "axios";

export const v1Client = axios.create({
    baseURL: "http://localhost:8000/api/v1/"
});

// Hook to retrieve new runs from the API
export const getRuns = async ({ pageOffset, pageLimit, filters = {}, client = v1Client, sortField= null}) => {
    // Set up query parameters
    const params = new URLSearchParams();
    if (sortField !== null) {
	params.append("sort", sortField);
    }
    params.append("fields", "metadata");
    params.append("page[offset]", pageOffset);
    params.append("page[limit]", pageLimit);
    let value;
    for (let field in filters) {
	params.append("filter[eq][condition][key]", field);
	params.append("filter[eq][condition][value]", filters[field]);
    }
    // retrieve list of runs from the API
    const response = await client.get('search/scans', {
	params: params,
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
    return await {
	runs: runs,
	count: response.data.meta.count,
    };
};
