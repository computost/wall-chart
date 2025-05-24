import type { PropsWithChildren, ReactNode } from "react";

import "./screen.css";

export function Screen({
  children,
  className,
}: PropsWithChildren<{ className?: string }>): ReactNode {
  return (
    <div className="topography flex h-full min-h-dvh flex-col bg-white sm:p-4 dark:bg-black">
      <div
        className={[
          "flex h-full min-h-dvh w-full flex-col bg-stone-50 p-3 shadow-gray-950 sm:mx-auto sm:max-h-[812px] sm:min-h-0 sm:w-[375px] sm:grow sm:rounded-lg sm:shadow-lg dark:bg-stone-950 dark:shadow-gray-50",
          className,
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
