import type { ReactNode } from "react";

import { Button } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router";

import { getWorker } from "~/api/workers.server";
import { Screen } from "~/components/screen";

import type { Route } from "./+types/worker";

export function loader({ params }: Route.LoaderArgs) {
  return getWorker(parseInt(params.workerId));
}

export default function Worker({
  loaderData: worker,
}: Route.ComponentProps): ReactNode {
  const navigate = useNavigate();

  return (
    <Screen>
      <div className="flex gap-2 p-1">
        <Button className="cursor-pointer" onClick={() => navigate("/")}>
          <XMarkIcon className="size-4" />
        </Button>
        <h1>{worker.name}</h1>
      </div>
    </Screen>
  );
}
