import { HTMLAttributes } from "react";
import "./styles.css";

type ButtonProps = HTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  return <button className="button button-primary" {...props} />;
};
