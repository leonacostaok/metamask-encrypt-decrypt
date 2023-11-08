import styled from "styled-components";
import {Text} from "./Text";

export const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrapper>
                <Text>
                    This project was built by a developer to contribute to the amazing web3 community with no direct affiliation with https://metamask.io/. If you found this helpful in any way, feel free to share the ❤️.
                </Text>
                <Text>
                    ETH: 0xFd072083887bFcF8aEb8F37991c11c7743113374
                </Text>
            </FooterWrapper>
        </FooterContainer>
    )
}

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 800px;
  position: absolute;
  bottom: 0;
`