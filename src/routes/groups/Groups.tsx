import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useGroups } from "../../contexts/GroupsContext";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import HomeGroupsCard from "./HomeGroupsCard";
import { ClipLoader } from "react-spinners";
import { useUser } from "../../contexts/UserContext";


const Home = () => {
  const { groups, fetchGroups, loading, error } = useGroups();
  const { isUserGroupMember } = useUser();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const sortBy = searchParams.get("sortBy");

  const handleGroupClick = useHandleGroupClick();

  useEffect(() => {
    const params = {
      category,
      sortBy,
    };
    // @ts-ignore
    fetchGroups(params);
  }, [category, sortBy]);

  return (
    <div className="w-full min-h-screen bg-bgSecondary mt-6 tablet:mt-0 px-6 tablet:px-0 tablet:mb-4">
      {loading && (
        <div className="flex mobile:flex-col mobile:justify-start tablet:justify-center items-center mobile:mb-auto tablet:mb-0 mobile:h-screen tablet:h-[200px] mobile:mt-16 mt-8">
          <ClipLoader size={80} color={"#5d9b9b"} />
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center mt-4">
          Something went wrong. Please try again later.
        </div>
      )}
      {!loading && !error && (!groups || groups.length === 0) && (
        <div className="text-center mt-4 text-gray-500">No groups found.</div>
      )}
      {!loading &&
        !error &&
        groups &&
        groups.length > 0 &&
        groups.map((group) => (
          <HomeGroupsCard
            // @ts-ignore
            group={group}
            key={group.id}
            handleClick={handleGroupClick}
          />
        ))}
    </div>
  );
};

export default Home;
