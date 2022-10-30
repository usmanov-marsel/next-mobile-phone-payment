import styled, { keyframes } from "styled-components";

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

export const StyledWrapper = styled.li<StyledWrapperProps>`
  opacity: 1;
  display: grid;
  position: relative;
  grid-template-rows: 1fr auto;
  gap: 10px;
  min-width: 270px;
  text-align: center;
  justify-content: center;
  background: var(--background-operator);
  border: 1px solid var(--border-operator);
  border-radius: 16px;
  padding: 10px;
  animation-name: ${appear};
  animation-duration: ${(props) => props.index * 0.5 + 1 + "s"};
  box-shadow: 3px 2px 5px #a9a9a9;
  &:hover {
    background: var(--background-operator-hover);
  }
`;

export const StyledIcon = styled.span`
  svg {
    width: 50px;
    height: 50px;
  }
`;

export const StyledTitle = styled.div`
  font-size: 20px;
`;
