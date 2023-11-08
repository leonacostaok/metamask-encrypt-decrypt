import { ReactNode } from "react";
import styled from "styled-components";
import {TabOptions} from "../pages";

export function Tab({
  isActive,
  children,
}: {
  isActive: boolean;
  setActiveTab?: (el: TabOptions) => void
  children?: ReactNode;
}) {
  return isActive ? <TabWrapper>{children}</TabWrapper> : <></>;
}

const TabWrapper = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.07);
  flex-direction: column;
  padding: 5vh 5vw;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  gap: 10px;

  p {
    text-align: center;
    max-width: 500px;
  }
`;
