import { IoPerson } from "react-icons/io5";
import { useUser } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import React from "react";
import {Group} from '../../types/group'


interface GroupWrapperProps {
  group: Group;
  handleRemoveGroup: (id: string) => void;
  handleApproveGroup: (id: string) => void;
}

const GroupWrapper: React.FC<GroupWrapperProps> = ({
  group,
  handleRemoveGroup,
  handleApproveGroup,
}) => {
  const { user } = useUser();
  const { isMobile } = useScreenWidth();
  const { id } = useParams();
  const { name, image, description, members, openAccess, approved } = group;
  // @ts-ignore
  const isMember = user?.groups?.includes(id) || false;
  const buttonText = isMember
    ? "Member"
    : openAccess
    ? "Join Group"
    : "Request Access";

  return (
    <div className="w-[100%] h-auto tablet:h-[18rem] desktop:h-[21rem] xl-screen:h-[25rem] flex flex-col tablet:flex-row items-center justify-center  bg-bgPrimary border-b-2 border-gray-200 p-6 desktop:p-8">
      <div className=" w-full tablet:w-[94%] desktop:w-[66%] h-[100%] flex flex-col tablet:flex-row items-center justify-center mt-0  tablet:mt-6 ">
        <div className="h-[100%] w-full tablet:w-[50%] flex items-center justify-center ">
          <img
            src={image}
            alt=""
            className="w-full h-[100%] tablet:w-[90%] tablet:h-[92%] rounded-lg "
          />
        </div>
        <div className="w-full tablet:w-[50%] h-[100%] flex flex-col items-center justify-start pl-0 p-0 tablet:pl-12 desktop:pl-16 tablet:p-2">
          <h1 className="text-[20px] desktop:text-[26px] xl-screen:text-[30px] font-bold  text-[#2C3E50] mt-2 mr-auto">
            {name}
          </h1>
          <p className="text-textPrimary text-[12px] desktop:text-[14px] xl-screen:text-[16px] font-semibold mt-2 mr-auto ">
            {openAccess ? "Public" : "Private"} Group
          </p>
          <p className="mt-3 desktop:mt-3 text-[12px] desktop:text-[14px] xl-screen:text-[16px] font-semibold mr-auto">
            {description[0]}
          </p>
          {approved && (
            <div className="w-full flex items-center mt-6 desktop:mt-auto desktop:mr-auto  ">
              <IoPerson className="text-secondary text-[16px] xl-screen:text-[18px]" />
              <p className="ml-2 text-[12px] xl-screen:text-[16px] font-semibold text-[#2C3E50]">
                {members && members.length} Members
              </p>
            </div>
          )}

          {!isMobile && !approved && (
            <div className="flex mr-auto mt-auto mb-4 desktop:h-[66px]">
              <button
                // @ts-ignore
                onClick={handleApproveGroup}
                className="w-[110px]  desktop:w-[120px] tablet:h-[34px] desktop:h-[40px] xl-screen:w-[140px] xl-screen:h-[44px] mt-auto mb-1 mr-auto  flex items-center justify-center tablet:text-[10px] desktop:text-[11px] xl-screen:text-[12px] font-semibold rounded-lg tablet:mb-3 desktop:mb-1 bg-primary text-white
              "
              >
                Approve Group
              </button>
              <button
                // @ts-ignore
                onClick={() => handleRemoveGroup(id)}
                className="w-[110px]  desktop:w-[120px] tablet:h-[34px] desktop:h-[40px] xl-screen:w-[140px] xl-screen:h-[44px] mt-auto mb-1 mr-auto  flex items-center justify-center tablet:text-[10px] desktop:text-[11px] xl-screen:text-[12px] font-semibold rounded-lg tablet:mb-3 desktop:mb-1 bg-secondary text-white tablet:ml-8
              "
              >
                Reject Group
              </button>
            </div>
          )}
          {!isMobile && approved && (
            <button
              className={`w-[110px]  desktop:w-[120px] tablet:h-[34px] desktop:h-[40px] xl-screen:w-[140px] xl-screen:h-[44px] mt-auto mb-1 mr-auto  flex items-center justify-center tablet:text-[10px] desktop:text-[11px] xl-screen:text-[12px] font-semibold rounded-lg tablet:mb-3 desktop:mb-1  ${
                isMember
                  ? "bg-bgPrimary border-2 border-primary text-primary"
                  : "bg-secondary text-white"
              }`}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupWrapper;
