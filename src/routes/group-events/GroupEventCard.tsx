import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import { format } from "date-fns";
import { useUser } from "../../contexts/UserContext";

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
  priceBands: PriceBand[];
}

interface HomeEventsCardProps {
  event: Event;
  handleClick: () => void;
}

const GroupEventCard = ({ event, handleClick }) => {
  const { user } = useUser();
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
  } = event;

  const formattedDate = format(new Date(date), "EEE, MMM d, yyyy");

  const isAttending = user?.userEvents?.includes(id);

  let filteredDescription = description[0];
  filteredDescription = filteredDescription.replaceAll("**", "");

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
      className="relative flex items-center w-[100%] h-[190px] bg-white p-4 border-gray-200 rounded-lg mt-6 border-[1px] cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className="w-[40%] h-[90%] ml-2 rounded-lg"
      />
      <div className="w-[60%] h-[100%] flex flex-col justify-between p-3 pl-8 pt-3">
        <div>
          <p className="text-[11px] text-[#2C3E50] font-medium mt-1">
            {formattedDate}
          </p>
          <h2 className="text-[17px] font-bold text-[#2C3E50] mt-2">{title}</h2>
          <p className="text-[11px] font-semibold text-textPrimary mt-2 pr-4">
            {filteredDescription}
          </p>
        </div>
        <div className="flex w-[100%] h-[25%] mt-auto mb-1 items-end">
          <div className="flex items-center">
            <div className="flex items-center">
              <IoPerson className="text-[#D66E6E] text-[17px]" />
              <p className="ml-2 text-[10px] font-semibold text-[#2C3E50]">
                {going} going
              </p>
            </div>
            <div className="flex items-center ml-4">
              <IoMdPricetag className="text-[#5D9B9B] text-[17px]" />
              <p className="ml-2 text-[10px] font-semibold text-[#2C3E50]">
                {eventPrices}
              </p>
            </div>
            {!isAttending && (
              <p className="ml-4 text-[10px] text-[#D66E6E] font-semibold">
                {availability} places left
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupEventCard;
