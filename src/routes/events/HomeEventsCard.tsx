import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import { format } from "date-fns";
import { useUser } from "../../contexts/UserContext";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

interface PriceBand {
  price: number;
  type: string;
}

interface Event {
  id: number;
  image: string;
  date: number;
  title: string;
  description: string;
  groupName: string;
  duration: string;
  going: number;
  availability: number;
  free: boolean;
  priceBands: PriceBand;
  startTime: string;
}

interface HomeEventsCardProps {
  event: Event;
  handleClick: () => void;
}

const HomeEventsCard: React.FC<HomeEventsCardProps> = ({
  event,
  handleClick,
}) => {
  const { user, isUserAttendingEvent } = useUser();
  const { isMobile } = useScreenWidth();
  const {
    id,
    image,
    date,
    title,
    description,
    groupName,
    duration,
    going,
    availability,
    free,
    priceBands,
    startTime,
  } = event;

  const formattedDate = format(new Date(date), "EEE, MMM d, yyyy");

  const isAttending = isUserAttendingEvent(event?.id);

  let filteredDescription = description[0];

  function getPriceRange(priceArr: PriceBand[]): string {
    if (free) return "Free";
    if (!priceArr || priceArr.length === 0) return "No price available";

    const sortedPrice = priceArr.sort((a, b) => a.price - b.price);
    if (priceArr.length === 1) return `${sortedPrice[0].price}`;

    return `${sortedPrice[0].price} - ${
      sortedPrice[sortedPrice.length - 1].price
    }`;
  }

  const eventPrices = getPriceRange(priceBands);

  return (
    <div
      onClick={() => handleClick(id)}
      className="relative flex flex-col tablet:flex-row items-center w-[100%] tablet:h-[210px] desktop:h-[240px]  xl-screen:h-[280px] bg-white tablet:p-3 desktop:p-4  border-gray-200 rounded-lg mt-4  border-[1px] cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className="w-[100%] h-[200px] tablet:w-[40%] tablet:h-[90%] tablet:ml-2 rounded-tl-lg rounded-tr-lg tablet:rounded-lg "
      />
      <div className="w-[100%] tablet:w-[60%] h-[56%] tablet:h-[90%]  flex flex-col justify-between  p-3 py-4 tablet:px-0 tablet:py-0 tablet:p-3 tablet:pl-8 tablet:pt-3">
        <div>
          <p className="text-[10px] desktop:text-[12px] xl-screen:text-[14px]  text-secondary  font-bold desktop:font-medium">
            {formattedDate} . {startTime}
          </p>
          <h2 className="text-[16px] desktop:text-[18px] xl-screen:text-[22px]  font-bold text-textPrimary mt-1">
            {title}
          </h2>
          <p className="text-[9px] desktop:text-[11px] xl-screen:text-[14px]   font-semibold text-textPrimary mt-1 desktop:mt-2">
            Hosted by:{" "}
            <span className="text-[#5D9B9B] ml-1 desktop:ml-2">
              {groupName}
            </span>
          </p>
          <p className="text-[10px] desktop:text-[11px] xl-screen:text-[14px]   font-semibold text-textPrimary mt-3 tablet:mt-2 pr-4 xl-screen:pr-16">
            {filteredDescription}
          </p>
        </div>
        <div className="flex items-center w-[100%] h-[25%] mt-4 mb-1 tablet:mb-0 tablet:mt-auto">
          <div className="flex items-center">
            <div className="flex items-center">
              <IoPerson className="text-[#D66E6E] text-[15px] desktop:text-[18px] xl-screen:text-[20px]" />
              <p className="ml-2 tablet:ml-1 desktop:ml-2 text-[10px] desktop:text-[12px] xl-screen:text-[14px] font-semibold text-[#2C3E50]">
                {going} going
              </p>
            </div>
            <div className="flex items-center ml-4 tablet:ml-2 desktop:ml-4">
              <IoMdPricetag className="text-[#5D9B9B] text-[15px] desktop:text-[18px] xl-screen:text-[20px]" />
              <p className="ml-2 tablet:ml-1 desktop:ml-2 text-[10px] desktop:text-[12px] xl-screen:text-[14px]  font-semibold text-[#2C3E50]">
                {eventPrices}
              </p>
            </div>
            {/* {!isAttending && (
              <p className="ml-4 tablet:ml-2 desktop:ml-4 text-[10px] desktop:text-[12px] xl-screen:text-[14px]  text-[#D66E6E] font-semibold">
                {availability} places
              </p>
            )} */}
          </div>
          {!isMobile && (
            <button
              className={`tablet:w-[74px] tablet:h-[30px] desktop:w-[100px] xl-screen:w-[120px]  desktop:h-[34px]  xl-screen:h-[40px]  ml-auto desktop:mr-4 flex items-center justify-center  tablet:text-[9px] desktop:text-[11px] xl-screen:text-[13px] xl-screen:mr-4 font-semibold rounded-lg ${
                isAttending
                  ? "bg-bgPrimary border-2 border-primary text-primary"
                  : free
                  ? "bg-[#5D9B9B] text-white"
                  : "bg-[#5D9B9B] text-white"
              }`}
            >
              {isAttending ? "Going" : free ? "Join Event" : "Get Tickets"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeEventsCard;
