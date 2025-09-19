import { ButtonHTMLAttributes } from "react";
import "./styles.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const Button = ({ title, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={`btn ${className || ""}`}
      {...rest}>
      {title}
    </button>
  );
};
