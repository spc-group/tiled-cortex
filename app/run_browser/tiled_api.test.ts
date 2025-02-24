import { getRuns } from "./tiled_api";

const client = {
    get: jest.fn(async () => {
	return {
	    data: {
		data: [],
		meta: {count: 0}
	    }
	}
    }),
};

describe("getRuns() function", () => {
    beforeEach(() => {
	client.get.mockClear();
    });
    it("applies filters", async () => {
	const filters = {
	    "start.uid": "58839482",
	    "stop.exit_status": "success",
	};
	await getRuns({ pageOffset: 10, pageLimit: 20 , client: client, filters: filters });
	expect(client.get.mock.calls).toHaveLength(1);
	const params = client.get.mock.calls[0][1].params;
	const keys = params.getAll("filter[eq][condition][key]");
	expect(keys).toEqual(["start.uid", "stop.exit_status"]);
    });
    it("applies a sort field", async () => {
	await getRuns({ pageOffset: 10, pageLimit: 20 , client: client, sortField: "-start.time" });
	expect(client.get.mock.calls).toHaveLength(1);
	const params = client.get.mock.calls[0][1].params;
	expect(params.get("sort")).toEqual("-start.time");
    });
});
