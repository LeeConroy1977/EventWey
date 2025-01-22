import HomeGroupsCard from "../groups/HomeGroupsCard";
import { useConnections } from "../../contexts/ConnectionsContext";
import { useUser } from "../../contexts/UserContext";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import { ClipLoader } from "react-spinners";

const ProfileGroups = () => {
  const { userGroups, loading, error } = useUser();
  const handleGroupClick = useHandleGroupClick();

  const groupsLength = userGroups?.length;

  return (
    <div className="w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-6 desktop:p-10 pb-10">
      <h3 className="font-bold text-textPrimary text-[1rem] xl-screen:text-[18px] mb-8">
        Your Groups (<span className="text-primary">{groupsLength}</span>)
      </h3>

      {loading ? (
        <div className="w-full flex justify-center items-center h-[100px]">
          <ClipLoader size={80} color={"#5d9b9b"} />
        </div>
      ) : error ? (
        <div className="w-full text-red-500 text-center mt-4">{error}</div>
      ) : groupsLength > 0 ? (
        <div className="flex flex-row items-start justify-start gap-3 flex-wrap">
          {userGroups.map((group) => (
            <HomeGroupsCard
              group={group}
              key={group.id}
              handleClick={handleGroupClick}
            />
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-gray-500 text-center">No groups to show...</p>
        )
      )}
    </div>
  );
};

export default ProfileGroups;
