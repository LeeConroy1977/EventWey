import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import { format } from "date-fns";
import React from "react";

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
  startTime: string;
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

interface LandingEventCardProps {
  event: Event;
  handleClick: (id: string) => void;
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
    groupName,
    going,
    free,
    priceBands,
    startTime,
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

  const eventPrices = getPriceRange(priceBands);

  const formattedDate = format(new Date(date), "EEE, MMM d, yyyy");

  return (
    <div
      className="w-[100%] tablet:w-[23.5%] tablet:h-[350px] desktop:h-[390px] xl-screen:h-[420px] flex flex-col bg-bgPrimary rounded-lg cursor-pointer border-[1px] border-gray-200 mb-6 desktop:mb-0"
      onClick={() => handleClick(id)}
    >
      {event && (
        <>
          <img
            src={image}
            alt=""
            className="w-[100%] h-[200px] tablet:h-[140px] desktop:h-[160px] xl-screen:h-[200px] rounded-tl-lg rounded-tr-lg"
          />
          <div className="w-[100%] h-[56%] flex flex-col p-3 py-4 tablet:py-3 xl-screen:p-4">
            <p className="text-[10px] desktop:text-[11px] xl-screen:text-[12px] text-secondary font-bold  ">
              {formattedDate} . {startTime}
            </p>
            <h4 className="text-textPrimary font-bold text-[16px] tablet:text-[13px] desktop:text-[16px] xl-screen:text-[18px]  mt-1">
              {title}
            </h4>
            <p className="text-[9px] desktop:text-[11px] xl-screen:text-[12px]  font-semibold text-textPrimary mt-1">
              Hosted by: <span className="text-primary ml-1">{groupName}</span>
            </p>
            <p className="text-[10px] tablet:text-[9px] desktop:text-[11px] xl-screen:text-[12px]  font-semibold text-textPrimary mobile:mt-3 tablet:mt-2 desktop:mt-3 pr-4">
              {filteredDescription}
            </p>

            <div className="flex items-center mt-4 tablet:mt-auto mb-1 tablet:mb-0">
              <div className="flex items-center">
                <IoPerson className="text-[#D66E6E] text-[15px] desktop:text-[16px] xl-screen:text-[17px] " />
                <p className="ml-2 text-[10px] desktop:text-[11px] xl-screen:text-[12px]  font-semibold text-[#2C3E50]">
                  {going} going
                </p>
              </div>
              <div className="flex items-center ml-4">
                <IoMdPricetag className="text-[#5D9B9B] text-[15px] desktop:text-[16px] xl-screen:text-[17px] " />
                <p className="ml-2 text-[10px] desktop:text-[11px] xl-screen:text-[12px]  font-semibold text-[#2C3E50]">
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
