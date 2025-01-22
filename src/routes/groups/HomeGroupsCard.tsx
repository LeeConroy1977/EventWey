import { IoPerson } from "react-icons/io5";
import { useUser } from "../../contexts/UserContext";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const HomeGroupsCard = ({ group, handleClick }) => {
  const { user } = useUser();
  const { isMobile } = useScreenWidth();
  const { id, name, image, description, members, openAccess, approved } = group;

  let filteredDesc = description[0];
  filteredDesc = filteredDesc.replaceAll("**", "");

  const isMember = user?.groups?.includes(id);

  return (
    <div
      className="relative flex flex-col tablet:flex-row items-center w-[100%] tablet:h-[210px] desktop:h-[240px]  xl-screen:h-[280px] bg-white tablet:p-3 desktop:p-4  border-gray-200 rounded-lg mt-4  border-[1px] cursor-pointer"
      onClick={() => handleClick(id)}
    >
      <img
        src={image}
        alt=""
        className="w-[100%] h-[200px] tablet:w-[40%] tablet:h-[90%] tablet:ml-2 rounded-tl-lg rounded-tr-lg tablet:rounded-lg "
      />
      <div className="w-[100%] tablet:w-[60%] h-[56%] tablet:h-[90%]  flex flex-col justify-between  p-3 py-4 tablet:px-0 tablet:py-0 tablet:p-3 tablet:pl-8 tablet:pt-3">
        <div>
          <h2 className="text-[16px] desktop:text-[18px] xl-screen:text-[22px]  font-bold text-textPrimary mt-1">
            {name}
          </h2>
          <p className="text-[10px] desktop:text-[11px] xl-screen:text-[14px]  font-semibold text-gray-500 mt-2">{`${
            openAccess ? "Public" : "Private"
          } Group`}</p>
          <p className="text-[10px] desktop:text-[11px] xl-screen:text-[14px]   font-semibold text-textPrimary mt-3 tablet:mt-2 pr-4 xl-screen:pr-8">
            {filteredDesc}
          </p>
        </div>
        <div className="flex items-center w-[100%] h-[25%] mt-4 mb-1 tablet:mb-0 tablet:mt-auto">
          <div className="flex items-center">
            <IoPerson className="text-[#D66E6E] text-[15px] desktop:text-[18px] xl-screen:text-[20px]" />
            <p className="ml-2 text-[10px] desktop:text-[12px] xl-screen:text-[14px] font-semibold text-[#2C3E50]">
              {members.length} Members
            </p>
          </div>
          {!isMobile && (
            <button
              className={`tablet:w-[74px] tablet:h-[30px] desktop:w-[100px] xl-screen:w-[120px]  desktop:h-[34px]  xl-screen:h-[40px] ml-auto flex items-center justify-center tablet:text-[9px] desktop:text-[11px] xl-screen:text-[13px] desktop:mr-4  font-semibold rounded-lg ${
                isMember
                  ? "bg-bgPrimary border-2 border-primary text-primary"
                  : "bg-[#5D9B9B] text-white"
              }`}
            >
              {!approved ? "Review Group" : isMember ? "Member" : "Join group"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeGroupsCard;
