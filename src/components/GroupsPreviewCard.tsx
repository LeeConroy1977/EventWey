import { IoPerson } from "react-icons/io5";

const GroupsPreviewCard = ({ group }) => {
  const {
    id,
    name,
    image,
    description,
    location,
    eventsCount,
    members,
    events,
    messages,
    category,
    openAccess,
  } = group;

  let filteredDesc = description[0];
  filteredDesc = filteredDesc.replaceAll("**", "");
  return (
    <div className="w-[100%] h-[5.4rem] flex items-center rounded-lg cursor-pointer ">
      <img src={image} alt="" className="w-[34%] h-[84%] ml-2 rounded-lg" />
      <div className="w-[66%] h-[100%] p-2 pl-4 flex flex-col">
        <h3 className="text-[11px] text-textPrimary font-bold">{name}</h3>
        <p className="text-[8px] text-primary font-medium mt-1">
          {filteredDesc}
        </p>
        <div className="flex items-center mt-3">
          <IoPerson className="text-primary text-[11px]" />
          <p className="ml-2 text-[8px] font-semibold text-[#2C3E50]">
            {members.length} Members
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupsPreviewCard;
