import type { ReactNode } from "react";

import { getWorker } from "~/api/workers.server";

import type { Route } from "./+types/worker";

export function loader({ params }: Route.LoaderArgs) {
  return getWorker(parseInt(params.workerId));
}

export default function Worker({
  loaderData: worker,
}: Route.ComponentProps): ReactNode {
  return <p>{worker.name}</p>;
}
