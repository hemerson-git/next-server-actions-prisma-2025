import { HTMLAttributes } from "react";
import { container } from "./styles";

type TitleProps = HTMLAttributes<HTMLHeadingElement>;

export const Title = (props: TitleProps) => {
  return <h2 style={container} {...props} />;
};
