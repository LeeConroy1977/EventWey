import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import Button from "../reuseable-components/Button";
import { useState, useEffect, useCallback } from "react";
import EventConfimation from "./EventConfimation";
import { ClipLoader } from "react-spinners";
import { useScreenWidth } from "../contexts/ScreenWidthContext";
import { useEventModal } from "../contexts/EventModelContext";
import { useEvent } from "../contexts/EventContext";
import TicketTypeCard from "./TicketTypeCard";
import TicketPayment from "./TicketPayment";

const JoinedPaidEventConfirmation = () => {
  const { isMobile } = useScreenWidth();
  const { closeEventModal } = useEventModal();
  const { event } = useEvent();
  const [uiState, setUiState] = useState("selecting");
  const [ticketType, setTicketType] = useState("");

  useEffect(() => {
    console.log("uiState changed:", uiState, "ticketType:", ticketType);
  }, [uiState, ticketType]);

  const handlePaymentSuccess = useCallback(() => {
    setUiState("completed");
  }, []);

  const getPriceRange = (priceBands, free) => {
    if (!Array.isArray(priceBands)) return "Unknown price";
    const availablePriceBands = priceBands.filter(
      (band) => band.price && band.ticketCount > 0
    );
    if (free) return "Free";
    if (availablePriceBands.length === 0) return "Unknown price";
    const sortedPriceBands = availablePriceBands.sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
    if (sortedPriceBands.length === 1) return `${sortedPriceBands[0].price}`;
    return `${sortedPriceBands[0].price} - ${
      sortedPriceBands[sortedPriceBands.length - 1].price
    }`;
  };

  const handleTicketType = (type) => {
    setTicketType((prev) => (prev === type ? "" : type));
  };

  const handleCheckout = () => {
    if (ticketType) {
      setUiState("checkout");
    }
  };

  if (!event) {
    console.log("No event, closing modal");
    closeEventModal();
    return null;
  }

  const eventPrices = getPriceRange(event?.priceBands, event?.free);

  return (
    <div className="flex flex-col items-center w-full h-full bg-white rounded-lg">
      <main className="w-full flex">
        {!isMobile && (
          <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden">
            <div className="w-[80%] h-[100%] flex flex-col items-center justify-start">
              <img
                className="w-[100%] tablet:h-[36%] desktop:h-[40%] rounded-lg mt-6"
                src={event?.image || "placeholder-image.jpg"}
                alt={event?.title}
              />
              <h1 className="text-gray-800 tablet:text-[20px] desktop:text-[26px] xl-screen:text-[30px] font-bold mt-4 mr-auto ml-2">
                {event?.title}
              </h1>
              <p className="text-gray-800 font-bold tablet:text-[14px] desktop:text-[18px] xl-screen:text-[22px] mr-auto ml-2 mt-4">
                Hosted by:{" "}
                <span className="text-blue-500">
                  {event?.group?.name || "Unknown Group"}
                </span>
              </p>
              <p className="font-bold text-gray-800 mt-4 tablet:text-[11px] desktop:text-[14px] xl-screen:text-[16px] mr-auto ml-2 pr-3">
                {event?.description?.[0] || ""}
              </p>
              <p className="font-medium text-gray-800 mt-4 tablet:text-[11px] desktop:text-[13px] xl-screen:text-[15px] mr-auto ml-2 pr-3">
                {event?.description?.[1] || ""}
              </p>
              <div className="flex items-center mr-auto mt-auto mb-12 pl-4">
                <div className="flex items-center">
                  <IoPerson className="text-red-400 tablet:text-[16px] desktop:text-[20px] xl-screen:text-[22px]" />
                  <p className="ml-2 tablet:text-[11px] desktop:text-[14px] xl-screen:text-[16px] font-semibold text-gray-700">
                    {event?.going || 0} going
                  </p>
                </div>
                <div className="flex items-center ml-4">
                  <IoMdPricetag className="text-teal-500 tablet:text-[17px] desktop:text-[21px] xl-screen:text-[23px]" />
                  <p className="ml-2 tablet:text-[11px] desktop:text-[14px] xl-screen:text-[16px] font-semibold text-gray-700">
                    {eventPrices}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
        <section className="mobile:w-full tablet:w-[50%] h-[100%] flex flex-col items-center rounded-lg mt-8">
          <h1 className="mobile:text-[28px] tablet:text-[28px] desktop:text-[36px] xl-screen:text-[42px] font-bold text-blue-600 mt-4">
            EventWey
          </h1>
          {uiState === "completed" ? (
            <EventConfimation event={event} />
          ) : uiState === "paying" ? (
            <div className="flex justify-center items-center w-full min-h-[200px] mt-8">
              <ClipLoader size={80} color="#5d9b9b" />
            </div>
          ) : uiState === "checkout" ? (
            <TicketPayment
              ticketType={ticketType}
              onPaymentSuccess={handlePaymentSuccess}
            />
          ) : (
            <>
              <h2 className="text-gray-800 text-[20px] font-semibold mt-6">
                Select a ticket
              </h2>
              <div className="w-full px-4 mt-4">
                {event.priceBands?.map((band) => (
                  <TicketTypeCard
                    handleClick={handleTicketType}
                    band={band}
                    key={band.type}
                    ticketType={ticketType}
                  />
                ))}
              </div>
              {ticketType && (
                <Button handleClick={handleCheckout} className="mt-6">
                  Checkout
                </Button>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default JoinedPaidEventConfirmation;
