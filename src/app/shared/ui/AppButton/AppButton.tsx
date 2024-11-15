import { ButtonHTMLAttributes, ReactNode } from "react";
import s from "./AppButton.module.css";


interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
};

export const AppButton = ({ children }: AppButtonProps) => {
  return (
    <button className={s.appButton}>
      {children}
    </button>
  );
};