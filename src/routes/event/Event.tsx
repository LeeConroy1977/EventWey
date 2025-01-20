import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvent } from "../../contexts/EventContext";
import EventGroupDetail from "./EventGroupDetail";
import EventDetail from "./EventDetail";
import EventConnectionsContainer from "./EventConnectionsContainer";
import EventOptionsContainer from "../../layouts/user-layout/EventOptionsContainer";
import EventMapContainer from "../../components/EventMapContainer";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import EventWrapper from "./EventWrapper";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { useUser } from "../../contexts/UserContext";

const Event = () => {
  const { id } = useParams();
  const { isMobile } = useScreenWidth();
  const { user, isUserAttendingEvent } = useUser();
  const {
    event,
    eventGroup,
    eventConnections,
    getEventById,
    error,
    loading,
    getGroupById,
    getEventConnections,
  } = useEvent();
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
  } = event || {};

  const { lat, lng, placename } = location || {};

  const handleGroupClick = useHandleGroupClick();

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
  const isAttending = isUserAttendingEvent(event?.id);

  useEffect(() => {
    if (id) {
      getEventById(id);
      getGroupById(id);
      getEventConnections(id);
    }
  }, [id]);

  return (
    <div className="w-full h-screen  tablet:h-auto flex flex-col items-center justify-start bg-bgSecondary">
      {event && (
        <>
          <EventWrapper event={event} />
          {isMobile && (
            <div className="fixed flex flex-row items-center justify-between bottom-0 left-0 w-screen h-[4.4rem] bg-bgSecondary px-6 z-50 border-t-[1px] border-t-gray-100">
              <p className="text-[14px] font-semibold">
                {free ? "Free" : eventPrices}
              </p>
              <button
                className={`w-[100px] h-[34px] ml-auto flex items-center justify-center text-[11px] font-semibold rounded-lg ${
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
          )}
          <main className="w-full m-h-screen tablet:w-[94%]  desktop:w-[66%] desktop:h-auto flex flex-col tablet:flex-row items-start justify-center bg-bgPrimary tablet:bg-bgSecondary px-6 mt-0 tablet:mt-0 tablet:px-0 tablet:p-4 pb-[5rem] ">
            <section className="flex flex-col justify-start items-start w-full tablet:w-[62%] h-auto p-0 tablet:p-4">
              {!isMobile && (
                <EventGroupDetail
                  eventGroup={eventGroup}
                  handleClick={handleGroupClick}
                />
              )}

              <EventDetail description={description} />
            </section>
            <section className="w-full tablet:w-[38%] h-auto flex flex-col items-center justify-start p-0 pl-0 desktop:p-0 tablet:pl-4 desktop:pl-8 gap-y-4 overflow-x-scroll ">
              {!isMobile && <EventOptionsContainer />}
              {isMobile && (
                <h1 className="text-[14px] desktop:text-[1rem] font-bold text-textPrimary mb-1 mr-auto desktop:mr-0 mt-6 desktop:-mt-0.5">
                  Location
                </h1>
              )}
              <EventMapContainer lat={lat} lng={lng} placename={placename} />
              <EventConnectionsContainer eventConnections={eventConnections} />
            </section>
          </main>
        </>
      )}
    </div>
  );
};

export default Event;
