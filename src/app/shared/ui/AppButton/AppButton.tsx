import { ButtonHTMLAttributes, ReactNode } from "react";
import s from "./AppButton.module.css";


interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
};

export const AppButton = ({ children, ...otherProps }: AppButtonProps) => {
  return (
    <button
      {...otherProps} className={s.appButton}>
      {children}
    </button>
  );
};