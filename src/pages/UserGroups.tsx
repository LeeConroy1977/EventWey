import { useSearchParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";
import HomeGroupsCard from "../components/HomeGroupsCard";
import useHandleGroupClick from "../hooks/useHandleGroupClick";

const UserGroups = () => {
  const { user, userGroups, loading, error, getUserGroups } = useUser();
  const [searchParams] = useSearchParams();
  const handleGroupClick = useHandleGroupClick();
  const category = searchParams.get("category");

  const sortBy = searchParams.get("sortBy");

  console.log("Search Params:", category, sortBy);

  useEffect(() => {
    const params = {
      category,
      sortBy,
    };
    getUserGroups(params);
  }, [category, sortBy]);

  return (
    <div className="w-full min-h-screen bg-bgSecondary">
      {userGroups &&
        userGroups.length > 0 &&
        userGroups.map((group) => {
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

export default UserGroups;
