import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import { format } from "date-fns";

const LandingEventCard = ({ event, handleClick }) => {
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

  function getPriceRange(priceArr: PriceBand[]): string {
    if (free) return "Free";
    if (!priceArr || priceArr.length === 0) return "No price available";

    const sortedPrice = priceArr.sort((a, b) => a.price - b.price);
    if (priceArr.length === 1) return `${sortedPrice[0].price}`;

    return `${sortedPrice[0].price} - ${
      sortedPrice[sortedPrice.length - 1].price
    }`;
  }

  let filteredDescription = description[0];

  const eventPrices = getPriceRange(priceBands);

  const formattedDate = format(new Date(date), "EEE, MMM d, yyyy");

  return (
    <div
      className="w-[23.5%] h-[300px] flex flex-col bg-bgPrimary rounded-lg cursor-pointer"
      onClick={() => handleClick(id)}
    >
      {event && (
        <>
          <img src={image} alt="" className="w-[100%] h-[134px] rounded-lg" />
          <div className="w-[100%] h-[56%] flex flex-col p-1">
            <p className="text-[9px] text-secondary font-bold mt-1 ">
              {formattedDate} . {startTime}
            </p>
            <h4 className="text-textPrimary font-bold text-[14px] mt-1">
              {title}
            </h4>
            <p className="text-[9px] font-semibold text-textPrimary mt-1 pr-4">
              {filteredDescription}
            </p>
            <p className="text-[9px] font-semibold text-textPrimary mt-2">
              Hosted by: <span className="text-primary ml-1">{groupName}</span>
            </p>

            <div className="flex items-center mt-auto mb-1">
              <div className="flex items-center">
                <IoPerson className="text-[#D66E6E] text-[15px]" />
                <p className="ml-2 text-[10px] font-semibold text-[#2C3E50]">
                  {going} going
                </p>
              </div>
              <div className="flex items-center ml-4">
                <IoMdPricetag className="text-[#5D9B9B] text-[15px]" />
                <p className="ml-2 text-[10px] font-semibold text-[#2C3E50]">
                  {eventPrices}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LandingEventCard;
