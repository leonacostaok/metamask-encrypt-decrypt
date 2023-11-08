import { Tab } from "./Tab";
import {Link, Text} from "./Text";
import {TabOptions} from "../pages";
import {styled} from "styled-components";
import Image from 'next/image'

export function HowTo({ isActive }: {
  setActiveTab?: (el: TabOptions) => void
  isActive: boolean
}) {

  return (
    <Tab isActive={isActive} requiresConnection={false}>
        <HowToWrapper>
            <Text>
                The project is open-source and can be found in{' '}
                <Link href="https://github.com/leonacostaok/metamask-encrypt-decrypt"
                      rel="noopener noreferrer"
                      target="_blank">
                    GitHub
                </Link>.
            </Text>
            <Text>
                It works with asymmetric cryptography to encrypt and decrypt messages.
            </Text>
            <Text>
              Encryption is a feature of asymmetric cryptography that allows us to share PRIVATE messages between known parties.
            </Text>
            <Text>
                Private messages, in this context, are messages no one else than the recipient should see.
            </Text>
            <Text>
                If I want to send a private message to a friend, and only for him to see that message, then I will encrypt it with his public key, and he will be able to decrypt it with his private key.
            </Text>
            <Text>
              The process goes as follows:
            </Text>
            <TextList>
                <Text>1. Purple shares her public key with Green.</Text>
                <Text>2. Green encrypts a message with Purple's public key.</Text>
                <Text>3. Green sends the encrypted message to Purple.</Text>
                <Text>4. Purple uses her private key to decrypt Green's message.</Text>
            </TextList>

            <PostImage src={'/assets/svg/asymmetric-cryptography.svg'}
                       alt={'Asymmetric cryptography explained graphically!'}
                       priority
                       width={450}
                       height={350}
            />

            <Text>
              This process is only used to share information that should not be public (it is masked behind an encryption), and no one but the person who has the message and then one that received the message can see it otherwise.
            </Text>

            <Text>
               This app does not have access to your private key, and will interact with your wallet provider for the decryption of the messages.
            </Text>
        </HowToWrapper>
    </Tab>
  );
}

const HowToWrapper = styled.div`
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

const TextList = styled.div`
  display: flex;
  flex-direction: column;
`

const PostImage = styled(Image)`
  margin: -30px 0;
`

