import HomeGroupsCard from "../../components/HomeGroupsCard";
import { useConnection } from "../../contexts/ConnectionContext";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";

const ConnectionGroups = () => {
  const { connection, connectionGroups } = useConnection();
  const handleGroupClick = useHandleGroupClick();

  const groupsLength = connectionGroups?.length;

  const firstName = connection?.username.split(" ")[0];
  return (
    <div className="w-full min-h-screen bg-bgSecondary">
      {connectionGroups &&
        connectionGroups.length > 0 &&
        connectionGroups.map((group) => {
          return (
            <HomeGroupsCard
              group={group}
              key={group.id}
              handleClick={handleGroupClick}
            />
          );
        })}
    </div>
  );
};

export default ConnectionGroups;
