import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import Button from "../reuseable-components/Button";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import EventConfimation from "./EventConfimation";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useScreenWidth } from "../contexts/ScreenWidthContext";

interface PriceBand {
  type: "Early bird" | "Standard" | "VIP";
  price: string;
  ticketCount: number;
}

interface Location {
  placename: string;
  lng: number;
  lat: number;
}

interface Event {
  id: string;
  image: string;
  title: string;
  date: string;
  groupName: string;
  groupId: number;
  duration: string;
  priceBands: PriceBand[];
  going: number;
  capacity: number;
  availability: number;
  free: boolean;
  category: string;
  tags: string[];
  description: string[];
  attendeesId: string[];
  location: Location;
  approved: boolean;
}

interface JoinedEventConfimationProps {
  event: Event;
}

const JoinedEventConfimation: React.FC<JoinedEventConfimationProps> = ({
  event,
}) => {
  const { id } = useParams();
  const { image, title, groupName, description, going, priceBands } = event;

  const { joinFreeEvent, isUserAttendingEvent } = useUser();
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [setIsAttending] = useState(false);
  const { isMobile } = useScreenWidth();

  useEffect(() => {
    const checkAttendanceStatus = async () => {
      // @ts-ignore
      const attendingStatus = await isUserAttendingEvent(id);
      // @ts-ignore
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
    if (event?.free) return "Free";
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
    await joinFreeEvent(event.id); // Simulate event join
    setIsJoined(true); // Update joined status
    setLoading(false); // Set loading to false after completion
  };
  const eventPrices = getPriceRange(priceBands);

  return (
    <div className="flex flex-col items-center w-full h-full bg-bgPrimary rounded-lg">
      <main className="w-full h-full flex">
        {!isMobile && (
          <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden ">
            <div className="w-[80%] h-[100%] flex flex-col items-center justify-start ">
              <img
                className="w-[100%] tablet:h-[36%] desktop:h-[40%] rounded-lg mt-6"
                src={image}
                alt=""
              />
              <h1 className="text-textPrimary tablet:text-[20px] desktop:text-[26px] xl-screen:text-[30px] font-bold mt-4 mr-auto ml-2">
                {title}
              </h1>
              <p className="text-textPrimary font-bold tablet:text-[14px] desktop:text-[18px] xl-screen:text-[22px] mr-auto ml-2 mt-4">
                Hosted by: <span className="text-primary">{groupName}</span>
              </p>

              <p className="font-bold text-textPrimary mt-4 tablet:text-[11px] desktop:text-[14px] xl-screen:text-[16px] mr-auto ml-2 pr-3">
                {description[0]}
              </p>
              <p className="font-medium text-textPrimary mt-4 tablet:text-[11px] desktop:text-[13px] xl-screen:text-[15px] mr-auto ml-2 pr-3">
                {description[1]}
              </p>
              <div className="flex items-center mr-auto mt-auto mb-12 pl-4">
                <div className="flex items-center">
                  <IoPerson className="text-[#D66E6E] tablet:text-[16px] desktop:text-[20px] xl-screen:text-[22px]" />
                  <p className="ml-2 tablet:text-[11px] desktop:text-[14px] xl-screen:text-[16px] font-semibold text-[#2C3E50]">
                    {going} going
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
          {isLoading ? (
            <div className="flex mobile:flex-col mobile:justify-start tablet:justify-center items-center mobile:mb-auto tablet:mb-0 mobile:h-screen tablet:h-[200px] mobile:mt-16 mt-8">
              <ClipLoader size={80} color={"#5d9b9b"} />
            </div>
          ) : (
            <>
              {!isLoading && isJoined ? (
                <EventConfimation event={event} />
              ) : (
                <>
                  <div className="w-full flex flex-col tablet:justify-center items-center ">
                    <h2 className="text-textPrimary mobile:text-[18px]  tablet:text-[20px] desktop:text-[24px] xl-screen:text-[28px] font-bold mobile:mt-12 tablet:mt-[7rem]  ml-2">
                      Confirm your attendance
                    </h2>
                    <h3 className="text-primary font-bold mobile:text-[18px]  tablet:text-[22px] desktop:text-[26px] xl-screen:text-[30px] mt-10">
                      {title}
                    </h3>
                  </div>
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
