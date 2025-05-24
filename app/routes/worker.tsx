import type { ReactNode } from "react";

import { getWorker } from "~/api/workers.server";
import { Screen } from "~/components/screen";
import { Search } from "~/components/search";

import type { Route } from "./+types/worker";

export function loader({ params }: Route.LoaderArgs) {
  return getWorker(parseInt(params.workerId));
}

export default function Worker(): ReactNode {
  return (
    <Screen>
      <Search />
    </Screen>
  );
}
