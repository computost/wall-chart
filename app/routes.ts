import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("find-workers", "routes/find-workers.ts"),
] satisfies RouteConfig;
