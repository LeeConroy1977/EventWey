import HomeGroupsCard from "../groups/HomeGroupsCard";
import { useConnections } from "../../contexts/ConnectionsContext";
import { useUser } from "../../contexts/UserContext";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";

const ProfileGroups = () => {
  const { userGroups } = useUser();
  const handleGroupClick = useHandleGroupClick();

  const groupsLength = userGroups?.length;

  return (
    <div className="w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-10 pb-10">
      {userGroups && (
        <>
          <h3 className="font-bold text-textPrimary text-[1rem] xl-screen:text-[18px] mb-8">
            {`Your Groups`} (
            <span className="text-primary">{groupsLength || 0}</span>)
          </h3>
          <div className="flex flex-row items-start justify-start gap-3 flex-wrap ">
            {userGroups?.length > 0 ? (
              userGroups?.map((group, i) => {
                return (
                  <HomeGroupsCard
                    group={group}
                    key={group.id}
                    handleClick={handleGroupClick}
                  />
                );
              })
            ) : (
              <p>No groups To Show...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileGroups;
