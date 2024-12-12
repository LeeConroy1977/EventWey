import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvent } from "../contexts/EventContext";
import EventGroupDetail from "../components/EventGroupDetail";
import EventDetail from "../components/EventDetail";
import EventWrapper from "../components/EventWrapper";
import EventTags from "../components/EventTags";
import EventConnectionsContainer from "../components/EventConnectionsContainer";
import EventOptionsContainer from "../components/EventOptionsContainer";
import EventLocation from "../components/EventMapContainer";
import EventMapContainer from "../components/EventMapContainer";
import useHandleGroupClick from "../hooks/useHandleGroupClick";

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
      getEventById(Number(id));
      getGroupById(Number(id));
      getEventConnections(Number(id));
    }
  }, [id, getEventById, getGroupById, getEventConnections]);

  return (
    <div className="w-[100%] h-[100%] flex flex-col items-center justify-start bg-bgSecondary ">
      {event && (
        <>
          <EventWrapper event={event} />
          <main className="w-[66%] min-h-screen flex items-center justify-center bg-bgSecondary p-4 ">
            <section className="flex flex-col justify-start items-start w-[62%] h-[100%] p-4">
              {/* <img src={image} alt="" className="w-[100%] h-[24rem] rounded-lg" /> */}
              <EventGroupDetail
                eventGroup={eventGroup}
                handleClick={handleGroupClick}
              />
              <EventDetail description={description} />
            </section>
            <section className="w-[38%] h-[100%] flex flex-col items-center justify-start p-4 pl-8">
              <EventOptionsContainer />
              <EventMapContainer lat={lat} lng={lng} placename={placename} />
              {/* <EventTags tags={tags} /> */}
              <EventConnectionsContainer eventConnections={eventConnections} />
            </section>
          </main>
        </>
      )}
    </div>
  );
};

export default Event;
