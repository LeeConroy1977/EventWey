import { Outlet, useNavigate, useParams } from "react-router-dom";
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
import { FaCaretDown } from "react-icons/fa";
import HomeConnectionCard from "../../routes/group-members/HomeConnectionCard";
import { useUser } from "../../contexts/UserContext";
import { useUserConnection } from "../../contexts/UserConnectionContext";

const moreOptionsArr = [
  { title: "Invite", value: "invite" },
  { title: "Remove", value: "remove" },
];

const ConnectionLayout = () => {
  const { id } = useParams();
  const { user } = useUser();
  const {
    userConnectionState: { error },
    createConnectionRequest,
    getConnectionRequest,
    getSentConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest,
    deleteConnection,
    handleConnectionStatus,
    removeConnectionRequest,
  } = useUserConnection();
  const { isMobile } = useScreenWidth();
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
  const handleEventClick = useHandleEventClick();
  const handleGroupClick = useHandleGroupClick();
  const handleConnectionClick = useHandleConnectionClick();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isOptionsOpen, setIsOptionOpen] = useState<boolean>(false);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (id && !isNaN(Number(id)) && user?.id) {
      const fetchData = async () => {
        try {
          await Promise.all([
            getConnectionById(id),
            getConnectionConnections(id),
            getConnectionEvents(id),
            getConnectionGroups(id),
            getConnectionRequest(user.id),
            getSentConnectionRequest(user.id),
          ]);
        } catch (error) {
          console.error("Error fetching connection data:", error);
        }
      };
      fetchData();
    }
  }, [id, user?.id]);

  const toggleSection = (sectionKey: string) => {
    setOpenSection((prev) => (prev === sectionKey ? null : sectionKey));
  };

  async function handleOptionClick(option) {
    if (option.value === "remove") {
      if (!id || isNaN(Number(id)) || !user?.id) {
        console.error("Invalid recipientId or userId:", id, user?.id);
        return;
      }
      const recipientId = Number(id);
      setLocalLoading(true);
      try {
        await deleteConnection(recipientId, user.id);
        await getConnectionConnections(String(user.id));
      } catch (error) {
        console.error("Failed to handle action button:", error);
      } finally {
        setLocalLoading(false);
      }
    }
  }

  const handleConnectionRequest = async () => {
    if (!id || isNaN(Number(id)) || !user?.id) {
      console.error("Invalid recipientId or userId:", id, user?.id);
      return;
    }
    const recipientId = Number(id);
    setLocalLoading(true);
    try {
      const currentStatus = handleConnectionStatus(recipientId, user.id);
      if (currentStatus === "unconnected") {
        await createConnectionRequest(recipientId, user.id);
      } else if (currentStatus === "connection") {
        navigate("/user/messages");
      } else if (currentStatus === "recieved_pending") {
        await acceptConnectionRequest(recipientId, user.id);
        await getConnectionConnections(String(user.id));
      }
    } catch (error) {
      console.error("Failed to handle connection request:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleActionButton = async () => {
    if (!id || isNaN(Number(id)) || !user?.id) {
      console.error("Invalid recipientId or userId:", id, user?.id);
      return;
    }
    const recipientId = Number(id);
    setLocalLoading(true);
    try {
      const currentStatus = handleConnectionStatus(recipientId, user.id);
      if (currentStatus === "connection") {
        await deleteConnection(recipientId, user.id);
        await getConnectionConnections(String(user.id));
      } else if (currentStatus === "recieved_pending") {
        await rejectConnectionRequest(recipientId, user.id);
      } else if (currentStatus === "sent_pending") {
        await removeConnectionRequest(user.id, recipientId);
      }
    } catch (error) {
      console.error("Failed to handle action button:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const connectionStatus = handleConnectionStatus(Number(id), user?.id || 0);

  const accordionData = [
    {
      title: `Your Upcoming Events (${connectionEvents?.length || 0})`,
      content: connectionEvents?.map((event, i) => (
        <HomeEventsCard event={event} key={i} handleClick={handleEventClick} />
      )),
      sectionKey: "events",
    },
    {
      title: `Your Groups (${connectionGroups?.length || 0})`,
      content: connectionGroups?.map((group) => (
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
      content: connectionConnections?.map((connection) => (
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
            <section className="relative tablet:w-[34%] desktop:w-[34%] flex flex-col items-center justify-start">
              <img
                src={connection?.profileImage}
                alt=""
                className="absolute top-[-5.8rem] left-[7rem] rounded-full w-[200px] h-[200px] border-[10px] border-white"
              />
              <ConnectionBio connection={connection} />
              <ConnectionAboutMe connection={connection} />
              <ConnectionTags connection={connection} />
            </section>
            <section className="flex flex-col justify-start items-start tablet:w-[66%] desktop:w-[66%] pl-6">
              <div className="w-full h-[4rem] flex justify-between items-center px-4 mt-[2.5rem]">
                <h1 className="font-semibold text-[26px]">
                  {connection?.username}
                </h1>
                <div className="ml-auto flex flex-row items-center ">
                  {connectionStatus === "connection" && (
                    <div className="flex flex-col relative mr-6">
                      <div
                        className={`${
                          isOptionsOpen
                            ? "rounded-tl-lg rounded-tr-lg"
                            : "rounded-lg"
                        } w-[160px] h-[50px] flex flex-row justify-center items-center mt-auto text-primary text-[14px] font-semibold border-2 border-primary bg-bgPrimary`}
                        role="button"
                        aria-expanded={isOptionsOpen}
                        aria-label="More options"
                        onClick={() => setIsOptionOpen(!isOptionsOpen)}>
                        <p>More</p>
                      </div>
                      {isOptionsOpen && (
                        <div className="absolute top-[50px]">
                          {moreOptionsArr.map((option, i) => (
                            <div
                              key={i}
                              className="w-[160px] h-[50px]  flex justify-center items-center text-primary text-[14px] font-semibold border-2 border-t-0 border-primary bg-bgPrimary hover:bg-gray-100 "
                              role="button"
                              aria-label={option.title}
                              onClick={() => handleOptionClick(option)}>
                              {option.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {connectionStatus === "recieved_pending" ||
                    (connectionStatus === "sent_pending" && (
                      <button
                        onClick={handleActionButton}
                        className="flex justify-center items-center mt-auto text-secondary text-[14px] font-semibold border-2 border-secondary rounded-lg bg-bgPrimary py-3 px-12 mr-6"
                        disabled={localLoading}>
                        {connectionStatus === "recieved_pending"
                          ? "Reject Request"
                          : "Cancel Request"}
                      </button>
                    ))}
                  <button
                    onClick={handleConnectionRequest}
                    className={`flex justify-center items-center mt-auto text-[14px] font-semibold border-2 border-primary rounded-lg py-3 px-12 ${
                      connectionStatus === "connection"
                        ? "bg-primary text-white"
                        : "bg-bgPrimary text-primary"
                    }`}
                    disabled={
                      localLoading || connectionStatus === "sent_pending"
                    }>
                    {connectionStatus === "connection"
                      ? "Message"
                      : connectionStatus === "recieved_pending"
                      ? "Accept Request"
                      : connectionStatus === "sent_pending"
                      ? "Request Pending"
                      : "Connect"}
                  </button>
                </div>
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2 px-4">{error}</p>
              )}
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
              <div className="flex flex-row items-center">
                <button
                  onClick={handleConnectionRequest}
                  className="py-2 px-5 flex justify-center items-center text-primary text-[9.5px] font-semibold border-2 border-primary rounded-lg bg-bgPrimary"
                  disabled={
                    localLoading || connectionStatus === "sent_pending"
                  }>
                  {connectionStatus === "connection"
                    ? "Unconnect"
                    : connectionStatus === "recieved_pending"
                    ? "Accept Request"
                    : connectionStatus === "sent_pending"
                    ? "Pending"
                    : "Connect"}
                </button>
                {connectionStatus === "recieved_pending" && (
                  <button
                    onClick={handleActionButton}
                    className="ml-2 py-2 px-5 flex justify-center items-center text-secondary text-[9.5px] font-semibold border-2 border-secondary rounded-lg bg-white"
                    disabled={localLoading}>
                    Reject Request
                  </button>
                )}
                {connectionStatus === "sent_pending" && (
                  <button
                    onClick={handleActionButton}
                    className="ml-2 py-2 px-5 flex justify-center items-center text-secondary text-[9.5px] font-semibold border-2 border-secondary rounded-lg bg-white"
                    disabled={localLoading}>
                    Cancel Request
                  </button>
                )}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <ConnectionBio connection={connection} />
            <ConnectionAboutMe connection={connection} />
            {accordionData.map(({ title, content, sectionKey }) => (
              <div key={sectionKey} className="mt-6 w-full flex flex-col">
                <div
                  className="w-full h-[50px] flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection(sectionKey)}>
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
