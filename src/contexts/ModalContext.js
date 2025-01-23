import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useState, useContext } from "react";
import { IoIosCloseCircle } from "react-icons/io";
const ModalContext = createContext(undefined);
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
export const ModalProvider = ({ children, }) => {
    const [modalContent, setModalContent] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const showModal = (content) => {
        setModalContent(content);
        setIsVisible(true);
    };
    const hideModal = () => {
        setModalContent(null);
        setIsVisible(false);
    };
    return (_jsxs(ModalContext.Provider, { value: { showModal, hideModal }, children: [children, isVisible && (_jsx("div", { style: overlayStyles, children: _jsxs("div", { style: modalStyles, children: [modalContent, _jsx("button", { style: closeButtonStyles, onClick: hideModal, children: _jsx(IoIosCloseCircle, { className: "text-primary text-[36px] m-4" }) })] }) }))] }));
};
const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};
const modalStyles = {
    width: "66%",
    height: "80%",
    background: "white",
    padding: "50px",
    borderRadius: "8px",
    position: "relative",
    overflowY: "auto",
};
const closeButtonStyles = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
};
