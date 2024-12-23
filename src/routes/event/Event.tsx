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

const Event = () => {
  const { id } = useParams();
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

  useEffect(() => {
    if (id) {
      getEventById(id);
      getGroupById(id);
      getEventConnections(id);
    }
  }, [id]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-start bg-bgSecondary">
      {event && (
        <>
          <EventWrapper event={event} />
          <main className="w-[66%] h-auto flex items-start justify-center bg-bgSecondary p-4">
            <section className="flex flex-col justify-start items-start w-[62%] h-auto p-4">
              <EventGroupDetail
                eventGroup={eventGroup}
                handleClick={handleGroupClick}
              />
              <EventDetail description={description} />
            </section>
            <section className="w-[38%] h-auto flex flex-col items-center justify-start p-4 pl-8 gap-y-4">
              <EventOptionsContainer />
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
