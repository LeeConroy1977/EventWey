import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import { format } from "date-fns";
import { useUser } from "../contexts/UserContext";

interface PriceBand {
  price: number;
  type: string;
}

interface Event {
  id: number;
  image: string;
  date: number; // Assuming the date is a timestamp in milliseconds
  title: string;
  groupName: string;
  duration: string;
  going: number;
  availability: number;
  free: boolean;
  priceBands: PriceBand[];
}

interface HomeEventsCardProps {
  event: Event;
}

const HomeEventsCard: React.FC<HomeEventsCardProps> = ({ event }) => {
  const { user } = useUser();
  const {
    id,
    image,
    date,
    title,
    groupName,
    duration,
    going,
    availability,
    free,
    priceBands,
  } = event;
  const formattedDate = format(new Date(date), "EEE, MMM d, yyyy");

  const isAttending = user.userEvents.includes(id);

  function getPriceRange(priceArr: PriceBand[]) {
    if (free) return "Free";
    if (!priceArr || priceArr.length === 0) {
      return;
    }
    const sortedPrice = priceArr.sort((a, b) => a.price - b.price);
    if (priceArr.length === 1) {
      return priceArr[0].price;
    }
    return `${sortedPrice[0].price} - ${
      sortedPrice[sortedPrice.length - 1].price
    }`;
  }

  const eventPrices = getPriceRange(priceBands);

  return (
    <div className="relative flex items-center w-[100%] h-[220px] bg-white p-4  border-gray-300 rounded-lg mt-4">
      <img src={image && image} className="w-[40%] h-[90%] ml-2  rounded-lg" />
      <div className="w-[60%] h-[100%]  p-3 pl-8 pt-5">
        <p className="text-[12px] text-[#2C3E50] font-medium">
          {formattedDate}
        </p>
        <h2 className="text-[21px] font-bold text-[#2C3E50] mt-1">{title}</h2>
        <p className="text-[12px] font-semibold text-[#5D9B9B] mt-2">{`Hosted by: ${groupName}`}</p>
        <p className="text-[11px] font-semibold text-gray-500 mt-3">{`Duration: ${duration}`}</p>
        <div className="flex w-[100%] h-[25%] mt-2">
          <div className="flex items-center">
            <div className="flex items-center ">
              <span>
                <IoPerson className="text-[#D66E6E] text-[18px]" />
              </span>
              <p className="ml-2 text-[12px] font-semibold text-[#2C3E50]">
                {going} going
              </p>
            </div>
            <div className="flex items-center">
              <span>
                <IoMdPricetag className="text-[#5D9B9B] text-[18px] ml-4" />
              </span>
              <p className="ml-2 text-[12px] font-semibold text-[#2C3E50]">
                {eventPrices}
              </p>
            </div>
            {!isAttending && (
              <p className="ml-6 text-[12px] text-[#D66E6E] font-semibold">
                {availability} places left
              </p>
            )}
          </div>
          <button
            className={`w-[100px] h-[34px] ml-auto flex items-center justify-center text-[11px]  font-semibold rounded-lg ${
              isAttending
                ? "bg-bgPrimary border-2 border-primary text-primary"
                : free
                ? "bg-[#5D9B9B] text-white"
                : "bg-[#5D9B9B] text-white"
            }`}
          >
            {isAttending ? "Going" : free ? "Join Event" : "Get Tickets"}
          </button>
        </div>
      </div>
      <div className={``}></div>
    </div>
  );
};

export default HomeEventsCard;
