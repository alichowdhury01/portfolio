import React from "react";

import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";

export const Paragraph = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={twMerge(
        "text-sm font-normal text-neutral-500 dark:text-neutral-400 leading-7",
        className
      )}
    >
      {children}
    </p>
  );
};
