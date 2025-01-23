import { Outlet } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import ProfileWrapper from "./ProfileWrapper";
import ProfileBio from "./ProfileBio";
import ProfileAboutMe from "./ProfileAboutMe";
import ProfileNavBar from "./ProfileNavBar";
import { useConnections } from "../../contexts/ConnectionsContext";
import { useEffect, useState } from "react";
import ProfileTags from "./ProfileTags";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { CiSettings } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";
import HomeEventsCard from "../../routes/events/HomeEventsCard";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import HomeGroupsCard from "../../routes/groups/HomeGroupsCard";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import HomeConnectionCard from "../../routes/group-members/HomeConnectionCard";

const ProfileLayout = () => {
  const { user, getUserEvents, getUserGroups, userEvents, userGroups } =
    useUser();
  const { isMobile } = useScreenWidth();
  const { getAllConnections, filteredConnections } = useConnections();
  const handleEventClick = useHandleEventClick();
  const handleGroupClick = useHandleGroupClick();
  const handleConnectionClick = useHandleConnectionClick();

  // State for tracking the currently open accordion section
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    getUserEvents({});
    getAllConnections();
    getUserGroups({});
  }, []);

  const toggleSection = (sectionKey: any) => {
    setOpenSection((prev) => (prev === sectionKey ? null : sectionKey));
  };

  const accordionData = [
    {
      title: `Your Upcoming Events (${userEvents?.length || 0})`,
      content: userEvents?.map((event, i) => (
        // @ts-ignore
        <HomeEventsCard event={event} key={i} handleClick={handleEventClick} />
      )),
      sectionKey: "events",
    },
    {
      title: `Your Groups (${user?.groups?.length || 0})`,
      content: userGroups?.map((group) => (
        <HomeGroupsCard
          // @ts-ignore
          group={group}
          key={group.id}
          handleClick={handleGroupClick}
        />
      )),
      sectionKey: "groups",
    },
    {
      title: `Your Connections (${filteredConnections?.length || 0})`,
      content: filteredConnections?.map((connection) => (
        <HomeConnectionCard
          // @ts-ignore
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
      {user && <ProfileWrapper user={user} />}

      <main className="w-full tablet:w-[94%] desktop:w-[66%] min-h-screen flex items-start justify-center mobile:bg-bgPrimary tablet:bg-bgSecondary">
        {!isMobile && (
          <>
            <section className="relative tablet:w-[34%] desktop:w-[34%] flex flex-col items-center justify-start  ">
              <img
                src={user?.profileImage}
                alt="Profile"
                className="absolute top-[-5.8rem] left-[7rem] rounded-full w-[200px] h-[200px] border-[10px] border-white"
              />
              {user && <ProfileBio user={user} />}
              {user && <ProfileAboutMe user={user} />}
              {user && <ProfileTags user={user} />}
            </section>
            <section className="flex flex-col justify-start items-start tablet:w-[66%] desktop:w-[66%] pl-6 ">
              <div className="w-full h-[4rem] flex justify-between items-center px-4 mt-[2.5rem]">
                <h1 className="font-semibold text-[26px]">{user?.username}</h1>
              </div>
              <ProfileNavBar />
              <Outlet />
            </section>
          </>
        )}

        {isMobile && (
          <section className="flex flex-col w-full mb-6 p-6">
            <div className="relative w-full flex items-center">
              <img
                src={user?.profileImage}
                alt="Profile"
                className="absolute top-[-90px] rounded-full w-[140px] h-[140px] border-[6px] border-white"
              />
              <p className="font-semibold text-[14px] ml-[150px] mr-auto">
                {user?.username}
              </p>
              <CiSettings className="text-[21px] text-textPrimary ml-auto cursor-pointer" />
            </div>
            {user && <ProfileBio user={user} />}
            {user && <ProfileAboutMe user={user} />}

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

export default ProfileLayout;
