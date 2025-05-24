import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { MagnifyingGlassIcon as LargeMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { type ReactNode, useState } from "react";
import { useFetcher } from "react-router";

import type { Worker } from "~/api/workers.server";
import type { loader } from "~/routes/find-workers";

type SearchProps = {
  defaultValue?: Value;
  name: string;
};

type Value = Pick<Worker, "id" | "name">;

export function Lookup({ defaultValue, name }: SearchProps): ReactNode {
  const [value, setValue] = useState<null | Value>(defaultValue ?? null);
  const fetcher = useFetcher<typeof loader>();
  const [query, setQuery] = useState(defaultValue?.name ?? "");

  return (
    <Combobox
      onChange={(value) => {
        setValue(value);

        if (value === null) {
          setQuery("");
        } else {
          setQuery(value.name);
        }
      }}
      value={value}
    >
      <input name={name} type="hidden" value={value?.id ?? ""} />
      <div className="mt-2 flex gap-2 rounded-lg bg-stone-100 p-1 py-1.5 dark:bg-stone-900">
        <ComboboxButton>
          <LargeMagnifyingGlassIcon className="size-6" />
        </ComboboxButton>
        <ComboboxInput
          className="grow focus:outline-0"
          onBlur={() => setQuery(value?.name ?? "")}
          onChange={(event) => {
            setQuery(event.target.value);
            const formData = new FormData();
            formData.set("q", event.target.value);
            fetcher.submit(formData, {
              action: "/find-workers",
              method: "get",
            });
          }}
          onFocus={() => {
            if (!fetcher.data) {
              const formData = new FormData();
              formData.set("q", query);
              fetcher.submit(formData, {
                action: "/find-workers",
                method: "get",
              });
            }
          }}
          value={query}
        />
      </div>

      <ComboboxOptions
        anchor="bottom"
        className="ml-[-1rem] w-[calc(var(--button-width)+var(--input-width)+1rem)] rounded-b-md bg-stone-100 pt-1 transition duration-100 ease-in data-leave:data-closed:opacity-0 dark:bg-stone-900"
        transition
      >
        {fetcher.data &&
          fetcher.data.map((worker) => (
            <ComboboxOption
              className="py-2 pl-[calc(var(--button-width)+0.75rem)] data-focus:bg-stone-200 dark:data-focus:bg-stone-800"
              key={worker.id}
              value={worker}
            >
              {worker.name}
            </ComboboxOption>
          ))}
      </ComboboxOptions>
    </Combobox>
  );
}
