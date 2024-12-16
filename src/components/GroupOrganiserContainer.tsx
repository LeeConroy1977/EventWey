import { useGroup } from "../contexts/GroupContext";
import useHandleConnectionClick from "../hooks/useHandleConnectionClick";

const GroupOrganiserContainer = () => {
  const { groupOrganiser } = useGroup();
  const handleConnectionClick = useHandleConnectionClick();

  const { id, profileImage, username, bio } = groupOrganiser;
  return (
    <div className="w-[100%] min-h-[160px] flex flex-col rounded-lg bg-bgPrimary p-4">
      <h3 className="text-[1rem] font-bold text-textPrimary">
        Event Organiser
      </h3>
      <div
        className="flex items-center w-full h-full mt-2 cursor-pointer "
        onClick={() => handleConnectionClick(id)}
      >
        {groupOrganiser && (
          <>
            <img src={profileImage} alt="" className="w-[60px] rounded-full" />
            <div className="w-[80%] h-[54px] ml-3 flex flex-col items-start justify-start">
              <h4 className="text-textPrimary font-semibold text-[11px]">
                {username}
              </h4>
              <p className="text-textPrimary font-medium text-[9px] mt-1">
                {bio}
              </p>
            </div>
          </>
        )}
      </div>
      <button className="w-[24%] py-1 ml-auto mt-auto flex justify-center items-center  text-primary text-[10px] font-semibold border-2 border-primary rounded-lg bg-bgPrimary">
        Message
      </button>
    </div>
  );
};

export default GroupOrganiserContainer;
