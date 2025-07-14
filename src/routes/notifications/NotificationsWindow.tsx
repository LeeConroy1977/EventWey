import { useEffect } from "react";
import { useNotifications } from "../../contexts/NotificationsContext";
import ConnectionRequestNotification from "./ConnectionRequestNotification";
import { useConnection } from "../../contexts/ConnectionContext";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import { useUser } from "../../contexts/UserContext";
import { useUserConnection } from "../../contexts/UserConnectionContext";

const NotificationWindow: React.FC = () => {
  const { getConnectionById } = useConnection();
  const { getAllConnections } = useUserConnection();
  const { user } = useUser();
  const { mainNotification } = useNotifications();
  const {
    userConnectionState: {
      loading: connectionLoading,
      error: connectionError,
      hasFetchedRequests,
    },
    getConnectionRequest,
  } = useUserConnection();
  const handleConnectionClick = useHandleConnectionClick();

  const mainNotificationType = mainNotification?.type;
  const notificationSenderId = mainNotification?.senderId;

  useEffect(() => {
    getAllConnections(user?.id);
    getConnectionById(String(notificationSenderId));
    getConnectionRequest(user?.id);
  }, [mainNotification]);
  console.log(mainNotification, "main notification");
  return (
    <div className="w-full h-[600px] bg-white mt-4">
      <ConnectionRequestNotification />
    </div>
  );
};

export default NotificationWindow;
