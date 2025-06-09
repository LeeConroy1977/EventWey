import React, { useEffect } from "react";
import { useNotifications } from "../../contexts/NotificationsContext";
import ConnectionRequestNotification from "./ConnectionRequestNotification";
import { useConnection } from "../../contexts/ConnectionContext";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import { useUser } from "../../contexts/UserContext";
import { useConnections } from "../../contexts/ConnectionsContext";
import { ClipLoader } from "react-spinners";

const NotificationWindow: React.FC = () => {
  const { mainNotification } = useNotifications();
  const { connection, getConnectionById, loading } = useConnection();
  const { getAllConnections } = useConnections();
  const {
    user,
    getConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest,
  } = useUser();
  const handleConnectionClick = useHandleConnectionClick();

  useEffect(() => {
    if (
      user &&
      mainNotification &&
      (mainNotification.type === "connection_request" ||
        mainNotification.type === "connection_accepted")
    ) {
      getConnectionRequest(user?.id);
      getAllConnections(user?.id);
      getConnectionById(mainNotification?.senderId);
    }
  }, [mainNotification, user]);

  if (!mainNotification) return null;
  return (
    <div className="w-full h-[600px] bg-white mt-4">
      {loading ? (
        <div className="flex justify-center items-center tablet:h-[350px] desktop:h-[390px] xl-screen:h-[420px] ">
          <ClipLoader size={50} color={"#5d9b9b"} />
        </div>
      ) : (
        mainNotification.type === "connection_request" && (
          <ConnectionRequestNotification
            connection={connection}
            handleClick={handleConnectionClick}
          />
        )
      )}
    </div>
  );
};

export default NotificationWindow;
