import { useEffect, useState } from "react";
import { useScreenWidth } from "../contexts/ScreenWidthContext";
import { useEventModal } from "../contexts/EventModelContext";
import { useUser } from "../contexts/UserContext";
import { useEvent } from "../contexts/EventContext";
import { fetchEventById } from "../../utils/api/events-api";
import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import Button from "../reuseable-components/Button";
import RefundConfirmation from "./RefundConfirmation";

const CancelPaidEvent = () => {
  const [uiState, setUiState] = useState<"idle" | "loading" | "left" | "error">(
    "idle"
  );
  const { isMobile } = useScreenWidth();
  const { closeEventModal } = useEventModal();
  const { leaveFreeEvent, isUserEventAttendee, refund } = useUser();
  const { event, setEvent } = useEvent();

  useEffect(() => {
    if (event?.id) {
      const checkAttending = async () => {
        try {
          const attending = await isUserEventAttendee(event.id);
        } catch (error) {
          console.error("Error checking attendance:", error);
          setUiState("error");
        }
      };
      checkAttending();
    }
  }, [event, isUserEventAttendee]);

  function getPriceRange(
    priceBands:
      | { type: string; price: string; ticketCount: number }[]
      | undefined,
    free?: boolean
  ): string {
    if (!Array.isArray(priceBands)) return "No price available";
    const availablePriceBands = priceBands.filter(
      (priceBand) => priceBand.price && priceBand.ticketCount > 0
    );
    if (free) return "Free";
    if (availablePriceBands.length === 0) return "No price available";
    const sortedPriceBands = availablePriceBands.sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
    if (sortedPriceBands.length === 1) return `${sortedPriceBands[0].price}`;
    return `${sortedPriceBands[0].price} - ${
      sortedPriceBands[sortedPriceBands.length - 1].price
    }`;
  }

  async function handleLeaveEvent() {
    if (!event?.id) {
      console.error("Event ID is missing");
      setUiState("error");
      return;
    }

    setUiState("loading"); // Set loading state
    try {
      await leaveFreeEvent(String(event.id));
      const updatedEvent = await fetchEventById(String(event.id));
      setEvent(updatedEvent);
      setUiState("left");
    } catch (error) {
      console.error("Failed to leave event:", error);
      setUiState("error");
    }
  }

  if (!event) {
    console.error("Event object is missing");
    return <div>Loading event...</div>;
  }

  const eventPrices = getPriceRange(event?.priceBands, event?.free);
  console.log(refund);
  return (
    <div className="flex flex-col items-center w-full h-full bg-bgPrimary rounded-lg">
      <main className="w-full h-full flex">
        {!isMobile && (
          <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden">
            <div className="w-[80%] h-[100%] flex flex-col items-center justify-start">
              <img
                className="w-[100%] tablet:h-[36%] desktop:h-[40%] rounded-lg mt-6"
                src={event?.image || "placeholder-image.jpg"}
                alt={event?.title}
              />
              <h1 className="text-textPrimary tablet:text-[20px] desktop:text-[26px] xl-screen:text-[30px] font-bold mt-4 mr-auto ml-2">
                {event?.title}
              </h1>
              <p className="text-textPrimary font-bold tablet:text-[14px] desktop:text-[18px] xl-screen:text-[22px] mr-auto ml-2 mt-4">
                Hosted by:{" "}
                <span className="text-primary">
                  {event?.group?.name || "Unknown Group"}
                </span>
              </p>
              <p className="font-bold text-textPrimary mt-4 tablet:text-[11px] desktop:text-[14px] xl-screen:text-[16px] mr-auto ml-2 pr-3">
                {event?.description[0] || ""}
              </p>
              <p className="font-medium text-textPrimary mt-4 tablet:text-[11px] desktop:text-[13px] xl-screen:text-[15px] mr-auto ml-2 pr-3">
                {event?.description[1] || ""}
              </p>
              <div className="flex items-center mr-auto mt-auto mb-12 pl-4">
                <div className="flex items-center">
                  <IoPerson className="text-[#D66E6E] tablet:text-[16px] desktop:text-[20px] xl-screen:text-[22px]" />
                  <p className="ml-2 tablet:text-[11px] desktop:text-[14px] xl-screen:text-[16px] font-semibold text-[#2C3E50]">
                    {event?.going} going
                  </p>
                </div>
                <div className="flex items-center ml-4">
                  <IoMdPricetag className="text-[#5D9B9B] tablet:text-[17px] desktop:text-[21px] xl-screen:text-[23px]" />
                  <p className="ml-2 tablet:text-[11px] desktop:text-[14px] xl-screen:text-[16px] font-semibold text-[#2C3E50]">
                    {eventPrices}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
        <section className="mobile:full mobile:w-full tablet:w-[50%] h-[100%] flex flex-col items-center rounded-lg mt-8">
          <h1 className="mobile:text-[28px] tablet:text-[28px] desktop:text-[36px] xl-screen:text-[42px] font-bold text-secondary mt-4">
            EventWey
          </h1>

          {uiState === "loading" ? (
            <div className="flex justify-center items-center w-full min-h-[200px] mt-8">
              <ClipLoader size={80} color="#5d9b9b" />
            </div>
          ) : uiState === "error" ? (
            <div className="text-red-500 mt-8">
              Failed to leave event. Please try again.
            </div>
          ) : uiState === "left" ? (
            <RefundConfirmation refund={refund} event={event} />
          ) : (
            <>
              <div className="w-full flex flex-col tablet:justify-center items-center">
                <h2 className="text-textPrimary mobile:text-[18px] tablet:text-[20px] desktop:text-[24px] xl-screen:text-[28px] font-bold mobile:mt-12 tablet:mt-[7rem] ml-2">
                  Cancel your attendance to the event
                </h2>
                <h3 className="text-primary font-bold mobile:text-[18px] tablet:text-[22px] desktop:text-[26px] xl-screen:text-[30px] mt-10">
                  {event?.title}?
                </h3>
              </div>
              <div className="mt-auto mb-16 flex flex-col">
                <Button
                  handleClick={handleLeaveEvent}
                  px="px-12"
                  py="py-3"
                  borderWidth="border-2"
                  borderColour="border-secondary"
                  bgColour="bg-secondary">
                  Refund ticket
                </Button>
                <Button
                  handleClick={closeEventModal}
                  px="px-12"
                  py="py-3"
                  mt="mt-8"
                  borderWidth="border-2"
                  borderColour="border-primary"
                  bgColour="bg-bgPrimary"
                  textColour="text-primary">
                  Cancel
                </Button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default CancelPaidEvent;
