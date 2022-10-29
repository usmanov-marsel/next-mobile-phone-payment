import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { IMobileOperator } from "../../interfaces/operator.interface";
import Link from "next/link";
//import styles from "./MobileOperator.module.css";
import styled, { AnyStyledComponent, keyframes } from "styled-components";

interface MobileOperatorProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  operator: IMobileOperator;
  index: number;
}

// export const MobileOperator = ({ operator }: MobileOperatorProps) => {
//   return (
//     <Link href={`operators/${operator.route}`}>
//       <li className={styles.wrapper}>
//         <span className={styles.icon}>{operator.icon}</span>
//         <div>{operator.title}</div>
//       </li>
//     </Link>
//   );
// };

const appear = keyframes`
  from {
    opacity: 0;
    top: 100vh;
  }
  to {
    opacity: 1;
    top: 0;
  }
`;

interface StyledWrapperProps {
  index: number;
}

const StyledWrapper = styled.li<StyledWrapperProps>`
  opacity: 1;
  display: grid;
  position: relative;
  grid-template-rows: 1fr auto;
  min-width: 270px;
  text-align: center;
  justify-content: center;
  background: #f9f9f9;
  border: 1px solid #d9d9d9;
  border-radius: 16px;
  padding: 10px;
  animation-name: ${appear};
  animation-duration: ${(props) => props.index * 0.5 + 1 + "s"};
  &:hover {
    background: #eeeeee;
  }
`;

const Icon = styled.span`
  svg {
    width: 50px;
    height: 50px;
  }
`;

export const MobileOperator = ({ operator, index }: MobileOperatorProps) => {
  return (
    <Link href={`operators/${operator.route}`}>
      <StyledWrapper index={index}>
        <Icon>{operator.icon}</Icon>
        <div>{operator.title}</div>
      </StyledWrapper>
    </Link>
  );
};
