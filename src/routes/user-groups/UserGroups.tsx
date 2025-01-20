import { useSearchParams } from "react-router-dom";

import { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import HomeGroupsCard from "../groups/HomeGroupsCard";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const UserGroups = () => {
  const { user, userGroups, loading, error, getUserGroups } = useUser();
  const { isMobile } = useScreenWidth();
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
    <div className="w-full min-h-screen bg-bgSecondary px-6 desktop:px-0 pb-6 ">
      {isMobile && (
        <h2 className="text-[14px] font-bold text-textPrimary mb-4 mr-auto mt-4">
          Your groups (
          <span className="text-primary">{userGroups?.length}</span>)
        </h2>
      )}
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
