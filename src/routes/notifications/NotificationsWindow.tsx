import { useEffect } from "react";
import { useNotifications } from "../../contexts/NotificationsContext";
import ConnectionRequestNotification from "./ConnectionRequestNotification";
import { useConnection } from "../../contexts/ConnectionContext";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import { useUser } from "../../contexts/UserContext";
import { useUserConnection } from "../../contexts/UserConnectionContext";
import { ClipLoader } from "react-spinners";

const NotificationWindow: React.FC = () => {
  const { mainNotification } = useNotifications();
  const { connection, getConnectionById } = useConnection();
  const { getAllConnections } = useUserConnection();
  const { user } = useUser();
  const {
    userConnectionState: { loading: connectionLoading, error: connectionError },
    getConnectionRequest,
  } = useUserConnection();
  const handleConnectionClick = useHandleConnectionClick();

  useEffect(() => {
    if (
      user?.id &&
      !isNaN(user.id) &&
      mainNotification &&
      (mainNotification.type === "connection_request" ||
        mainNotification.type === "connection_accepted")
    ) {
      const fetchData = async () => {
        try {
          await Promise.all([
            getConnectionRequest(user.id),
            getAllConnections(user.id),
            mainNotification.senderId &&
              getConnectionById(String(mainNotification.senderId)),
          ]);
        } catch (error) {
          console.error("Error fetching notification data:", error);
        }
      };
      fetchData();
    }
  }, [mainNotification, user?.id]);

  if (!mainNotification) {
    return (
      <div className="w-full h-[600px] bg-white mt-4 flex justify-center items-center text-gray-500">
        No notifications to show...
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] bg-white mt-4">
      {connectionLoading ? (
        <div className="flex justify-center items-center tablet:h-[350px] desktop:h-[390px] xl-screen:h-[420px]">
          <ClipLoader size={50} color="#5d9b9b" />
        </div>
      ) : connectionError ? (
        <div className="w-full text-red-500 text-center mt-4">
          {connectionError}
        </div>
      ) : mainNotification.type === "connection_request" ? (
        <ConnectionRequestNotification
          connection={connection}
          handleClick={handleConnectionClick}
        />
      ) : mainNotification.type === "connection_accepted" ? (
        <div className="w-full text-center mt-4 text-primary">
          Connection accepted with {connection?.username || "user"}!
        </div>
      ) : (
        <div className="w-full text-gray-500 text-center mt-4">
          Unknown notification type
        </div>
      )}
    </div>
  );
};

export default NotificationWindow;
