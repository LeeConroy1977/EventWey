import HomeGroupsCard from "../groups/HomeGroupsCard";
import { useConnection } from "../../contexts/ConnectionContext";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";

const ConnectionGroups = () => {
  const { connection, connectionGroups } = useConnection();
  const handleGroupClick = useHandleGroupClick();

  const groupsLength = connectionGroups?.length;

  const firstName = connection?.username.split(" ")[0];
  return (
    <div className="w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-10 pb-10">
      {connectionGroups && (
        <>
          <h3 className="font-bold text-textPrimary text-[1rem] mb-8">
            {`${firstName}'s Groups`} (
            <span className="text-primary">{groupsLength || 0}</span>)
          </h3>
          <div className="flex flex-row items-start justify-start gap-3 flex-wrap ">
            {connectionGroups?.length > 0 ? (
              connectionGroups?.map((group, i) => {
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

export default ConnectionGroups;
