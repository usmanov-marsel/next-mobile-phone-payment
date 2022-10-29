import { DetailedHTMLProps, HTMLAttributes } from "react";

interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Header = ({ ...props }: HeaderProps) => {
  return (
    <header {...props}>
      <div>Оплата мобильного телефона</div>
    </header>
  );
};
