import { IoPerson } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useUser } from "../../contexts/UserContext";
import Button from "../../reuseable-components/Button";

const EventGroupDetail = ({ eventGroup, handleClick }) => {
  const { user } = useUser();
  const { id, name, image, description, members, openAccess } =
    eventGroup || {};

  const isMember = user?.groups?.includes(id);
  const buttonText = isMember
    ? "Member"
    : openAccess
    ? "Join Group"
    : "Request Access";

  return (
    <div
      className="w-[100%] h-[11rem] flex bg-bgPrimary  rounded-lg px-8 py-5 cursor-pointer"
      onClick={() => handleClick(id)}
    >
      <img src={image} alt={name} className="w-[31%] h-[100%] rounded-lg" />
      <div className="w-[69%] h-[100%] flex flex-col pl-8 py-1">
        <div>
          <h4 className="text-textPrimary text-[16px] font-bold">{name}</h4>
          <p className="text-textPrimary text-[11px] font-semibold mt-1">
            {openAccess ? "Public" : "Private"} Group
          </p>
          <p className="w-[70%] text-primary text-[12px] font-medium mt-2">
            {description && description[0]}
          </p>
        </div>
        <div className="flex items-center mt-auto">
          <IoPerson className="text-secondary text-[14px]" />
          <p className="ml-2 text-[10px] font-semibold text-[#2C3E50]">
            {members && members.length} Members
          </p>
          <FaUserFriends className="text-primary text-[15px] ml-6" />
          <p className="ml-2 text-[10px] font-semibold text-[#2C3E50]">
            {members && members.length} Connections
          </p>
          <Button
            px="px-4"
            py="py-2"
            bgColour={isMember ? "bg-bgPrimary" : "bg-[#5D9B9B]"}
            textColour={isMember ? "text-primary" : "text-white"}
            fontSize="text-[10px]"
            fontWeight="font-semibold"
            borderWidth={isMember ? "border-[2px]" : ""}
            borderColour={isMember ? "border-primary" : ""}
            ml="ml-auto"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventGroupDetail;
