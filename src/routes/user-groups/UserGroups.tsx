import { useSearchParams } from "react-router-dom";

import { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import HomeGroupsCard from "../groups/HomeGroupsCard";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { ClipLoader } from "react-spinners";

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
    <div className="w-full min-h-screen bg-bgSecondary px-6 desktop:px-0 pb-6">
      {isMobile && (
        <h2 className="text-[14px] font-bold text-textPrimary mb-4 mr-auto mt-4">
          Your groups (
          <span className="text-primary">{userGroups?.length || 0}</span>)
        </h2>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <ClipLoader size={80} color={"#5d9b9b"} />
        </div>
      ) : error ? (
        <div className="w-full text-red-500 text-center mt-4">{error}</div>
      ) : userGroups?.length > 0 ? (
        <div className="w-full flex flex-wrap gap-4">
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
          <div className="w-full text-gray-500 text-center mt-4">
            No groups found.
          </div>
        )
      )}
    </div>
  );
};

export default UserGroups;
