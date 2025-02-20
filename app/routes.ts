import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("runs/", "run_browser/routes.tsx"),
] satisfies RouteConfig;
