import HomeConnectionCard from "../group-members/HomeConnectionCard";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import { ClipLoader } from "react-spinners";
import { useUser } from "../../contexts/UserContext";
import { useEffect } from "react";
import { useUserConnection } from "../../contexts/UserConnectionContext";

const ProfileSentRequests = () => {
  const { user } = useUser();
  const {
    userConnectionState: {
      loading: connectionLoading,
      error: connectionError,
      userSentRequestsObjects,
    },
    getSentConnectionRequest,
  } = useUserConnection();
  const handleConnectionClick = useHandleConnectionClick();
  const requestsLength = userSentRequestsObjects?.length || 0;

  useEffect(() => {
    if (user?.id && !isNaN(Number(user.id))) {
      getSentConnectionRequest(Number(user.id));
    }
  }, [user?.id]);

  return (
    <div className="w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-6 desktop:p-10 pb-10">
      <h3 className="font-bold text-textPrimary text-[1rem] xl-screen:text-[18px] mb-8">
        Your Sent Requests (
        <span className="text-primary">{requestsLength}</span>)
      </h3>

      {connectionLoading ? (
        <div className="w-full flex justify-center items-center h-[100px]">
          <ClipLoader size={80} color={"#5d9b9b"} />
        </div>
      ) : connectionError ? (
        <div className="w-full text-red-500 text-center mt-4">
          {connectionError}
        </div>
      ) : userSentRequestsObjects?.length > 0 ? (
        <div className="flex flex-row items-start justify-start gap-3 flex-wrap">
          {userSentRequestsObjects.map((connection, index) => {
            console.log("Rendering HomeConnectionCard for:", connection);
            return (
              <HomeConnectionCard
                connection={connection}
                key={connection.id || index}
                handleClick={handleConnectionClick}
                text="Accept"
              />
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No connection requests to show...
        </p>
      )}
    </div>
  );
};

export default ProfileSentRequests;
