import React, { useEffect } from 'react'
import styled from 'styled-components'

import Modal from './Modal'
import WalletConnectV2Card from "./connectorCards/WalletConnectV2Card";
import MetaMaskCard from "./connectorCards/MetaMaskCard";
import {ModalProps} from "./Modal";
import useModalConnect from "hooks/useModalConnect";
const ModalConnect = ({ onDismiss, isOpen }: ModalProps) => {
  const { showModalConnect, setShowModalConnect } = useModalConnect()
  useEffect(() => {
    if (!showModalConnect) {
      onDismiss()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModalConnect])
  return (
    <Modal onDismiss={onDismiss} name={'modal-connect'} isOpen={isOpen}>
      <ModalContent>
        <ModalTitle>
          <Title>Connect your wallet</Title>
        </ModalTitle>
        <ModalBody>
          <GroupCta>
            <MetaMaskCard />
            <WalletConnectV2Card />
          </GroupCta>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default ModalConnect
const ModalContent = styled.div`
  padding: 20px;
`
const ModalTitle = styled.div`
  margin-bottom: 20px;
    text-align: center;
`
const ModalBody = styled.div``

const GroupCta = styled.div`
  gap: 12px;
  width: 50%;
  @media only screen and (max-width: 1024px) {
    max-width: 420px;
    width: 100%;
  }
`

const Title = styled.h1``
