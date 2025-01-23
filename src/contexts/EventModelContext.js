import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useState, useContext, } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import JoinedEventConfimation from "../components/JoinedEventConfimation";
import CancelAttendance from "../components/CancelAttendance";
const EventModalContext = createContext(undefined);
export const useEventModal = () => {
    const context = useContext(EventModalContext);
    if (!context) {
        throw new Error("useEventModal must be used within an EventModalProvider");
    }
    return context;
};
export const EventModalProvider = ({ children, }) => {
    const [modalContent, setModalContent] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const openEventModal = (event, action) => {
        let content;
        switch (action) {
            case "join":
                content = _jsx(JoinedEventConfimation, { event: event });
                break;
            case "tickets":
                content = _jsx(JoinedEventConfimation, { event: event });
                break;
            case "cancel":
                content = _jsx(CancelAttendance, { event: event });
                break;
            default:
                content = null;
        }
        setModalContent(content);
        setIsVisible(true);
    };
    const closeEventModal = () => {
        setModalContent(null);
        setIsVisible(false);
    };
    return (_jsxs(EventModalContext.Provider, { value: { openEventModal, closeEventModal, isVisible }, children: [children, isVisible && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center", children: _jsxs("div", { className: "relative w-4/5 lg:w-2/3 h-4/5 bg-white rounded-lg p-5 mobile:mt-16 tablet:mt-24", children: [modalContent, _jsx("button", { className: "absolute top-3 right-3 text-transparent bg-none text-2xl cursor-pointer", onClick: closeEventModal, children: _jsx(IoIosCloseCircle, { className: "text-primary tablet:text-[36px] " }) })] }) }))] }));
};
