import HomeConnectionCard from "../components/HomeConnectionCard";
import { useGroup } from "../contexts/GroupContext";
import useHandleConnectionClick from "../hooks/useHandleConnectionClick";

const GroupMembers = () => {
  const { group, groupMembers } = useGroup();
  const handleConnectionClick = useHandleConnectionClick();

  const groupMembersLength = groupMembers.length;

  console.log(groupMembers);
  return (
    <div className="w-[100%] min-[8rem] bg-bgPrimary mt-8 rounded-lg p-10 pb-10 ">
      {group && (
        <>
          <h3 className="font-bold text-textPrimary text-[1rem] mb-8">
            Group Members (
            <span className="text-primary">{groupMembersLength || 0}</span>)
          </h3>
          <div className="flex flex-row items-start justify-start gap-3 flex-wrap ">
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
