import { Field, Input, Label, Select } from "@headlessui/react";
import { type ReactNode, useEffect, useState } from "react";
import { Form } from "react-router";

import { type Assessment, getWorker } from "~/api/workers.server";
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
  return {
    assessment: worker.assessment,
    id: worker.id,
    manager,
    name: worker.name,
  };
}

export default function Worker({
  loaderData: worker,
}: Route.ComponentProps): ReactNode {
  const [manager, setManager] = useState(worker?.manager ?? null);
  const [assessment, setAssessment] = useState(worker?.assessment);

  useEffect(() => {
    setManager(worker?.manager ?? null);
    setAssessment(worker?.assessment);
  }, [worker]);

  if (!worker) {
    return null;
  }

  return (
    <Screen
      className={
        assessment &&
        {
          [1]: "bg-green-50! dark:bg-green-950!",
          [2]: "bg-lime-50! dark:bg-lime-950!",
          [3]: "bg-yellow-50! dark:bg-yellow-950!",
          [4]: "bg-orange-50! dark:bg-orange-950!",
          [5]: "bg-red-50! dark:bg-red-950!",
        }[assessment]
      }
    >
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
        <Field className="w-full">
          <Label className="font-medium">Assessment</Label>
          <Select
            className={[
              "mt-2 block w-full rounded-lg px-3 py-1.5 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-stone-500",
              {
                [1]: "bg-green-400 dark:bg-green-700",
                [2]: "bg-lime-400 dark:bg-lime-700",
                [3]: "bg-yellow-400 dark:bg-yellow-700",
                [4]: "bg-orange-400 dark:bg-orange-700",
                [5]: "bg-red-400 dark:bg-red-700",
                ["undefined"]: "bg-stone-100 dark:bg-stone-900",
              }[assessment ?? "undefined"],
            ].join(" ")}
            name="assessment"
            onChange={(event) =>
              setAssessment(
                event.target.value.length === 0
                  ? undefined
                  : (parseInt(event.target.value) as Assessment),
              )
            }
            value={assessment}
          >
            <option selected={assessment === undefined} value={undefined} />
            <option selected={assessment === 1} value={1}>
              1 - Acting for
            </option>
            <option selected={assessment === 2} value={2}>
              2 - Vocally for
            </option>
            <option selected={assessment === 3} value={3}>
              3 - Undecided
            </option>
            <option selected={assessment === 4} value={4}>
              4 - Vocally against
            </option>
            <option selected={assessment === 5} value={5}>
              5 - Acting against
            </option>
          </Select>
        </Field>
      </Form>
    </Screen>
  );
}
