import "./styles.css";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  dummy?: string;
}

export const Input = ({ className, ...rest }: Props) => {
  return (
    <input
      className={`input ${className ?? ""}`}
      {...rest}
    />
  );
};
