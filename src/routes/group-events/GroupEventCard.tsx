import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import { format } from "date-fns";
import { useUser } from "../../contexts/UserContext";
import React from "react";
import {Event} from '../../types/event'

interface PriceBand {
  type: "Early bird" | "Standard" | "VIP";
  price: string;
  ticketCount: number;
}

interface GroupEventCardProps {
  event: Event;
  handleClick: (id: string) => void;
}

const GroupEventCard: React.FC<GroupEventCardProps> = ({
  event,
  handleClick,
}) => {
  const { user } = useUser();
  const {
    id,
    image,
    date,
    title,
    description,
    going,
    availability,
    free,
    priceBands,
    startTime,
  } = event;

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

  const isAttending = user?.events?.includes(id);

  let filteredDescription = description[0];

  filteredDescription = filteredDescription.replace(/\*\*/g, "");

  function getPriceRange(priceArr: PriceBand[]): string {
    if (free) return "Free";
    if (!priceArr || priceArr.length === 0) return "No price available";

    const sortedPrice = priceArr.sort((a, b) => Number(a.price) - Number(b.price));
    if (priceArr.length === 1) return `${sortedPrice[0].price}`;

    return `${sortedPrice[0].price} - ${
      sortedPrice[sortedPrice.length - 1].price
    }`;
  }

  const eventPrices = getPriceRange(priceBands || []);

  return (
    <div
      onClick={() => handleClick(String(id))}
      className="relative flex flex-col tablet:flex-row items-center w-[100%] h-auto tablet:h-[170px] desktop:h-[190px] xl-screen:h-[220px] bg-white tablet:p-2 desktop:p-4 border-gray-200 rounded-lg mt-6 border-[1px] cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className="w-[100%] h-[200px]  tablet:w-[40%]  tablet:h-[90%] tablet:ml-2 rounded-tl-lg rounded-tr-lg tablet:rounded-lg"
      />
      <div className="w-full tablet:w-[60%] h-[56%] tablet:h-[100%]  flex flex-col justify-between p-3 py-4 tablet:py-0 tablet:pl-8 tablet:pt-3">
        <div>
          <p className="text-[10px] desktop:text-[11px] xl-screen:text-[13px] text-secondary   font-bold tablet:font-semibold mt-1">
            {formattedDate} . {startTime}
          </p>
          <h2 className="text-[16px] desktop:text-[17px] xl-screen:text-[19px]  font-bold text-textPrimary mt-1 xl-screen:mt-2">
            {title}
          </h2>
          <p className="text-[10px] desktop:text-[11px] xl-screen:text-[13px]  font-semibold text-textPrimary mt-1  desktop:mt-1 xl-screen:mt-2 pr-4">
            {filteredDescription}
          </p>
        </div>
        <div className="flex w-[100%] h-[25%] mt-4 mb-1  tablet:mb-2 xl-screen:mb-4 desktop:mt-auto items-end">
          <div className="flex items-center">
            <div className="flex items-center">
              <IoPerson className="text-[#D66E6E] text-[15px] desktop:text-[17px] xl-screen:text-[19px]" />
              <p className="ml-2 text-[10px] xl-screen:text-[13px] font-semibold text-[#2C3E50]">
                {going} going
              </p>
            </div>
            <div className="flex items-center ml-4">
              <IoMdPricetag className="text-[#5D9B9B] text-[15px] desktop:text-[17px] xl-screen:text-[19px]" />
              <p className="ml-2 text-[10px] xl-screen:text-[13px] font-semibold text-[#2C3E50]">
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
