import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: (label: string) => void;
};

export const Button = ({ onClick, ...rest }: Props) => {
  const label = "This is a button";

  return <button onClick={() => onClick(label)} {...rest} />;
};
