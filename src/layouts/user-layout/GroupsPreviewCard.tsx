import { IoPerson } from "react-icons/io5";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";
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

interface GroupsPreviewCardProps {
  group: Group;
}

const GroupsPreviewCard: React.FC<GroupsPreviewCardProps> = ({ group }) => {
  const { id, name, image, description, members } = group;

  const handleGroupClick = useHandleGroupClick();

  let filteredDesc = description[0];
  filteredDesc = filteredDesc.replaceAll("**", "");
  return (
    <div
      className="w-[100%] h-[5.8rem] xl-screen:h-[7rem] flex items-center rounded-lg cursor-pointer"
      onClick={() => handleGroupClick(id)}
    >
      <img src={image} alt="" className="w-[34%] h-[84%] ml-2 rounded-lg" />
      <div className="w-[66%] h-[100%] p-2 pl-4 flex flex-col">
        <h3 className="text-[13px] xl-screen:text-[15px] text-textPrimary font-bold">
          {name}
        </h3>
        <p className="text-[9px] xl-screen:text-[12px] text-primary font-medium mt-1">
          {filteredDesc}
        </p>
        <div className="flex items-center mt-auto mb-1">
          <IoPerson className="text-secondary text-[12px] xl-screen:text-[13px] " />
          <p className="ml-2 text-[8px] xl-screen:text-[10px]  font-semibold text-[#2C3E50]">
            {members.length} Members
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupsPreviewCard;
