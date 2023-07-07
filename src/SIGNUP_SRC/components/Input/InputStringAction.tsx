import React, { ElementType, InputHTMLAttributes, useId } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Input } from "SIGNUP_SRC/components/Input";
import { twMerge } from "tailwind-merge";
import { stSignInput } from "styles/input-sign";

export type IconsProps = [active: ElementType, disabled?: ElementType];

interface InputStringActionProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  asChild?: boolean;
  grow?: number;
  required?: boolean;
  icons: IconsProps;
  onAction: () => void;
  active: boolean;
}

export const InputStringAction = React.forwardRef<
  HTMLInputElement,
  InputStringActionProps
>(function InputStringActionComponent(
  {
    active,
    icons,
    asChild,
    onAction,
    grow = 1,
    type = "text",
    required,
    errorMessage,
    label,
    children,
    tabIndex = 20,
    ...rest
  },
  ref
) {
  const inputId = useId();
  const Component = asChild ? Slot : "input";
  const [ActiveIconRaw, DisabledIconRaw] = icons;

  const ActionIcon = active ? ActiveIconRaw : DisabledIconRaw ?? ActiveIconRaw;

  return (
    <Input.Root grow={grow}>
      <Input.Label label={label} htmlFor={inputId} required={required} />
      <div
        className={twMerge(
          stSignInput,
          "focus-within:outline-1 focus-within:outline-gray-03 focus-within:outline-offset-2 flex items-center"
        )}
      >
        <Component
          {...rest}
          tabIndex={tabIndex}
          type={type}
          id={inputId}
          className={twMerge(
            "placeholder:text-fore-subtle outline-none grow min-w-0 text-fore-ground-base bg-transparent",
            rest.className
          )}
          ref={asChild ? null : ref}
        >
          {children}
        </Component>
        <div className="basis-6 h-6 rounded-lg hover:bg-back-shadow grid place-items-center cursor-pointer">
          <ActionIcon onClick={onAction} className="text-symbol w-5 h-5" />
        </div>
      </div>
      <Input.Error errorMessage={errorMessage} />
    </Input.Root>
  );
});
