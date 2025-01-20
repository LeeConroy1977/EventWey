import { IoPerson } from "react-icons/io5";

const AdminGroupCard = ({ group, handleClick }) => {
  const { id, image, description, members, name } = group;
  let filteredDesc = description[0];
  return (
    <div
      className="relative flex mobile:flex-col tablet:flex-row items-center w-[100%] tablet:h-[145px] desktop:h-[180px] bg-white mobile:p-0 tablet:p-2 border-[1px] border-gray-200 rounded-lg mt-6 cursor-pointer"
      onClick={() => handleClick(id)}
    >
      <img
        src={image}
        alt=""
        className="w-[100%] h-[200px] tablet:w-[40%] tablet:h-[90%] tablet:ml-2 rounded-tl-lg rounded-tr-lg tablet:rounded-lg "
      />
      <div className="w-[100%] tablet:w-[60%] tablet:h-[100%] h-[56%]  flex flex-col justify-between p-3 tablet:pl-8 tablet:pt-3 desktop:pt-5">
        <div>
          <h2 className="mt-1 tablet:text-[16px] desktop:text-[21px] font-bold text-[#2C3E50]">
            {name}
          </h2>
          <p className="mobile:text-[10px] tablet:text-[9px]  desktop:text-[11px] font-semibold text-textPrimary mt-3 tablet:mt-2 pr-4">
            {filteredDesc}
          </p>
        </div>
        <div className="flex w-[100%] h-[25%] mt-4 tablet:mt-auto">
          <div className="flex items-center">
            <IoPerson className="text-primary mobile:text-[15px] tablet:text-[14px] desktop:text-[18px]" />
            <p className="ml-2 mobile:text-[10px] desktop:text-[12px] font-semibold text-[#2C3E50]">
              {members.length} Members
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGroupCard;
