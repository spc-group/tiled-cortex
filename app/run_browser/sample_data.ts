// Examples of data structures from the API
const blueskyRun = {
    "id": "fdf4e2e5-b094-4831-8edf-68d3090ca436",
    "attributes": {
	"ancestors": [
	    "scans"
	],
	"structure_family": "container",
	"specs": [
	    {
		"name": "BlueskyRun",
		"version": "1.0"
	    }
	],
	"metadata": {
	    "start": {
		"uid": "fdf4e2e5-b094-4831-8edf-68d3090ca436",
		"time": 1665095120.667265,
		"versions": {
		    "ophyd": "1.7.0",
		    "bluesky": "1.9.0"
		},
		"scan_id": 18,
		"plan_type": "generator",
		"plan_name": "scan",
		"detectors": [
		    "I0",
		    "It"
		],
		"motors": [
		    "knife"
		],
		"num_points": 40,
		"num_intervals": 39,
		"plan_args": {
		    "detectors": [
			"IonChamber(prefix='25iddVME:3820:scaler1', name='I0', read_attrs=['raw_counts'], configuration_attrs=[])",
			"IonChamber(prefix='25iddVME:3820:scaler1', name='It', read_attrs=['raw_counts'], configuration_attrs=[])"
		    ],
		    "num": 40,
		    "args": [
			"EpicsMotor(prefix='25iddVME:m22', name='knife', settle_time=0.0, timeout=None, read_attrs=['user_readback', 'user_setpoint'], configuration_attrs=['user_offset', 'user_offset_dir', 'velocity', 'acceleration', 'motor_egu'])",
			    -20500,
			    -14000
		    ],
		    "per_step": "None"
		},
		"hints": {
		    "dimensions": [
			[
			    [
				"knife"
			    ],
			    "primary"
			]
		    ]
		},
		"plan_pattern": "inner_product",
		"plan_pattern_module": "bluesky.plan_patterns",
		"plan_pattern_args": {
		    "num": 40,
		    "args": [
			"EpicsMotor(prefix='25iddVME:m22', name='knife', settle_time=0.0, timeout=None, read_attrs=['user_readback', 'user_setpoint'], configuration_attrs=['user_offset', 'user_offset_dir', 'velocity', 'acceleration', 'motor_egu'])",
			    -20500,
			    -14000
		    ]
		}
	    },
	    "stop": {
		"run_start": "fdf4e2e5-b094-4831-8edf-68d3090ca436",
		"time": 1665095186.02827,
		"uid": "1d262685-5a2c-4852-b852-f340417c2ffe",
		"exit_status": "success",
		"reason": "",
		"num_events": {
		    "primary": 40
		}
	    }
	},
	"structure": {
	    "contents": null,
	    "count": 1
	},
	"sorting": [
	    {
		"key": "",
		"direction": 1
	    }
	],
	"data_sources": null
    },
    "links": {
	"self": "http://localhost:8000/api/v1/metadata/scans/fdf4e2e5-b094-4831-8edf-68d3090ca436",
	"search": "http://localhost:8000/api/v1/search/scans/fdf4e2e5-b094-4831-8edf-68d3090ca436",
	"full": "http://localhost:8000/api/v1/container/full/scans/fdf4e2e5-b094-4831-8edf-68d3090ca436"
    },
    "meta": null
};
const containerNode = {
    "id": "postgres",
    "attributes": {
	"ancestors": [],
	"structure_family": "container",
	"specs": [],
	"metadata": {},
	"structure": {
	    "contents": null,
	    "count": 73
	},
	"sorting": [
	    {
		"key": "",
		"direction": 1
	    }
	],
	"data_sources": null
    },
    "links": {
	"self": "http://localhost:8000/api/v1/metadata/postgres",
	"search": "http://localhost:8000/api/v1/search/postgres",
	"full": "http://localhost:8000/api/v1/container/full/postgres"
    },
    "meta": null
};
