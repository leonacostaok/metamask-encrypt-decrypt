import { AnimatePresence, motion } from 'framer-motion'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import React, { useRef } from 'react'
import styled from 'styled-components'

export interface ModalProps {
  onDismiss: () => void
  isOpen: boolean
}
interface PropsTypeModal extends ModalProps{
  children: React.ReactNode
  name: string
}

const Modal = ({ onDismiss, children, name, isOpen = false }: PropsTypeModal) => {
  const refModal = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(refModal, onDismiss)
  return (
    <AnimatePresence>
      <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 13,
            height: "100vh"
          }}
          initial={{
            opacity: 0,
            scale: 0.75,
          }}
          variants={variants}
          animate={isOpen ? "enter" : "exit"}
          key={`modal-${name}`}
      >
        <ModalWrapper>
          <ModalContent ref={refModal}>{children}</ModalContent>
        </ModalWrapper>
      </motion.div>
    </AnimatePresence>
  )
}
export default Modal
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(14px);
  background-color: rgba(0, 0, 0, 0.2);
`
const ModalContent = styled.div`
  background-color: white;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 10px;
`
const variants = {
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: "easeIn",
      duration: 0.25
    },
    display: "block"
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      ease: "easeOut",
      duration: 0.25
    },
    transitionEnd: {
      display: "none"
    }
  }
}
