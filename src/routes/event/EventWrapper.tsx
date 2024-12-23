import { format } from "date-fns";
import { useUser } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { useEventModal } from "../../contexts/EventModelContext";

const EventWrapper = ({ event }) => {
  const { user, isUserAttendingEvent } = useUser();
  const { id } = useParams();
  const {
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
    tags,
    location,
    startTime,
  } = event;
  const { openEventModal } = useEventModal();

  const formattedDate = format(new Date(date), "EEE, MMM d, yyyy");

  const handleJoinEvent = () => openEventModal(event, "join");
  const handleGetTickets = () => openEventModal(event, "tickets");
  const handleCancelAttendance = () => openEventModal(event, "cancel");

  const isAttending = isUserAttendingEvent(id);

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
    <div className="w-[100%] h-[21rem] flex items-center justify-center  bg-bgPrimary border-b-2 border-gray-200 p-8">
      <div className=" w-[66%] h-[100%] flex items-center justify-center  mt-6 ">
        <div className="h-[100%] w-[50%] flex items-center justify-center ">
          <img src={image} alt="" className="w-[90%] h-[92%] rounded-lg " />
        </div>
        <div className="w-[50%] h-[100%] flex flex-col items-center justify-start pl-16 p-4">
          <p className="text-[14px] font-meduim mt-1 mr-auto">
            {formattedDate} @ {startTime}
          </p>
          <h1 className="text-[26px] font-bold  text-[#2C3E50] mt-2 mr-auto">
            {title}
          </h1>
          <p className="text-[14px] font-semibold mt-1 mr-auto">
            Hosted by:{" "}
            <span className="font-semibold text-primary ml-2">
              {" "}
              {groupName}
            </span>
          </p>
          <p
            className="mt-4 text-[1
          14px] font-semibold mr-auto"
          >
            {description[0]}
          </p>
          <button
            onClick={
              isAttending
                ? () => handleCancelAttendance()
                : free
                ? () => handleJoinEvent()
                : () => handleGetTickets()
            }
            className={`w-[120px] h-[40px] mt-auto mb-2 mr-auto  flex items-center justify-center text-[11px] font-semibold rounded-lg ${
              isAttending
                ? "bg-bgPrimary border-2 border-primary text-primary"
                : free
                ? "bg-secondary text-white"
                : "bg-secondary text-white"
            }`}
          >
            {isAttending ? "Going" : free ? "Join Event" : "Get Tickets"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventWrapper;
