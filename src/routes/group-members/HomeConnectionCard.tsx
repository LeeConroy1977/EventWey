import React from "react";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { User } from "../../types/user";
import { useUserConnection } from "../../contexts/UserConnectionContext";
import { useUser } from "../../contexts/UserContext";
import { useConnection } from "../../contexts/ConnectionContext";
import { Navigate, useNavigate } from "react-router-dom";

interface HomeConnectionCardProps {
  connection: User;
  text: string;
  handleClick: (id: string) => void;
  handleModalClose?: () => void | undefined;
}

const HomeConnectionCard: React.FC<HomeConnectionCardProps> = ({
  connection,
  handleClick,
  handleModalClose,
  text,
}) => {
  const { id, profileBackgroundImage, profileImage, username, bio } =
    connection || {};
  const { isMobile } = useScreenWidth();
  const { user } = useUser();
  const {
    userConnectionState: {
      loading: connectionLoading,
      userConnectionRequests,
      userSentRequests,
    },
    createConnectionRequest,
    getConnectionRequest,
    getSentConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest,
    deleteConnection,
    handleConnectionStatus,
    removeConnectionRequest,
  } = useUserConnection();
  const { getConnectionConnections } = useConnection();
  const navigate = useNavigate();

  const connectionStatus = handleConnectionStatus(Number(id), user?.id || 0);

  const handleConnectionRequest = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (!id || isNaN(Number(id)) || !user?.id) {
      console.error("Invalid recipientId or userId:", id, user?.id);
      return;
    }
    const recipientId = Number(id);
    try {
      const currentStatus = handleConnectionStatus(recipientId, user.id);

      if (currentStatus === "unconnected") {
        await createConnectionRequest(recipientId, user.id);
        await getSentConnectionRequest(user.id);
      } else if (currentStatus === "connection") {
        navigate("/user/messages");
      } else if (currentStatus === "recieved_pending") {
        await acceptConnectionRequest(recipientId, user.id);
        await Promise.all([
          getConnectionConnections(String(user.id)),
          getConnectionRequest(user.id),
        ]);
      }
    } catch (error) {
      console.error("Failed to handle connection request:", error);
    }
  };

  const handleActionButton = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (!id || isNaN(Number(id)) || !user?.id) {
      console.error("Invalid recipientId or userId:", id, user?.id);
      return;
    }
    const recipientId = Number(id);
    try {
      const currentStatus = handleConnectionStatus(recipientId, user.id);
      if (currentStatus === "recieved_pending") {
        await rejectConnectionRequest(recipientId, user.id);
        await Promise.all([
          getConnectionConnections(String(user.id)),
          getSentConnectionRequest(user.id),
          getConnectionRequest(user.id),
        ]);
      } else if (currentStatus === "sent_pending") {
        await removeConnectionRequest(user.id, recipientId);
        await Promise.all([
          getConnectionConnections(String(user.id)),
          getSentConnectionRequest(user.id),
          getConnectionRequest(user.id),
        ]);
      }
    } catch (error) {
      console.error("Failed to handle connection request:", error);
    }
  };

  return (
    <div
      onClick={() => {
        handleClick(String(id));
        handleModalClose?.();
      }}
      className="w-[100px] h-[200px] tablet:w-[23%] desktop:w-[22%] tablet:h-[220px] desktop:h-[260px] xl-screen:h-[290px] pb-4 bg-bgPrimary rounded-lg flex flex-col items-center justify-start cursor-pointer mt-1 border-[1px] border-gray-200 ">
      <div
        className="relative w-[100%] h-[30%] desktop:h-[28%]  flex items-center justify-center
      ">
        <img
          className="w-[100%] h-[100%] rounded-tl-lg rounded-tr-lg"
          src={profileBackgroundImage}
          alt=""
        />
        <img
          className="absolute top-6 tablet:top-8 xl-screen:top-9 w-[60px] h-[60px] desktop:w-[75px] desktop:h-[75px] xl-screen:w-[80px] xl-screen:h-[80px] rounded-full border-2 border-textPrimary"
          src={profileImage}
          alt=""
        />
      </div>
      <p className="mt-10 text-[12px] desktop:mt-11 desktop:text-[15px] font-semibold text-textPrimary">
        {username}
      </p>
      <div className="flex flex-col justify-end items-center gap-3 w-full h-[40%]  mt-auto">
        {connectionStatus !== "sent_pending" && (
          <button
            onClick={handleConnectionRequest}
            className=" 
             bg-bgPrimary text-primary w-[84%] h-[30px]  flex justify-center items-center  text-[11px] font-semibold border-2 border-primary rounded-lg"
            disabled={connectionStatus === "sent_pending"}>
            {connectionStatus === "connection"
              ? "Message"
              : connectionStatus === "recieved_pending"
              ? "Accept Request"
              : connectionStatus === "unconnected"
              ? "Connect"
              : null}
          </button>
        )}
        {connectionStatus !== "connection" && (
          <button
            onClick={handleActionButton}
            className="w-[84%] h-[30px]  flex justify-center items-center  text-secondary text-[11px] font-semibold border-2 border-secondary rounded-lg bg-bgPrimary">
            {connectionStatus === "recieved_pending"
              ? "Reject Request"
              : connectionStatus === "sent_pending"
              ? "Cancel Request"
              : null}
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeConnectionCard;
