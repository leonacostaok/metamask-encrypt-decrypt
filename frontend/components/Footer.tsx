import styled from "styled-components";
import {BoldText, Text} from "./Text";

export const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrapper>
                <Text>
                    This project was built by developers to contribute to the amazing web3 community with no direct affiliation with https://metamask.io/. If you found this helpful in any way, feel free to share the ❤️.
                </Text>
                <br />
                <BoldText>
                    ETH: 0xFd072083887bFcF8aEb8F37991c11c7743113374
                </BoldText>
            </FooterWrapper>
        </FooterContainer>
    )
}

const FooterContainer = styled.div`
  height: 150px;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 575px){
    position: relative;
    bottom: unset;
  }
`

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  padding-bottom: 20px;
`
