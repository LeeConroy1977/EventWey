import advertImage from "../../assets/images/main.jpeg";
import useHandleCreateUserClick from "../../hooks/useHandleCreateUserClick";
import Button from "../../reuseable-components/Button";

const LandingPageAdvert = () => {
  const handleCreateUserClick = useHandleCreateUserClick();
  return (
    <div className="w-[100%] h-[18rem] flex items-center justify-center  bg-bgSecondary mt-16 px-8 py-4 rounded-lg">
      <div className="w-[50%] h-[100%] flex flex-col items-start justify-center">
        <h1 className="text-textPrimary text-[28px] font-bold ">
          Join EventWay
        </h1>

        <p className="text-[14px] font-medium mt-4 w-[80%]">
          Explore local events happening in Weymouth, from music festivals to
          neighborhood meetups, and discover exciting opportunities to get
          involved.
        </p>
        <div className="mt-10">
          <Button
            bgColour="bg-secondary"
            px="px-12"
            py="py-3"
            handleClick={handleCreateUserClick}
            fontSize="text-[15px]"
          >
            Join EventWey
          </Button>
        </div>
      </div>
      <div className="w-[44%] h-[100%]">
        <img
          src={advertImage}
          alt=""
          className="w-[100%] h-[100%] rounded-lg"
        />
      </div>
    </div>
  );
};

export default LandingPageAdvert;
