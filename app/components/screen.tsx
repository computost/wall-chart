import type { PropsWithChildren, ReactNode } from "react";

import "./screen.css";

export function Screen({ children }: PropsWithChildren): ReactNode {
  return (
    <div className="topography h-full min-h-dvh bg-white p-4 dark:bg-black">
      <div className="mx-auto h-[812px] w-[375px] rounded-lg bg-stone-50 p-3 shadow-lg shadow-gray-950 dark:bg-stone-950 dark:shadow-gray-50">
        {children}
      </div>
    </div>
  );
}
