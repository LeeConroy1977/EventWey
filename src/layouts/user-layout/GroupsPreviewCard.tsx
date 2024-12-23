import { IoPerson } from "react-icons/io5";
import useHandleGroupClick from "../../hooks/useHandleGroupClick";

const GroupsPreviewCard = ({ group }) => {
  const { id, name, image, description, members } = group;

  const handleGroupClick = useHandleGroupClick();

  let filteredDesc = description[0];
  filteredDesc = filteredDesc.replaceAll("**", "");
  return (
    <div
      className="w-[100%] h-[5.8rem] flex items-center rounded-lg cursor-pointer"
      onClick={() => handleGroupClick(id)}
    >
      <img src={image} alt="" className="w-[34%] h-[84%] ml-2 rounded-lg" />
      <div className="w-[66%] h-[100%] p-2 pl-4 flex flex-col">
        <h3 className="text-[13px] text-textPrimary font-bold">{name}</h3>
        <p className="text-[9px] text-primary font-medium mt-1">
          {filteredDesc}
        </p>
        <div className="flex items-center mt-auto mb-1">
          <IoPerson className="text-primary text-[12px]" />
          <p className="ml-2 text-[8px] font-semibold text-[#2C3E50]">
            {members.length} Members
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupsPreviewCard;
