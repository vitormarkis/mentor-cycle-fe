import React from "react";
import Select from "react-select";
import { createReactSelectInterface } from "SIGNUP_SRC/helpers/createReactSelectInterface";
import {
  IFormSelect,
  OnChangeHandler,
} from "SIGNUP_SRC/steps/components/FormSelect/types";
import { FieldPath } from "react-hook-form";
import { IFormValues } from "SIGNUP_SRC/types";
import { twMerge } from "tailwind-merge";
import { stSignInput } from "styles/input-sign";
import st from "./styles.module.css";

export function FormSelect<T extends FieldPath<IFormValues>>(props: IFormSelect<T>) {
  const fieldValue = props.field.value as string;
  const hasValidValue = fieldValue.length;

  const handleOnChange: OnChangeHandler = (newValue) => {
    props.field.onChange(newValue?.value ?? "");
  };

  const defaultValue =
    typeof props.defaultValue === "string"
      ? createReactSelectInterface(props.defaultValue)
      : props.defaultValue;
  const selectValue = createReactSelectInterface(fieldValue);

  // falsy ativa o placeholder, string vazia não é falsy
  const value = hasValidValue ? selectValue : null;

  return (
    <Select
      id={props.id}
      options={props.options ?? []}
      isLoading={props.isLoading}
      autoFocus
      unstyled
      tabIndex={props.tabIndex}
      noOptionsMessage={() => props.noOptionsMessage}
      isDisabled={props.disabled}
      placeholder={props.placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={handleOnChange}
      onBlur={props.field.onBlur}
      styles={{
        control: (base) => ({
          ...base,
          minHeight: "unset",
          cursor: "pointer",
        }),
        menu: (base) => {
          return {
            ...base,
            left: "-1px",
            right: "-1px",
            transform: "translateY(-0.5rem)",
            borderRadius: "0 0 0.5rem 0.5rem",
            borderTop: "none",
            width: "unset",
          };
        },
        menuList: (base) => ({
          ...base,
          maxHeight: "18rem",
        }),
      }}
      classNames={{
        container: ({ isDisabled }) =>
          twMerge(
            stSignInput,
            `focus-within:outline-1 focus-within:outline-gray-03 focus-within:outline-offset-2`,
            isDisabled ? st.isDisabled : "",
            st.container
          ),
        menu: () => twMerge(stSignInput, st.menu),
        option: () =>
          twMerge(
            "py-2 px-4 hover:bg-primary-01 rounded-lg hover:cursor-pointer hover:text-neutral-03"
          ),
        placeholder: () => "text-gray-03",
      }}
    />
  );
}
