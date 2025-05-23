import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useFetcher, useNavigate } from "react-router";

import "./home.css";
import type { loader } from "./find-workers";

export default function Home() {
  const fetcher = useFetcher<typeof loader>();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="topography h-full min-h-dvh bg-white p-4 dark:bg-black">
      <div className="mx-auto h-[812px] w-[375px] rounded-lg bg-stone-50 p-3 shadow-lg shadow-gray-950 dark:bg-stone-950 dark:shadow-gray-50">
        <Combobox
          onChange={(value) => {
            if (value === null) {
              setQuery("");
            } else {
              navigate(`/workers/${value}`);
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
      </div>
    </div>
  );
}

export function meta() {
  return [
    { title: "New React Router App" },
    { content: "Welcome to React Router!", name: "description" },
  ];
}
