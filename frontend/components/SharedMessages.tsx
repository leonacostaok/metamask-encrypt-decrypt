import { Tab } from "./Tab";
import {TabOptions} from "../pages";
import {styled} from "styled-components";
import {Table} from "./Table";

export function SharedMessages({ isActive }: {
  setActiveTab?: (el: TabOptions) => void
  isActive: boolean
}) {

  return (
    <Tab isActive={isActive} requiresConnection={false}>
        <SharedWrapper>
            <Table data={[]}/>
        </SharedWrapper>
    </Tab>
  );
}

const SharedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  p {
    text-align: justify;
    width: 100%;
  }
`
