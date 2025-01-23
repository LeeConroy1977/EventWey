import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useEffect } from "react";
import GroupsPreviewCard from "./GroupsPreviewCard";
import { ClipLoader } from "react-spinners";

const UserGroupsPreview = () => {
  const { userTotalGroups, loading, error, getUserTotalGroups } = useUser();

  const navigate = useNavigate();

  const groupsLength = Array.isArray(userTotalGroups)
    ? userTotalGroups.length
    : 0;

  const slicedGroups = Array.isArray(userTotalGroups)
    ? userTotalGroups
        .sort((a, b) => {
          // @ts-ignore
          const dateA = new Date(a.date).getTime();
          // @ts-ignore
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        })
        .slice(0, 3)
    : [];

  useEffect(() => {
    // @ts-ignore
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
        {loading && (
          <div className="flex items-center justify-center h-[300px] mx-auto  my-auto">
            <ClipLoader size={60} color={"#5d9b9b"} />
          </div>
        )}
        {error && (
          <p className="text-red-500 text-center w-full">
            Something went wrong. Please try again later.
          </p>
        )}
        {!loading &&
          !error &&
          slicedGroups.length > 0 &&
          slicedGroups.map((group) => (
            // @ts-ignore
            <GroupsPreviewCard group={group} key={group.id} />
          ))}
        {!loading && !error && slicedGroups.length === 0 && (
          <p className="text-gray-500 text-center w-full">
            You are not part of any groups yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserGroupsPreview;
