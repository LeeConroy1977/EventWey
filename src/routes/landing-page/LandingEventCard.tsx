import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import { format } from "date-fns";
import React from "react";
import { Event } from '../../types/event';


interface LandingEventCardProps {
  event: Event;
  handleClick: (id: string) => void;
}

interface PriceBand {
  type: "Early bird" | "Standard" | "VIP";
  price: string;
  ticketCount: number;
}

const LandingEventCard: React.FC<LandingEventCardProps> = ({
  event,
  handleClick,
}) => {
  const {
    id,
    image,
    date,
    title,
    description,
    going,
    free,
    availability,
    priceBands,
    startTime,
    group
    
    
  } = event;

  function getPriceRange(priceArr: PriceBand[]): string {
    if (free) return "Free";
    if (!priceArr || priceArr.length === 0) return "No price available";

    const sortedPrice = priceArr.sort((a: any, b: any) => a.price - b.price);
    if (priceArr.length === 1) return `${sortedPrice[0].price}`;

    return `${sortedPrice[0].price} - ${
      sortedPrice[sortedPrice.length - 1].price
    }`;
  }

  let filteredDescription = description[0];
  const eventPrices = getPriceRange(priceBands || []);


  let formattedDate: string;
try {

  const eventDate = typeof date === "number" ? new Date(date) : new Date(parseInt(date, 10));
  if (isNaN(eventDate.getTime())) {
    throw new Error("Invalid date");
  }
  formattedDate = format(eventDate, "EEE, MMM d, yyyy");
} catch (error) {
  console.warn(`Invalid date for event ${id}: ${date}`);
  formattedDate = "Date unavailable";
}

  return (
    <div
      className=" w-[100%] tablet:w-[23.5%] tablet:h-[350px] desktop:h-[420px] xl-screen:h-[460px] flex flex-col justify-start bg-bgPrimary rounded-lg cursor-pointer border-[1px] border-gray-200 mb-6 desktop:mb-0"
      onClick={() => handleClick(String(id))}
    >
      {event && (
        <>
        <div className="relative w-[100%] h-[200px] tablet:h-[140px] desktop:h-[33%] xl-screen:h-[40%] rounded-tl-lg ">
          <img
            src={image}
            alt=""
            className="w-[100%] h-[200px] tablet:h-[140px] desktop:h-[33%] xl-screen:h-full rounded-tl-lg rounded-tr-lg"
          />
        <div className={`${availability < 1 ? 'bg-red-500 text-textSecondary': free? 'bg-[#F2A541] text-textSecondary ': 'bg-primary text-textSecondary' } absolute bottom-4 right-0 w-1/3 h-6 font-medium xl-screen:text-[10px] flex items-center justify-center rounded-tl-full rounded-bl-full `} >{availability === 0 ? "Sold Out" : availability > 0 ? (free ? `${availability} places left` : `${availability} tickets left`) : ""}</div>
        </div>
          <div className="w-[100%] h-[60%] flex flex-col p-3 py-4 tablet:py-3 desktop:p-4">
            <p className="text-[10px] desktop:text-[12px] xl-screen:text-[12px] text-secondary font-bold">
              {formattedDate} . {startTime}
            </p>
            <h4 className="text-textPrimary font-bold text-[16px] tablet:text-[13px] desktop:text-[17px] xl-screen:text-[18px] mt-1">
              {title}
            </h4>
            <p className="text-[9px] desktop:text-[12px] xl-screen:text-[13px] font-semibold text-textPrimary mt-1">
              Hosted by: <span className="text-primary ml-1">{group.name}</span>
            </p>
            <p className="text-[10px] tablet:text-[9px] desktop:text-[13px] xl-screen:text-[14px] font-medium text-textPrimary mobile:mt-3 tablet:mt-2 desktop:mt-3 pr-4">
              {filteredDescription}
            </p>

            <div className="flex items-center mt-4 tablet:mt-auto mb-1 tablet:mb-0">
              <div className="flex items-center">
                <IoPerson className="text-[#D66E6E] text-[15px] desktop:text-[17px] xl-screen:text-[18px]" />
                <p className="ml-2 text-[10px] desktop:text-[12px] xl-screen:text-[13px] font-semibold text-[#2C3E50]">
                  {going} going
                </p>
              </div>
              <div className="flex items-center ml-4">
                <IoMdPricetag className="text-[#5D9B9B] text-[15px] desktop:text-[18px] xl-screen:text-[18px]" />
                <p className="ml-2 text-[10px] desktop:text-[12px] xl-screen:text-[13px] font-semibold text-[#2C3E50]">
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