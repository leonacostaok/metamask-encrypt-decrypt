import { useContext } from 'react'
import {ModalConnectContext} from "../providers/ModalConnectProvider";

const useModalConnect = () => {
  return useContext(ModalConnectContext)
}
export default useModalConnect
