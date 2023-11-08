import { ReactNode } from "react";
import styled from "styled-components";

export function Tab({
  isActive,
  children,
}: {
  isActive: boolean;
  children?: ReactNode;
}) {
  return isActive ? <TabWrapper>{children}</TabWrapper> : <></>;
}

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5vh 5vw;
  justify-content: center;
  align-items: center;
  gap: 20px;
  p {
    text-align: center;
    max-width: 500px;
  }
`;
