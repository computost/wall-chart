import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { type ReactNode, useState } from "react";
import { useFetcher, useLocation, useNavigate } from "react-router";

import type { loader } from "~/routes/find-workers";

export function Search(): ReactNode {
  const fetcher = useFetcher<typeof loader>();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Combobox
      onChange={(value) => {
        setQuery("");
        const workerPath = `/workers/${value}`;
        if (value !== null && location.pathname !== workerPath) {
          navigate(workerPath);
        }
      }}
    >
      <fetcher.Form
        action="/find-workers"
        className="flex gap-2 rounded-md bg-stone-100 p-1 dark:bg-stone-900"
        method="get"
      >
        <ComboboxButton>
          <MagnifyingGlassIcon className="size-4" />
        </ComboboxButton>
        <ComboboxInput
          className="grow focus:outline-0"
          name="q"
          onBlur={() => setQuery("")}
          onChange={(event) => {
            setQuery(event.target.value);
            fetcher.submit(event.currentTarget.form);
          }}
          onFocus={(event) =>
            !fetcher.data && fetcher.submit(event.currentTarget.form)
          }
          value={query}
        />
      </fetcher.Form>

      <ComboboxOptions
        anchor="bottom"
        className="ml-[-0.75rem] w-[calc(var(--button-width)+var(--input-width)+1rem)] rounded-b-md bg-stone-100 pt-1 transition duration-100 ease-in data-leave:data-closed:opacity-0 dark:bg-stone-900"
        transition
      >
        {fetcher.data &&
          fetcher.data.map((worker) => (
            <ComboboxOption
              className="py-2 pl-[calc(var(--button-width)+0.75rem)] data-focus:bg-stone-200 dark:data-focus:bg-stone-800"
              key={worker.id}
              value={worker.id}
            >
              {worker.name}
            </ComboboxOption>
          ))}
      </ComboboxOptions>
    </Combobox>
  );
}
