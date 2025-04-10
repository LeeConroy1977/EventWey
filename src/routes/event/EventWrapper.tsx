import { format } from "date-fns";
import { useUser } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { useEventModal } from "../../contexts/EventModelContext";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import EventOptionsContainer from "../../layouts/user-layout/EventOptionsContainer";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import { Event } from '../../types/event';

interface EventWrapperProps {
  event: Event;
  handleApproveEvent: () => void;
  handleRemoveEvent: () => void;
}

const EventWrapper: React.FC<EventWrapperProps> = ({
  event,
  handleApproveEvent,
  handleRemoveEvent,
}) => {
  const { isUserAttendingEvent } = useUser();
  const { isMobile } = useScreenWidth();
  const handleGroupClick = useHandleGroupClick();
  const { id } = useParams();
  const {
    image,
    date,
    title,
    description,
    free,
    location,
    startTime,
    approved,
    group,
  } = event;
  const { openEventModal } = useEventModal();

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

  const handleJoinEvent = () => openEventModal(event, "join");
  const handleGetTickets = () => openEventModal(event, "tickets");
  const handleCancelAttendance = () => openEventModal(event, "cancel");

  // Fix: Explicitly type as boolean and ensure return value
  const isAttending: boolean = isUserAttendingEvent(id ?? "") || false;

  // Helper functions for group
  const getGroupId = (): string => {
    return typeof group === "number" ? String(group) : String(group.id);
  };

  const getGroupName = (): string => {
    return typeof group === "number" ? `Group #${group}` : group.name;
  };

 


  return (
    <div className="w-[100%] h-auto tablet:h-[18rem] desktop:h-[21rem] xl-screen:h-[25rem] flex flex-col tablet:flex-row items-center justify-center bg-bgPrimary border-b-2 border-gray-200 p-6 desktop:p-8">
      <div className="w-full tablet:w-[94%] desktop:w-[66%] h-[100%] flex flex-col tablet:flex-row items-center justify-center mt-0 tablet:mt-6">
        <div className="h-[100%] w-full tablet:w-[50%] flex items-center justify-center">
          <img
            src={image}
            alt=""
            className="w-full h-[100%] tablet:w-[90%] tablet:h-[92%] rounded-lg"
          />
        </div>
        <div className="w-full tablet:w-[50%] h-[100%] flex flex-col items-center justify-start pl-0 p-0 tablet:pl-12 desktop:pl-16 tablet:p-2">
          <p className="text-[12px] desktop:text-[14px] xl-screen:text-[18px] font-semibold text-secondary mt-4 tablet:mt-3 mr-auto">
            {formattedDate} @ {startTime}
          </p>
          <h1 className="text-[20px] desktop:text-[26px] xl-screen:text-[30px] font-bold text-[#2C3E50] mt-2 mr-auto">
            {title}
          </h1>
          {isMobile && (
            <p className="text-[12px] desktop:text-[14px] font-semibold mt-2 mr-auto">
              Hosted by:
              <span
                onClick={() => handleGroupClick(getGroupId())}
                className="font-semibold text-primary ml-2"
              >
                {getGroupName()}
              </span>
            </p>
          )}
          <p className="text-[12px] desktop:text-[14px] xl-screen:text-[18px] font-semibold mt-2 mr-auto">
            Location:
            <span className="font-semibold text-textPrimary desktop:text-primary ml-2">
              {location.placename}
            </span>
          </p>
          <p className="mt-3 desktop:mt-3 text-[12px] desktop:text-[14px] xl-screen:text-[16px] font-semibold mr-auto">
            {description[0]}
          </p>
          {isMobile && <EventOptionsContainer />}
          {!isMobile && !approved && (
            <div className="flex mr-auto mt-auto mb-1 desktop:h-[66px]">
             erv              <button
                onClick={handleApproveEvent}
                className="w-[110px] desktop:w-[120px] tablet:h-[34px] desktop:h-[40px] xl-screen:w-[140px] xl-screen:h-[44px] mt-auto mb-1 mr-auto flex items-center justify-center tablet:text-[10px] desktop:text-[11px] xl-screen:text-[12px] font-semibold rounded-lg tablet:mb-3 desktop:mb-1 bg-primary text-white"
              >
                Approve Group
              </button>
              <button
                onClick={handleRemoveEvent}
                className="w-[110px] desktop:w-[120px] tablet:h-[34px] desktop:h-[40px] xl-screen:w-[140px] xl-screen:h-[44px] mt-auto mb-1 mr-auto flex items-center justify-center tablet:text-[10px] desktop:text-[11px] xl-screen:text-[12px] font-semibold rounded-lg tablet:mb-3 desktop:mb-1 bg-secondary text-white tablet:ml-8"
              >
                Reject Group
              </button>
            </div>
          )}
          {!isMobile && approved && (
            <button
              onClick={
                isAttending
                  ? handleCancelAttendance
                  : free
                  ? handleJoinEvent
                  : handleGetTickets
              }
              className={`w-[110px] desktop:w-[120px] tablet:h-[34px] desktop:h-[40px] xl-screen:w-[140px] xl-screen:h-[44px] mt-auto mb-1 mr-auto flex items-center justify-center tablet:text-[10px] desktop:text-[11px] xl-screen:text-[12px] font-semibold rounded-lg tablet:mb-3 desktop:mb-1 ${
                isAttending
                  ? "bg-bgPrimary border-2 border-primary text-primary"
                  : free
                  ? "bg-secondary text-white"
                  : "bg-secondary text-white"
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

export default EventWrapper;