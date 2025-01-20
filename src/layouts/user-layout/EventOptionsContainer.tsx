import { SlCalender } from "react-icons/sl";
import { FaRegMessage } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const EventOptionsContainer = () => {
  const { isMobile } = useScreenWidth();
  return (
    <div className="w-[100%] h-auto tablet:min-h-[300px] flex flex-row tablet:flex-col rounded-lg bg-white mt-2 tablet:mt-4 p-0  tablet:p-6  desktop:p-8 xl-screen:p-8">
      {isMobile && (
        <div className="w-full flex flex-row items-start justify-between desktop:justify-start  mt-4 gap-3">
          <div className="flex flex-col items-center w-[100%] cursor-pointer">
            <div className="p-4 rounded-full bg-gray-100">
              <SlCalender className="text-[1.2rem] text-textPrimary font-semibold" />
            </div>
            <p className="text-[9px] text-textPrimary font-semibold mt-2 ">
              Add to Calendar
            </p>
          </div>
          <div className="flex flex-col  items-center w-[100%] cursor-pointer">
            <div className="p-4 rounded-full bg-gray-100">
              <IoPersonAddSharp className="text-[1.2rem] text-textPrimary font-semibold" />
            </div>
            <p className="text-[9px] text-textPrimary font-semibold mt-2">
              Invite connections
            </p>
          </div>
          <div className="flex flex-col  items-center w-[100%] cursor-pointer">
            <div className="p-4 rounded-full bg-gray-100">
              <FaRegMessage className="text-[1.2rem] text-textPrimary font-semibold" />
            </div>
            <p className="text-[9px] text-textPrimary font-semibold mt-2">
              Join conversation
            </p>
          </div>
        </div>
      )}
      {!isMobile && (
        <>
          <div className="flex justify-between items-center">
            <h3 className="tablet:text-[14px] desktop:text-[1rem] xl-screen:text-[18px]  font-bold text-textPrimary ">
              Event Options
            </h3>
          </div>

          <div className="flex items-start justify-start flex-wrap mt-6 xl-screen:mt-8 gap-3">
            <div className="flex items-center w-[100%] cursor-pointer">
              <div className="p-4 xl-screen:p-5 rounded-full bg-gray-100">
                <SlCalender className="text-[1.2rem] xl-screen:text-[1.4rem] text-textPrimary font-semibold" />
              </div>
              <p className="tablet:text-[11px] desktop:text-[12px] xl-screen:text-[15px] text-textPrimary font-medium ml-4">
                Add event to Google Calendar
              </p>
            </div>
            <div className="flex items-center w-[100%] mt-3 cursor-pointer">
              <div className="p-4 xl-screen:p-5 rounded-full bg-gray-100">
                <IoPersonAddSharp className="text-[1.2rem] xl-screen:text-[1.4rem]  text-textPrimary font-semibold" />
              </div>
              <p className="tablet:text-[11px] desktop:text-[12px] xl-screen:text-[15px] text-textPrimary font-medium ml-4">
                Invite connections to this event
              </p>
            </div>
            <div className="flex items-center w-[100%] mt-3 cursor-pointer">
              <div className="p-4 xl-screen:p-5 rounded-full bg-gray-100">
                <FaRegMessage className="text-[1.2rem] xl-screen:text-[1.4rem] text-textPrimary font-semibold" />
              </div>
              <p className="tablet:text-[11px] desktop:text-[12px] xl-screen:text-[15px] text-textPrimary font-medium ml-4">
                Join the event conversation
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EventOptionsContainer;
