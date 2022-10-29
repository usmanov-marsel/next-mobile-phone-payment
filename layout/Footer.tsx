import { DetailedHTMLProps, HTMLAttributes } from "react";

interface FooterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Footer = ({ ...props }: FooterProps) => {
  return <footer {...props}></footer>;
};
