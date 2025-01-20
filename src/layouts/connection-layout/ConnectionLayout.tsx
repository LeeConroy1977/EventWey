import { Outlet, useParams } from "react-router-dom";
import ConnectionNavBar from "./ConnectionNavBar";
import ConnectionWrapper from "./ConnectionWrapper";
import { useEffect, useState } from "react";
import { useConnection } from "../../contexts/ConnectionContext";
import ConnectionBio from "./ConnectionBio";
import ConnectionAboutMe from "./ConnectionAboutMe";
import ConnectionTags from "./ConnectionTags";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import HomeEventsCard from "../../routes/events/HomeEventsCard";
import HomeGroupsCard from "../../routes/groups/HomeGroupsCard";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import { CiSettings } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";
import HomeConnectionCard from "../../routes/group-members/HomeConnectionCard";

const ConnectionLayout = () => {
  const { id } = useParams();
  const { isMobile } = useScreenWidth();
  const handleEventClick = useHandleEventClick();
  const handleGroupClick = useHandleGroupClick();
  const handleConnectionClick = useHandleConnectionClick();

  const [openSection, setOpenSection] = useState(null);
  const {
    connection,
    getConnectionById,
    getConnectionConnections,
    getConnectionEvents,
    getConnectionGroups,
    connectionEvents,
    connectionGroups,
    connectionConnections,
  } = useConnection();

  useEffect(() => {
    getConnectionById(id);
    getConnectionConnections(id);
    getConnectionEvents(id);
    getConnectionGroups(id);
  }, [id]);

  const toggleSection = (sectionKey) => {
    setOpenSection((prev) => (prev === sectionKey ? null : sectionKey));
  };

  const accordionData = [
    {
      title: `Your Upcoming Events (${connectionEvents?.length || 0})`,
      content: connectionEvents?.map((event, i) => (
        <HomeEventsCard event={event} key={i} handleClick={handleEventClick} />
      )),
      sectionKey: "events",
    },
    {
      title: `Your Groups (${connection?.groups?.length || 0})`,
      content: connectionGroups?.map((group, i) => (
        <HomeGroupsCard
          group={group}
          key={group.id}
          handleClick={handleGroupClick}
        />
      )),
      sectionKey: "groups",
    },
    {
      title: `Your Connections (${connectionConnections?.length || 0})`,
      content: connectionConnections?.map((connection, i) => (
        <HomeConnectionCard
          connection={connection}
          key={connection.id}
          handleClick={handleConnectionClick}
        />
      )),
      sectionKey: "connections",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-bgSecondary">
      <ConnectionWrapper />
      <main className="w-full tablet:w-[94%] desktop:w-[66%] min-h-screen flex items-start justify-center mobile:bg-bgPrimary tablet:bg-bgSecondary">
        {!isMobile && (
          <>
            <section className="relative tablet:w-[34%] desktop:w-[34%] flex flex-col items-center justify-start  ">
              <img
                src={connection?.profileImage}
                alt=""
                className="absolute top-[-5.8rem] left-[7rem] rounded-full w-[200px] h-[200px] border-[10px] border-white"
              />

              <ConnectionBio connection={connection} />
              <ConnectionAboutMe connection={connection} />
              <ConnectionTags connection={connection} />
            </section>
            <section className="flex flex-col justify-start items-start tablet:w-[66%] desktop:w-[66%] pl-6 ">
              <div className="w-full h-[4rem] flex justify-between items-center px-4 mt-[2.5rem]">
                <h1 className="font-semibold text-[26px]">
                  {connection?.username}
                </h1>
                <button className=" py-3 px-12 flex justify-center items-center mt-auto mb-3 text-primary text-[14px] font-semibold border-2 border-primary rounded-lg bg-bgPrimary">
                  Connect
                </button>
              </div>
              <ConnectionNavBar />
              <Outlet />
            </section>
          </>
        )}
        {isMobile && (
          <section className="flex flex-col w-full mb-6 p-6">
            <div className="relative w-full flex items-center">
              <img
                src={connection?.profileImage}
                alt="Profile"
                className="absolute top-[-90px] rounded-full w-[140px] h-[140px] border-[6px] border-white"
              />
              <p className="font-semibold text-[14px] ml-[150px] mr-auto">
                {connection?.username}
              </p>
              <button className=" py-2 px-5 flex justify-center items-center  text-primary text-[9.5px] font-semibold border-2 border-primary rounded-lg bg-bgPrimary">
                Connect
              </button>
            </div>
            <ConnectionBio connection={connection} />
            <ConnectionAboutMe connection={connection} />

            {accordionData.map(({ title, content, sectionKey }) => (
              <div key={sectionKey} className="mt-6 w-full flex flex-col">
                <div
                  className="w-full h-[50px] flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection(sectionKey)}
                >
                  <h2 className="font-bold text-textPrimary mobile:text-[14px]">
                    {title}
                  </h2>
                  <FaCaretDown
                    className={`text-[22px] text-primary mr-4 transition-transform duration-300 ${
                      openSection === sectionKey ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {openSection === sectionKey && (
                  <div className="flex flex-row flex-wrap gap-2 mt-4">
                    {content}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default ConnectionLayout;
