import React, { HTMLAttributes } from "react";
import { motion, AnimatePresence, MotionProps } from "framer-motion";
import { errorAnimation } from "@components/InputForm/Input.animations";
import { twMerge } from "tailwind-merge";

interface InputErrorMessageProps
  extends Pick<HTMLAttributes<HTMLParagraphElement>, "className">,
    MotionProps {
  errorMessage?: string;
  shouldAnimate?: boolean;
}

export function InputErrorMessage({
  style,
  errorMessage,
  shouldAnimate,
  ...rest
}: InputErrorMessageProps) {
  const _st = style ?? {};
  const animationProps = shouldAnimate ? errorAnimation() : {};

  return (
    <AnimatePresence initial={false}>
      {errorMessage && (
        <motion.p
          {...rest}
          {...animationProps}
          className={twMerge(
            "mt-2 relative text-sm text-primary-02 font-medium rounded-lg",
            rest.className,
            "dark:bg-error dark:border-none font-normal"
          )}
          style={{
            color: "var(--primary-02)", // primary-02
            // color: "#580505", // primary-05
            ..._st,
          }}
        >
          {errorMessage}
        </motion.p>
      )}
    </AnimatePresence>
  );
}