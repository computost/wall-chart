import { Field, Input, Label } from "@headlessui/react";
import { type ReactNode, useEffect, useState } from "react";
import { Form } from "react-router";

import { getWorker } from "~/api/workers.server";
import { Lookup } from "~/components/Lookup";
import { Screen } from "~/components/Screen";
import { Search } from "~/components/Search";

import type { Route } from "./+types/worker";

export function loader({ params }: Route.LoaderArgs) {
  const workerId = parseInt(params.workerId);

  if (isNaN(workerId)) {
    return;
  }

  const worker = getWorker(parseInt(params.workerId));
  const manager =
    worker.managerId === undefined ? null : getWorker(worker.managerId);
  return { id: worker.id, manager, name: worker.name };
}

export default function Worker({
  loaderData: worker,
}: Route.ComponentProps): ReactNode {
  const [manager, setManager] = useState(worker?.manager ?? null);
  useEffect(() => setManager(worker?.manager ?? null), [worker]);

  if (!worker) {
    return null;
  }

  return (
    <Screen>
      <Search />
      <Form className="flex h-full flex-col justify-center gap-6">
        <Field className="w-full">
          <Label className="font-medium">Name</Label>
          <Input
            className="mt-2 block w-full rounded-lg bg-stone-100 px-3 py-1.5 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-stone-500 dark:bg-stone-900"
            defaultValue={worker.name}
            name="name"
          />
        </Field>
        <Field className="w-full">
          <Label className="font-medium">Manager</Label>
          <Lookup name="managerId" onChange={setManager} value={manager} />
        </Field>
      </Form>
    </Screen>
  );
}
