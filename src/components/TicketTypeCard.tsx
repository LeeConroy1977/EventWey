import { IoMdPricetag } from "react-icons/io";

interface TicketTypeProps {
  band: {};
  handleClick: (type: string) => void;
  ticketType: string;
}

const TicketTypeCard: React.FC<TicketTypeProps> = ({
  band,
  handleClick,
  ticketType,
}) => {
  const soldOut = band.ticketCount < 20;

  return (
    <div
      onClick={soldOut ? undefined : () => handleClick(band.type)}
      className={`${
        !soldOut && ticketType !== band.type
          ? "cursor-pointer bg-white text-textPrimary"
          : ticketType === band.type && !soldOut
          ? "bg-primary text-white cursor-pointer"
          : "bg-white text-textPrimary"
      } relative flex flex-col justify-between w-full h-[33%] p-4 m-2 border-[1px] border-gray-200 rounded-lg `}>
      <p className="text-[20px] font-semibold text-primary">
        {band.type} - Tickets
      </p>
      <div className="flex flex-row">
        <div className="flex items-center">
          <IoMdPricetag className="text-[#5D9B9B] tablet:text-[20px] " />
          <p className="text-[16px] text-textPrimary font-semibold ml-2">
            {band.price}
          </p>
        </div>

        <p className="text-[16px] text-textPrimary font-semibold ml-6">
          Tickets left: {band.ticketCount}
        </p>
      </div>

      <div
        className={`absolute bg-secondary text-white text-xs font-semibold ${
          soldOut ? "block" : "hidden"
        } px-6 py-2  flex items-center justify-center top-1/2 right-0 transform  -translate-y-1/2 z-10`}
        aria-label={soldOut ? "Ticket sold out" : undefined}>
        {soldOut ? "Sold Out" : ""}
      </div>
    </div>
  );
};

export default TicketTypeCard;
