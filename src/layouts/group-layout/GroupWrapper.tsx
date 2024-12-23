import { IoPerson } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useUser } from "../../contexts/UserContext";
import { useParams } from "react-router-dom";
import Button from "../reuseable-components/Button";

const GroupWrapper = ({ group }) => {
  const { user } = useUser();
  const { id } = useParams();
  const { name, image, description, members, openAccess } = group;

  const isMember = user?.groups?.includes(id);
  const buttonText = isMember
    ? "Member"
    : openAccess
    ? "Join Group"
    : "Request Access";

  return (
    <div className="w-[100%] h-[21rem] flex items-center justify-center  bg-bgPrimary border-b-2 border-gray-200 p-8  ">
      <div className=" w-[66%] h-[100%] flex items-center justify-center  mt-6 ">
        <div className="h-[100%] w-[50%] flex items-center justify-center ">
          <img src={image} alt="" className="w-[90%] h-[92%] rounded-lg " />
        </div>
        <div className="w-[50%] h-[100%] flex flex-col items-center justify-start pl-16 p-4">
          <h1 className="text-[26px] font-bold  text-[#2C3E50] mr-auto">
            {name}
          </h1>
          <p className="text-textPrimary text-[14px] font-semibold mt-2 mr-auto ">
            {openAccess ? "Public" : "Private"} Group
          </p>
          <p className="text-[15px] font-semibold mt-4 mr-auto text-primary">
            {description[0]}
          </p>
          <div className="flex items-center mt-auto mr-auto ">
            <IoPerson className="text-secondary text-[16px]" />
            <p className="ml-2 text-[12px] font-semibold text-[#2C3E50]">
              {members && members.length} Members
            </p>
            <FaUserFriends className="text-primary text-[16px] ml-6" />
            <p className="ml-2 text-[12px] font-semibold text-[#2C3E50]">
              {members && members.length} Connections
            </p>
          </div>

          <button
            className={`w-[120px] h-[40px] mt-auto mb-2 mr-auto  flex items-center justify-center text-[11px] font-semibold rounded-lg ${
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

export default GroupWrapper;
