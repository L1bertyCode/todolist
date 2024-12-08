import { ButtonHTMLAttributes, ReactNode } from "react"
import s from "./AppButton.module.css"
import cn from "classnames"

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export const AppButton = ({ children, className, ...otherProps }: AppButtonProps) => {
  return (
    <button {...otherProps} className={cn(s.appButton, className)}>
      {children}
    </button>
  )
}
