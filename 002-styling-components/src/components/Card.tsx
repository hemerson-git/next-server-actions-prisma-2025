import { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = (props: CardProps) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "#333",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
      {...props}
    />
  );
};
