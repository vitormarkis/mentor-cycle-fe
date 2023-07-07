import { Form } from "SIGNUP_SRC/components/Form";
import { IFormButton } from "SIGNUP_SRC/components/FormButton/component";
import React from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonSecondaryProps extends IFormButton {
  text?: string;
}

export function ButtonSecondary(props: ButtonSecondaryProps) {
  return (
    <Form.Button
      {...props}
      className={twMerge(
        "sm:order-none order-1 focus:outline-ring-strong bg-back-block border border-ring-strong hover:border-primary-01 transition-colors duration-100 hover:text-primary-02 text-fore-ground-base",
        "hover:border-ring-strong hover:text-fore-ground-base hover:bg-back-shadow",
        props.className
      )}
      tabIndex={props.tabIndex ?? 30}
    >
      {props.text ?? props.children ?? null}
    </Form.Button>
  );
}
// "sm:order-none order-1 focus:outline-gray-02 bg-neutral-05 border border-gray-02 hover:bg-secondary-01 transition-colors duration-100",
