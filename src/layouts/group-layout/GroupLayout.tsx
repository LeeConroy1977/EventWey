import { Outlet, useParams } from "react-router-dom";
import GroupNav from "./GroupNav";
import { useGroup } from "../../contexts/GroupContext";
import { useEffect } from "react";
import GroupOrganiserContainer from "./GroupOrganiserContainer";
import EventMapContainer from "../../components/EventMapContainer";
import GroupWrapper from "./GroupWrapper";

const GroupLayout = () => {
  const { id } = useParams();
  const {
    group,
    setGroup,
    groupEvents,
    setGroupEvents,
    groupMembers,
    setGroupMembers,
    getGroupById,
    getEventsById,
    getGroupMembers,
    location,
    error,
    loading,
  } = useGroup();

  const { lat, lng, placename } = group?.location || {};

  useEffect(() => {
    if (id) {
      getGroupById(id);
      getEventsById(id);
      getGroupMembers(id);
    }
  }, [id]);
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-bgSecondary">
      {group && (
        <>
          <GroupWrapper group={group} />
          <main className="w-[66%] min-h-screen flex items-center justify-center bg-bgSecondary ">
            <section className="flex flex-col justify-start items-start w-[66%] h-[100%] p-8 ">
              <GroupNav id={id} />
              <Outlet />
            </section>
            <section className="w-[34%] h-[100%] flex flex-col items-center justify-start p-8">
              <GroupOrganiserContainer />
              <EventMapContainer lat={lat} lng={lng} placename={placename} />
            </section>
          </main>
        </>
      )}
    </div>
  );
};

export default GroupLayout;
