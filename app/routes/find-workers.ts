import { findWorkers } from "~/api/workers.server";

import type { Route } from "./+types/find-workers";

export function loader({ request }: Route.LoaderArgs) {
  const query = new URL(request.url).searchParams.get("q") ?? "";

  return findWorkers(query);
}
