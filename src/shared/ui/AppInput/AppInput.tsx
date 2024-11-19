import { InputHTMLAttributes } from "react";
import s from "./AppInput.module.css";
import cn from "classnames";
interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
};

export const AppInput = ({ className, ...otherProps }: AppInputProps) => {
  return (
    <input
      {...otherProps}
      className={
        cn(
          s.appInput, className && className
        )}
    />

  );
};