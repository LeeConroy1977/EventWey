import { SlCalender } from "react-icons/sl";
import { FaRegMessage } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";

const EventOptionsContainer = () => {
  return (
    <div className="w-[100%] min-h-[150px] flex flex-col rounded-lg bg-white  p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-[1rem] font-bold text-textPrimary">
          Event Options
        </h3>
      </div>
      <div className="flex items-start justify-start flex-wrap mt-6 gap-3">
        <div className="flex items-center w-[100%] cursor-pointer">
          <div className="p-4 rounded-full bg-bgSecondary">
            <SlCalender className="text-[1.2rem] text-textPrimary font-semibold" />
          </div>
          <p className="text-[12px] text-textPrimary font-medium ml-4">
            Add event to Google Calendar
          </p>
        </div>
        <div className="flex items-center w-[100%] mt-3 cursor-pointer">
          <div className="p-4 rounded-full bg-bgSecondary">
            <IoPersonAddSharp className="text-[1.2rem] text-textPrimary font-semibold" />
          </div>
          <p className="text-[12px] text-textPrimary font-medium ml-4">
            Invite connections to this event
          </p>
        </div>
        <div className="flex items-center w-[100%] mt-3 cursor-pointer">
          <div className="p-4 rounded-full bg-bgSecondary">
            <FaRegMessage className="text-[1.2rem] text-textPrimary font-semibold" />
          </div>
          <p className="text-[12px] text-textPrimary font-medium ml-4">
            Join the event conversation
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventOptionsContainer;
