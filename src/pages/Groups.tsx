import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useGroups } from "../contexts/GroupsContext";
import HomeGroupsCard from "../components/HomeGroupsCard";
import useHandleGroupClick from "../hooks/useHandleGroupClick";

const Home = () => {
  const { groups, setGroups, fetchGroups } = useGroups();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const sortBy = searchParams.get("sortBy");

  const handleGroupClick = useHandleGroupClick();

  useEffect(() => {
    const params = {
      category,
      sortBy,
    };
    fetchGroups(params);
  }, [category, sortBy]);

  return (
    <div className="w-full min-h-screen bg-bgSecondary">
      {groups &&
        groups.length > 0 &&
        groups.map((group) => {
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

export default Home;
