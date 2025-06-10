import { useEffect } from "react";
import { useGroup } from "../../contexts/GroupContext";
import useHandleConnectionClick from "../../hooks/useHandleConnectionClick";
import HomeConnectionCard from "./HomeConnectionCard";
import useIsGroupMember from "../../hooks/useIsGroupMember";

const GroupMembers = () => {
  const { group, groupMembers, getGroupById, getGroupMembers } = useGroup();
  const handleConnectionClick = useHandleConnectionClick();
  const { isMember } = useIsGroupMember(group?.id);
  const groupMembersLength = groupMembers.length;

  useEffect(() => {
    getGroupMembers(String(group?.id));
    getGroupById(String(group?.id));
  }, [isMember]);
  console.log(groupMembers);
  return (
    <div className="w-[100%]  bg-bgPrimary tablet:mt-8 desktop:mt-10 rounded-lg  tablet:p-6 desktop:p-10 tablet:pb-10 ">
      {group && (
        <>
          <h3 className="text-[14px] desktop:text-[1rem] xl-screen:text-[18px] font-bold text-textPrimary mr-auto  mt-6 tablet:mt-0.5">
            Group Members (
            <span className="text-primary">{groupMembersLength || 0}</span>)
          </h3>
          <div className="flex flex-row items-start justify-start mt-6 desktop:ml-6 xl-screen:ml-10 gap-3 xl-screen:gap-4 flex-wrap ">
            {groupMembers.length > 0 ? (
              groupMembers?.map((member, i) => {
                return (
                  <HomeConnectionCard
                    connection={member}
                    key={i}
                    handleClick={handleConnectionClick}
                  />
                );
              })
            ) : (
              <p>No Upcoming Events To Show...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GroupMembers;
