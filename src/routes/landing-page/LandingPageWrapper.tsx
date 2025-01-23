import mainImage from "../../assets/images/main_2.jpg";
import useHandleCreateUserClick from "../../hooks/useHandleCreateUserClick";
import Button from "../../reuseable-components/Button";

const LandingPageWrapper = () => {
  const handleCreateUserClick = useHandleCreateUserClick();

  return (
    <div className="w:full tablet:w-[86%]  desktop:w-[66%] tablet:h-[22rem] xl-screen:h-[25rem]  flex flex-col tablet:flex-row items-center justify-start tablet:justify-center  bg-bgPrimary px-6 tablet:px-0 tablet:mt-6 desktop:mt-14">
      <div className="w-full tablet:w-[60%] tablet:h-[100%] flex flex-col items-center justify-center desktop:p-0">
        <h1 className="w-[100%] text-textPrimary text-[18px] tablet:text-[22px]  desktop:text-[28px] xl-screen:text-[34px] font-bold mt-8 tablet:mt-2 desktop:mr-auto">
          Explore <span className="text-primary">Events</span>. Build
          Connections.
          <br />
          Make Memories in <span className="text-secondary">
            Weymouth
          </span>.{" "}
        </h1>

        <p className="text-[14px] tablet:text-[13px] desktop:text-[14px] xl-screen:text-[18px]   text-textPrimary font-medium mt-8 tablet:mt-3 desktop:mt-4   w-full tablet:w-[90%] desktop:w-[80%] tablet:mr-auto">
          Whether you're seeking new experiences or looking to meet others who
          share your passions, we’ve got you covered. Explore local events
          happening in Weymouth, from music festivals to neighbourhood meetups,
          and discover exciting opportunities to get involved.
        </p>
        <div className="mt-8 tablet:mt-6 desktop:mt-8 mr-auto   desktop:ml-0 ">
          <Button
            handleClick={handleCreateUserClick}
            bgColour="bg-primary"
            px="px-12"
            py="py-3"
          >
            Join EventWey
          </Button>
        </div>
      </div>
      <div className=" w-[100%] h-[28%] tablet:w-[50%] desktop:w-[40%] tablet:h-[80%] desktop:h-[90%] mt-12 tablet:mt-0">
        <img
          src={mainImage}
          alt=""
          className=" w-[100%] h-[100%] rounded-lg "
        />
      </div>
    </div>
  );
};

export default LandingPageWrapper;
