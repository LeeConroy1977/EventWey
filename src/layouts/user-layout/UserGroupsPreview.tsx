import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useEffect } from "react";
import GroupsPreviewCard from "./GroupsPreviewCard";

const UserGroupsPreview = () => {
  const {
    userTotalGroups,
    loading,
    error,
    getUserGroups,
    userGroups,
    getUserTotalGroups,
  } = useUser();

  const navigate = useNavigate();

  const groupsLength = Array.isArray(userTotalGroups)
    ? userTotalGroups.length
    : 0;

  const slicedGroups = Array.isArray(userTotalGroups)
    ? userTotalGroups
        .sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        })
        .slice(0, 3)
    : [];

  useEffect(() => {
    getUserTotalGroups();
  }, []);

  function handleNavigation() {
    navigate("/user/my-groups");
  }
  return (
    <div className="w-[100%] min-h-[380px] flex flex-col rounded-lg bg-white p-4 mt-4 xl-screen:p-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textPrimary tablet:text-[14px] desktop:text-[16px] xl-screen:text-[18px]">
          Your groups (<span className="text-primary">{groupsLength || 0}</span>
          )
        </h3>
        <p
          className="text-[12px] xl-screen:text-[14px] font-semibold text-primary cursor-pointer"
          onClick={handleNavigation}
        >
          Show all
        </p>
      </div>
      <div className="mt-4 space-y-4">
        {slicedGroups.length > 0 ? (
          slicedGroups.map((group) => (
            <GroupsPreviewCard group={group} key={group.id} />
          ))
        ) : (
          <p>No upcoming events</p>
        )}
      </div>
    </div>
  );
};

export default UserGroupsPreview;
