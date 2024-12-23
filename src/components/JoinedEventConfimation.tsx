import { format } from "date-fns";
import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import Button from "../reuseable-components/Button";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import EventConfimation from "./EventConfimation";

const JoinedEventConfimation = ({ event }) => {
  const {
    id,
    image,
    title,
    groupName,
    description,
    date,
    going,
    priceBands,
    availability,
    free,
  } = event;

  const { joinFreeEvent, isUserAttendingEvent, setIsAttending, isAttending } =
    useUser();
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const checkAttendanceStatus = async () => {
      const attendingStatus = await isUserAttendingEvent(id);
      setIsAttending(attendingStatus);
    };

    checkAttendanceStatus();
  }, [id, setIsAttending, isUserAttendingEvent]);

  function getPriceRange(
    priceBands: { type: string; price: string; ticketCount: number }[]
  ): string {
    const availablePriceBands = priceBands.filter(
      (priceBand) => priceBand.price && priceBand.ticketCount > 0
    );

    if (availablePriceBands.length === 0) return "No price available";
    const sortedPriceBands = availablePriceBands.sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );

    if (sortedPriceBands.length === 1) return `${sortedPriceBands[0].price}`;

    return `${sortedPriceBands[0].price} - ${
      sortedPriceBands[sortedPriceBands.length - 1].price
    }`;
  }

  const handleJoinEvent = async () => {
    console.log("isLoading", isLoading); // Check loading state
    await joinFreeEvent(id); // Simulate event join
    setIsJoined(true); // Update joined status
    setLoading(false); // Set loading to false after completion
  };
  const eventPrices = getPriceRange(priceBands);

  return (
    <div className="flex flex-col items-center w-full h-full bg-bgPrimary rounded-lg">
      <main className="w-full h-full flex">
        <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden ">
          <div className="w-[80%] h-[100%] flex flex-col items-center justify-start ">
            <img
              className="w-[100%] h-[40%] rounded-lg mt-6"
              src={image}
              alt=""
            />
            <h1 className="text-textPrimary text-[26px] font-bold mt-4 mr-auto ml-2">
              {title}
            </h1>
            <p className="text-textPrimary font-bold text-[18px] mr-auto ml-2 mt-4">
              Hosted by: <span className="text-primary">{groupName}</span>
            </p>

            <p className="font-bold text-textPrimary mt-4 text-[15px] mr-auto ml-2 pr-3">
              {description[0]}
            </p>
            <p className="font-medium text-textPrimary mt-4 text-[14px] mr-auto ml-2 pr-3">
              {description[1]}
            </p>
            <div className="flex items-center mr-auto mt-auto mb-12 pl-4">
              <div className="flex items-center">
                <IoPerson className="text-[#D66E6E] text-[20px]" />
                <p className="ml-2 text-[14px] font-semibold text-[#2C3E50]">
                  {going} going
                </p>
              </div>
              <div className="flex items-center ml-4">
                <IoMdPricetag className="text-[#5D9B9B] text-[21px]" />
                <p className="ml-2 text-[14px] font-semibold text-[#2C3E50]">
                  {eventPrices}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-[50%] h-[100%] flex flex-col items-center rounded-lg mt-8">
          <h1 className="text-[36px] font-bold text-secondary mt-4">
            EventWey
          </h1>
          {isLoading ? (
            <div className="w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
          ) : (
            <>
              {!isLoading && isJoined ? (
                <EventConfimation event={event} />
              ) : (
                <>
                  <h2 className="text-textPrimary text-[26px] font-bold mt-[7rem] mr-auto ml-2">
                    Confirm your attendance to the event
                  </h2>
                  <h3 className="text-primary font-bold text-[28px] mt-6">
                    {title}
                  </h3>
                  <div className="mt-auto mb-16">
                    <Button
                      handleClick={() => {
                        setLoading(true);
                        handleJoinEvent();
                      }}
                      px="px-12"
                      py="py-3"
                      bgColour="bg-secondary"
                    >
                      Join Event
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default JoinedEventConfimation;
