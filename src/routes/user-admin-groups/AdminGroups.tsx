import { useEffect } from "react";
import { useGroups } from "../../contexts/GroupsContext";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
import HomeGroupsCard from "../groups/HomeGroupsCard";
import { ClipLoader } from "react-spinners";

const AdminGroups = () => {
  const { fetchReviewGroups, reviewGroups, loading, error } = useGroups();
  const handleGroupClick = useHandleGroupClick();

  useEffect(() => {
    fetchReviewGroups({});
  }, []);
  return (
    <div className="w-full min-h-screen bg-bgSecondary mt-6 tablet:mt-0 px-6 tablet:px-0 tablet:mb-4">
      {loading && (
        <div className="flex items-center justify-center min-h-[50vh]">
          <ClipLoader size={80} color={"#5d9b9b"} />
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center mt-6">
          <p>Something went wrong. Please try again later.</p>
        </div>
      )}
      {!loading &&
        !error &&
        reviewGroups &&
        reviewGroups.length > 0 &&
        reviewGroups.map((group) => (
          <HomeGroupsCard
            // @ts-ignore
            group={group}
            key={group.id}
            handleClick={handleGroupClick}
          />
        ))}
      {!loading && !error && reviewGroups && reviewGroups.length === 0 && (
        <div className="text-center text-gray-500 mt-6">
          <p>No groups available for review at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default AdminGroups;
