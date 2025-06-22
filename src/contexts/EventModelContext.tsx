import { createContext, useState, useContext, ReactNode, FC } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import CancelFreeEvent from "../components/CancelFreeEvent";
import CancelPaidEvent from "../components/CancelPaidEvent";
import JoinedFreeEventConfimation from "../components/JoinedFreeEventConfimation";
import JoinedPaidEventConfirmation from "../components/joinedPaidEventConfirmation";

interface EventModalContextProps {
  openEventModal: (
    event: unknown,
    action: "join" | "tickets" | "cancelFreeEvent" | "cancelPaidEvent"
  ) => void;
  closeEventModal: () => void;
  isVisible: boolean;
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

export const EventModalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [isVisible, setIsVisible] = useState(false);

  const openEventModal = (
    event: unknown,
    action: "join" | "tickets" | "cancelFreeEvent" | "cancelPaidEvent"
  ) => {
    let content: ReactNode;
    switch (action) {
      case "join":
        // @ts-ignore
        content = <JoinedFreeEventConfimation event={event} />;
        break;
      case "tickets":
        // @ts-ignore
        content = <JoinedPaidEventConfirmation event={event} />;
        break;
      case "cancelFreeEvent":
        // @ts-ignore
        content = <CancelFreeEvent event={event} />;
        break;
      case "cancelPaidEvent":
        // @ts-ignore
        content = <CancelPaidEvent event={event} />;
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
    <EventModalContext.Provider
      value={{ openEventModal, closeEventModal, isVisible }}>
      {children}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative w-4/5 lg:w-2/3 h-4/5 bg-white rounded-lg p-5 mobile:mt-16 tablet:mt-24">
            {modalContent}
            <button
              className="absolute top-3 right-3 text-transparent bg-none text-2xl cursor-pointer"
              onClick={closeEventModal}>
              <IoIosCloseCircle className="text-primary tablet:text-[36px] " />
            </button>
          </div>
        </div>
      )}
    </EventModalContext.Provider>
  );
};
