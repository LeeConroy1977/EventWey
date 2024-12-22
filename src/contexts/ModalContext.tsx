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
  const [modalContent, setModalContent] = useState<ReactNode>(null);
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
      {isVisible && (
        <div style={overlayStyles}>
          <div style={modalStyles}>
            {modalContent}
            <button style={closeButtonStyles} onClick={hideModal}>
              <IoIosCloseCircle className="text-primary text-[36px] m-4" />
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

const overlayStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyles: React.CSSProperties = {
  width: "66%",
  height: "80%",
  background: "white",
  padding: "50px",
  borderRadius: "8px",
  position: "relative",
  marginTop: "6rem",
};

const closeButtonStyles: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "transparent",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
};
