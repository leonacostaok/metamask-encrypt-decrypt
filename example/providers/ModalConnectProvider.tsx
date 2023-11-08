import { useState } from "react";
import React from "react";
import { createContext } from "react";

interface IModalConnect {
  showModalConnect: boolean;
  setShowModalConnect: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: {
  showModalConnect: boolean;
  setShowModalConnect: React.Dispatch<React.SetStateAction<boolean>>;
} = {
  showModalConnect: false,
  setShowModalConnect: () => {},
};

export const ModalConnectContext = createContext<IModalConnect>(initialState);

const ModalConnectProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModalConnect, setShowModalConnect] = useState<boolean>(false);

  return (
    <ModalConnectContext.Provider
      value={{
        showModalConnect,
        setShowModalConnect,
      }}
    >
      {children}
    </ModalConnectContext.Provider>
  );
};
export default ModalConnectProvider;
