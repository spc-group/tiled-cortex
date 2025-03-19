import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("catalog", "run_browser/catalog.tsx"),
    route("catalog/:uid/lineplot", "run_browser/run.tsx"),
] satisfies RouteConfig;
