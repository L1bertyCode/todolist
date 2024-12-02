import { InputHTMLAttributes } from "react";
import s from "./AppInput.module.css";
import cn from "classnames";
interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
};

export const AppInput = ({ className, type = "text", ...otherProps }: AppInputProps) => {
  return (
    <input
      {...otherProps}
      type={type}
      className={
        cn(
          s.appInput, className && className
        )}
    />

  );
};