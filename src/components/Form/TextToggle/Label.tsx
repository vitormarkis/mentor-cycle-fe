import { useTheme } from "next-themes";
import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps extends HTMLAttributes<HTMLParagraphElement> {
  text: string;
}

export function Label({ text, ...props }: LabelProps) {
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  return (
    <p
      {...props}
      className={twMerge(
        "pl-2 py-1.5 pr-6 text-xs leading-none rounded-l-full translate-x-4",
        props.className
      )}
      style={{
        color: "var(--fore-subtle)",
      }}
    >
      {text}
    </p>
  );
}