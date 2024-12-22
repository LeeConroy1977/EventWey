import { IoPerson } from "react-icons/io5";

const AdminGroupCard = ({ group, handleClick }) => {
  const { id, image, description, members, name } = group;
  let filteredDesc = description[0];
  return (
    <div
      className="relative flex items-center w-[100%] h-[180px] bg-white p-4 border-[1px] border-gray-200 rounded-lg mt-4 cursor-pointer"
      onClick={() => handleClick(id)}
    >
      <img src={image} alt="" className="w-[40%] h-[90%] ml-2 rounded-lg" />
      <div className="w-[60%] h-[100%] flex flex-col justify-between p-3 pl-8 pt-5">
        <div>
          <h2 className="text-[21px] font-bold text-[#2C3E50]">{name}</h2>
          <p className="text-[11px] font-semibold text-primary mt-2 pr-4">
            {filteredDesc}
          </p>
        </div>
        <div className="flex w-[100%] h-[25%] mt-auto">
          <div className="flex items-center">
            <IoPerson className="text-primary text-[18px]" />
            <p className="ml-2 text-[12px] font-semibold text-[#2C3E50]">
              {members.length} Members
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGroupCard;
