import { Combobox, ComboboxButton, ComboboxInput } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <div className="mx-auto mt-4 h-[812px] w-[375px] rounded-lg bg-stone-950 p-3 shadow shadow-gray-50">
      <Combobox>
        <div className="flex gap-2 rounded-md bg-green-950 p-1">
          <ComboboxButton>
            <MagnifyingGlassIcon className="h-4 w-4" />
          </ComboboxButton>
          <ComboboxInput className="grow focus:outline-0" />
        </div>
      </Combobox>
    </div>
  );
}

export function meta() {
  return [
    { title: "New React Router App" },
    { content: "Welcome to React Router!", name: "description" },
  ];
}
