import { useNotifications } from "../../contexts/NotificationsContext";
import { useUser } from "../../contexts/UserContext";
import NotificationConnectionCard from "./NotificationConnectionCard";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import { useEffect } from "react";
import { useUserConnection } from "../../contexts/UserConnectionContext";
import { ClipLoader } from "react-spinners";
import { useConnection } from "../../contexts/ConnectionContext";

interface ConnectionRequestNotificationProps {
  handleClick: (id: number) => void;
}

const ConnectionRequestNotification: React.FC<
  ConnectionRequestNotificationProps
> = ({ handleClick }) => {
  const { user } = useUser();

  const {
    userConnectionState: {
      loading: connectionLoading,
      error: connectionError,
      userConnectionRequests,
      connections,
    },
    acceptConnectionRequest,
    rejectConnectionRequest,
    getConnectionRequest,
  } = useUserConnection();
  const { connection, loading } = useConnection();

  const { mainNotification } = useNotifications();
  const handleConnectionClick = useHandleConnectionClick();
  const requester =
    userConnectionRequests && mainNotification
      ? userConnectionRequests?.filter(
          (request) => request.requester === mainNotification.senderId
        )
      : [];
  const isConnectionRequest =
    userConnectionRequests && mainNotification
      ? userConnectionRequests?.some(
          (request) => request.requester === mainNotification.senderId
        )
      : false;
  const isConnection =
    connections && mainNotification
      ? connections?.some(
          (connection) => connection.id === mainNotification.senderId
        )
      : false;
  const request = requester[0];
  const requestId = request?.id;

  const senderId = mainNotification?.senderId;

  useEffect(() => {
    if (user) {
      getConnectionRequest(user?.id);
    }
  }, [mainNotification, connection, isConnection]);

  return (
    <div className="w-full h-full p-10 flex">
      <div className="w-[50%] h-full">
        <NotificationConnectionCard
          connection={connection}
          handleClick={handleClick}
        />
      </div>
      <div className="w-[50%] h-full flex flex-col text-center ">
        {loading && (
          <div className="flex justify-center items-center tablet:h-[350px] desktop:h-[390px] xl-screen:h-[420px] ">
            <ClipLoader size={50} color={"#5d9b9b"} />
          </div>
        )}
        {!loading && connection && mainNotification && (
          <>
            <h1 className="text-[18px] font-semibold mt-10">
              {mainNotification.message}
            </h1>

            <div className="flex flex-col items-center justify-center mt-[6rem]">
              <button
                onClick={() => handleConnectionClick(senderId)}
                className="w-[70%] py-2 xl-screen:py-3 flex justify-center items-center mt-auto mb-6 text-primary mobile:text-[8px] tablet:text-[9px] desktop:text-[14px] font-medium desktop:font-semibold border-[1px] desktop:border-2 border-primary rounded-lg bg-bgPrimary">
                View profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectionRequestNotification;
