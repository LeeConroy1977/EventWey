import useHandleCreateEventClick from "../../hooks/useHandleCreateEventClick";

const VistorWrapper = () => {
  const handleCreateEventClick = useHandleCreateEventClick();

  function handleClick() {
    return handleCreateEventClick();
  }

  return (
    <div className="w-[100%] tablet:h-[10rem] desktop:h-[10rem] xl-screen:h-[13rem] flex items-center justify-center   bg-[#F6F7F8]">
      <div className=" tablet:w-[86%] desktop:w-[66%] h-[100%] flex items-center justify-center">
        <h1 className="tablet:text-[22px] desktop:text-[28px] font-bold ml-6 text-textPrimary">
          Welcome to{" "}
          <span className="tablet:text-[24px] desktop:text-[30px] text-primary">
            EventWey
          </span>
        </h1>

        <button
          onClick={handleClick}
          className="tablet:text-[12px] desktop:text-[16px] xl-screen:text-[18px] px-8  py-3 xl-screen:px-12 xl-screen:py-4 bg-secondary ml-auto rounded-lg text-textSecondary font-medium"
        >
          Create an event
        </button>
      </div>
    </div>
  );
};

export default VistorWrapper;
