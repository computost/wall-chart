import type { ReactNode } from "react";

import { Field, Input, Label } from "@headlessui/react";
import { Form } from "react-router";

import { getWorker } from "~/api/workers.server";
import { Screen } from "~/components/screen";
import { Search } from "~/components/search";

import type { Route } from "./+types/worker";

export function loader({ params }: Route.LoaderArgs) {
  return getWorker(parseInt(params.workerId));
}

export default function Worker({
  loaderData: worker,
}: Route.ComponentProps): ReactNode {
  return (
    <Screen>
      <Search />
      <div className="flex h-full flex-col justify-center">
        <Form>
          <Field className="w-full">
            <Label className="font-medium">Name</Label>
            <Input
              className="mt-2 block w-full rounded-lg bg-stone-100 px-3 py-1.5 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-stone-500 dark:bg-stone-900"
              defaultValue={worker.name}
              name="name"
            />
          </Field>
        </Form>
      </div>
    </Screen>
  );
}
