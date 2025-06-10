import React, { createContext, useState, useContext, ReactNode } from "react";
import { IoIosCloseCircle } from "react-icons/io";

interface ModalContextProps {
  showModal: (content: ReactNode) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showModal = (content: ReactNode) => {
    setModalContent(content);
    setIsVisible(true);
  };

  const hideModal = () => {
    setModalContent(null);
    setIsVisible(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {isVisible && modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
          <div className="w-2/3 h-4/5 bg-white p-12 rounded-lg relative overflow-y-auto">
            {modalContent}
            <button
              className="absolute top-2 right-2 bg-transparent border-none cursor-pointer"
              onClick={hideModal}
              aria-label="Close modal">
              <IoIosCloseCircle className="text-primary text-4xl m-4" />
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
