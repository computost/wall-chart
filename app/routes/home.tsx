import { Combobox, ComboboxButton, ComboboxInput } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

import "./home.css";

export default function Home() {
  return (
    <div className="topography h-full min-h-dvh bg-white p-4 dark:bg-black">
      <div className="mx-auto h-[812px] w-[375px] rounded-lg bg-stone-50 p-3 shadow-lg shadow-gray-950 dark:bg-stone-950 dark:shadow-gray-50">
        <Combobox>
          <div className="flex gap-2 rounded-md bg-stone-100 p-1 dark:bg-stone-900">
            <ComboboxButton>
              <MagnifyingGlassIcon className="size-4" />
            </ComboboxButton>
            <ComboboxInput className="grow focus:outline-0" />
          </div>
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
