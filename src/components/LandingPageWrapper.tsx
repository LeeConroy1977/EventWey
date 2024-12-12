import mainImage from "../assets/images/main_2.jpg";
import Button from "../reuseable-components/Button";

const LandingPageWrapper = () => {
  return (
    <div className="w-[66%] h-[21rem] flex items-center justify-center  bg-bgPrimary mt-12 ">
      <div className="w-[60%] h-[100%] flex flex-col ">
        <h1 className="text-textPrimary text-[28px] font-bold mt-9">
          Explore <span className="text-primary">Events</span>. Build
          Connections.
          <br />
          Make Memories in <span className="text-secondary">Weymouth</span>{" "}
        </h1>
        {/* <h2 className="text-secondary font-bold text-[16px] mt-2">
          Find the Events That Bring You Together
        </h2> */}
        <p className="text-[14px] text-textPrimary font-medium mt-4 w-[80%]">
          Whether you're seeking new experiences or looking to meet others who
          share your passions, we’ve got you covered. Explore local events
          happening in Weymouth, from music festivals to neighbourhood meetups,
          and discover exciting opportunities to get involved.
        </p>
        <div className="mt-6">
          <Button>Join EventWey</Button>
        </div>
      </div>
      <div className="w-[40%] h-[80%]">
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
