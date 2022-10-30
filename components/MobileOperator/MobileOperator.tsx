import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { IMobileOperator } from "../../interfaces/operator.interface";
import Link from "next/link";
import { StyledIcon, StyledTitle, StyledWrapper } from "./StyledMobileOperator";

interface MobileOperatorProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  operator: IMobileOperator;
  index: number;
}

export const MobileOperator = ({ operator, index }: MobileOperatorProps) => {
  return (
    <Link href={`operators/${operator.route}`}>
      <StyledWrapper index={index}>
        <StyledIcon dangerouslySetInnerHTML={{ __html: operator.icon }} />
        <StyledTitle>{operator.title}</StyledTitle>
      </StyledWrapper>
    </Link>
  );
};
