import { IoPerson } from "react-icons/io5";
import { useUser } from "../../contexts/UserContext";
import React from "react";

interface Group {
  id: string;
  name: string;
  image: string;
  groupAdmin: string[];
  description: string[];
  openAccess: boolean;
  location: Location;
  creationDate: number;
  eventsCount: number;
  members: string[];
  events: string[];
  messages: string[];
  category: string;
  approved: boolean;
}

interface EventGroupDetailProps {
  eventGroup: Group;
  handleClick: (id: string) => void;
}

const EventGroupDetail: React.FC<EventGroupDetailProps> = ({
  eventGroup,
  handleClick,
}) => {
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
      className="w-[100%] tablet:h-[10rem] desktop:h-[11rem] xl-screen:h-[13rem] flex bg-bgPrimary  rounded-lg tablet:px-6 desktop:px-8 tablet:py-4 desktop:py-5 cursor-pointer"
      onClick={() => handleClick(id)}
    >
      <img src={image} alt={name} className="w-[31%] h-[100%] rounded-lg" />
      <div className="w-[69%] h-[100%] flex flex-col pl-8 py-1">
        <div>
          <h4 className="text-textPrimary tablet:text-[15px] desktop:text-[16px] xl-screen:text-[20px] font-bold">
            {name}
          </h4>
          <p className="text-textPrimary tablet:text-[10px] desktop:text-[11px] xl-screen:text-[14px]  font-semibold mt-1">
            {openAccess ? "Public" : "Private"} Group
          </p>
          <p className="w-[70%] text-primary tablet:text-[10px] desktop:text-[12px] xl-screen:text-[14px] font-medium mt-2">
            {description && description[0]}
          </p>
        </div>
        <div className="flex items-center mt-auto">
          <IoPerson className="text-secondary tablet:text-[13px] desktop:text-[14px] xl-screen:text-[16px]" />
          <p className="ml-2 text-[10px] xl-screen:text-[12px] font-semibold text-[#2C3E50]">
            {members && members.length} Members
          </p>

          <button
            className={`tablet:w-[88px] tablet:h-[32px] desktop:w-[100px]  desktop:h-[36px]  xl-screen:w-[120px] xl-screen:h-[44px] mt-auto tablet:mb-0 desktop:mb-1 ml-auto  flex items-center justify-center tablet:text-[9px] desktop:text-[10px] xl-screen:text-[11px] font-semibold rounded-lg ${
              isMember
                ? "bg-bgPrimary border-2 border-primary text-primary"
                : "bg-secondary text-white"
            }`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventGroupDetail;
