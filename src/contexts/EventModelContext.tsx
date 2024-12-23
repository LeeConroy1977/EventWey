import React, { createContext, useState, useContext, ReactNode } from "react";
import { IoIosCloseCircle } from "react-icons/io";

import JoinedEventConfimation from "../components/JoinedEventConfimation";
import GetTickets from "../components/GetTickets";
import CancelAttendance from "../components/CancelAttendance";

interface EventModalContextProps {
  openEventModal: (event: any, action: "join" | "tickets" | "cancel") => void;
  closeEventModal: () => void;
}

const EventModalContext = createContext<EventModalContextProps | undefined>(
  undefined
);

export const useEventModal = (): EventModalContextProps => {
  const context = useContext(EventModalContext);
  if (!context) {
    throw new Error("useEventModal must be used within an EventModalProvider");
  }
  return context;
};

export const EventModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [isVisible, setIsVisible] = useState(false);

  const openEventModal = (
    event: any,
    action: "join" | "tickets" | "cancel"
  ) => {
    let content;
    switch (action) {
      case "join":
        content = <JoinedEventConfimation event={event} />;
        break;
      case "tickets":
        content = <JoinedEventConfimation event={event} />;
        break;
      case "cancel":
        content = <CancelAttendance event={event} />;
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

  return (
    <EventModalContext.Provider value={{ openEventModal, closeEventModal }}>
      {children}
      {isVisible && (
        <div style={overlayStyles}>
          <div style={modalStyles}>
            {modalContent}
            <button style={closeButtonStyles} onClick={closeEventModal}>
              <IoIosCloseCircle className="text-primary text-[36px] m-4" />
            </button>
          </div>
        </div>
      )}
    </EventModalContext.Provider>
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
  padding: "20px",
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
