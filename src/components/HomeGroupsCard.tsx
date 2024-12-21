import { IoPerson } from "react-icons/io5";
import { useUser } from "../contexts/UserContext";


const HomeGroupsCard = ({ group, handleClick }) => {
  const { user } = useUser();
  const { id, name, image, description, members, openAccess } = group;

  let filteredDesc = description[0];
  filteredDesc = filteredDesc.replaceAll("**", "");

  const isMember = user?.groups?.includes(id);

  return (
    <div
      className="relative flex items-center w-[100%] h-[220px] bg-white p-4 border-[1px] border-gray-200 rounded-lg mt-4 cursor-pointer"
      onClick={() => handleClick(id)}
    >
      <img src={image} alt="" className="w-[40%] h-[90%] ml-2 rounded-lg" />
      <div className="w-[60%] h-[100%] flex flex-col justify-between p-3 pl-8 pt-5">
        <div>
          <h2 className="text-[21px] font-bold text-[#2C3E50]">{name}</h2>
          <p className="text-[11px] font-semibold text-primary mt-2 pr-4">
            {filteredDesc}
          </p>
          <p className="text-[11px] font-semibold text-gray-500 mt-3">{`${
            openAccess ? "Public" : "Private"
          } Group`}</p>
        </div>
        <div className="flex w-[100%] h-[25%] mt-auto">
          <div className="flex items-center">
            <IoPerson className="text-primary text-[18px]" />
            <p className="ml-2 text-[12px] font-semibold text-[#2C3E50]">
              {members.length} Members
            </p>
          </div>
          <button
            className={`w-[100px] h-[34px] ml-auto flex items-center justify-center text-[11px] font-semibold rounded-lg ${
              isMember
                ? "bg-bgPrimary border-2 border-primary text-primary"
                : "bg-[#5D9B9B] text-white"
            }`}
          >
            {isMember ? "Member" : "Join group"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeGroupsCard;
