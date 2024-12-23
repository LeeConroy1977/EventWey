import React from "react";
import useHandleCreateEventClick from "../../hooks/useHandleCreateEventClick";
import Button from "../../reuseable-components/Button";

const VistorWrapper = () => {
  const handleCreateEventClick = useHandleCreateEventClick();

  function handleClick() {
    return handleCreateEventClick();
  }
  return (
    <div className="w-[100%] h-[9rem] flex items-center justify-center   bg-[#F6F7F8]">
      <div className=" w-[66%] h-[100%] flex items-center justify-center">
        <h1 className="text-[28px] font-bold ml-6 text-textPrimary">
          Welcome to <span className="text-[30px] text-primary">EventWey</span>
        </h1>
        <div className="ml-auto">
          <Button
            bgColour="bg-secondary"
            px="px-8"
            py="py-3"
            handleClick={handleClick}
          >
            Create an event
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VistorWrapper;
