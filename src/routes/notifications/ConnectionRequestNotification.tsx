import { useNotifications } from "../../contexts/NotificationsContext";
import { useUser } from "../../contexts/UserContext";
import { User } from "../../types/user";
import NotificationConnectionCard from "./NotificationConnectionCard";
import { useConnections } from "../../contexts/ConnectionsContext";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import { useEffect } from "react";

interface ConnectionRequestNotificationProps {
  connection: User;
  handleClick: (id: number) => void;
}

const ConnectionRequestNotification: React.FC<
  ConnectionRequestNotificationProps
> = ({ connection, handleClick }) => {
  const {
    user,
    acceptConnectionRequest,
    rejectConnectionRequest,
    userConnectionRequests,
    getConnectionRequest,
  } = useUser();

  const { mainNotification } = useNotifications();
  const { connections } = useConnections();
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

  useEffect(() => {
    if (user) {
      getConnectionRequest(user?.id);
    }
  }, [acceptConnectionRequest, rejectConnectionRequest]);

  return (
    <div className="w-full h-full p-10 flex">
      <div className="w-[50%] h-full">
        <NotificationConnectionCard
          connection={connection}
          handleClick={handleClick}
        />
      </div>
      <div className="w-[50%] h-full flex flex-col text-center ">
        <h1 className="text-[18px] font-semibold mt-10">
          {connection?.username} has sent you a connection request...
        </h1>
        <h2 className="text-[17px] font-medium mt-14">
          {isConnectionRequest ? (
            `Connect with ${connection?.username} ?`
          ) : isConnection ? (
            <span className="text-primary font-semibold">
              You are now connected with {connection?.username}
            </span>
          ) : (
            <span className="text-secondary font-semibold">
              You have rejected the connected request from{" "}
              {connection?.username}
            </span>
          )}
        </h2>
        <div className="flex flex-col items-center justify-center mt-[6rem]">
          {isConnectionRequest ? (
            <>
              <button
                onClick={() => acceptConnectionRequest(requestId)}
                className="w-[70%] py-2 xl-screen:py-3 flex justify-center items-center mt-auto mb-6 text-primary mobile:text-[8px] tablet:text-[9px] desktop:text-[14px] font-medium desktop:font-semibold border-[1px] desktop:border-2 border-primary rounded-lg bg-bgPrimary">
                Accept request
              </button>
              <button
                onClick={() => rejectConnectionRequest(requestId)}
                className="w-[70%] py-2 xl-screen:py-3 flex justify-center items-center mt-3 mb-6 text-secondary mobile:text-[8px] tablet:text-[9px] desktop:text-[14px] font-medium desktop:font-semibold border-[1px] desktop:border-2 border-secondary rounded-lg bg-bgPrimary">
                Reject request
              </button>
            </>
          ) : isConnection ? (
            <button
              onClick={() => handleConnectionClick(requestId)}
              className="w-[70%] py-2 xl-screen:py-3 flex justify-center items-center mt-auto mb-6 text-primary mobile:text-[8px] tablet:text-[9px] desktop:text-[14px] font-medium desktop:font-semibold border-[1px] desktop:border-2 border-primary rounded-lg bg-bgPrimary">
              View profile
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ConnectionRequestNotification;
