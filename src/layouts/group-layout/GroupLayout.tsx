import { Outlet, useParams } from "react-router-dom";
import GroupNav from "./GroupNav";
import { useGroup } from "../../contexts/GroupContext";
import { useEffect } from "react";
import GroupOrganiserContainer from "./GroupOrganiserContainer";
import EventMapContainer from "../../components/EventMapContainer";
import GroupWrapper from "./GroupWrapper";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const GroupLayout = () => {
  const { id } = useParams();
  const { isMobile } = useScreenWidth();
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
          <main className="w-full m-h-screen tablet:w-[94%]  desktop:w-[66%] desktop:h-auto flex flex-col tablet:flex-row items-start justify-center bg-bgPrimary tablet:bg-bgSecondary px-6 mt-0 tablet:mt-0 tablet:px-0 tablet:p-4 pb-[5rem] ">
            <section className="flex flex-col justify-start items-start w-full tablet:w-[62%] h-auto p-0 tablet:p-4">
              <GroupNav id={id} />
              <Outlet />
            </section>
            {!isMobile && (
              <section className="w-full tablet:w-[38%] h-auto flex flex-col items-center justify-start p-0 pl-0 tablet:p-0 tablet:pl-4 desktop:pl-8 gap-y-4 ">
                <GroupOrganiserContainer />
                <EventMapContainer lat={lat} lng={lng} placename={placename} />
              </section>
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default GroupLayout;
