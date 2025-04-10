import mainImage from "../../assets/images/main_2.jpg";
import Button from "../../reuseable-components/Button";
import { useCreateGroupContext } from "../../contexts/CreateGroupContext";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const CreateGroupIntro = () => {
  const { dispatch } = useCreateGroupContext();
  const { isMobile } = useScreenWidth();

 async function handleNextClick() {
    dispatch({
      type: "START_GROUP_CREATION",
    });
  }

  return (
    <div className="flex flex-col items-center mobile:w-[100%] tablet:w-[94%] desktop:w-[66%] mobile:h-screen tablet:h-[74%] desktop:h-[80%] bg-bgPrimary mobile:p-6 tablet:p-12 tablet:mt-[4rem] desktop:mt-[4.4rem] rounded-lg">
      <main className="w-full  tablet:h-[60%] flex mobile:flex-col tablet:flex-row items-center">
        <section className="mobile:w-[100%] tablet:w-[60%] tablet:h-[100%]">
          <h1 className="text-textPrimary mobile:text-[26px] tablet:text-[24px]  desktop:text-[32px] font-bold mobile:mt-2 tablet:mt-4 desktop:mt-9">
            Start a <span className="text-primary">Group</span>. Build
            Community.
            <br />
            Make an Impact in <span className="text-secondary">
              Weymouth
            </span>{" "}
          </h1>

          <p className="mobile:text-[14px] tablet:text-[14px] desktop:text-[16px] text-textPrimary font-medium mobile:mt-6 tablet:mt-8 mobile:w-[100%]  tablet:w-[90%]">
            Whether you’re passionate about a cause, a hobby, or bringing people
            together, starting a group is the perfect way to create meaningful
            connections. Gather like-minded individuals, host engaging events,
            and turn your vision into reality. Weymouth is waiting for your next
            great idea—let's make it happen!
          </p>
        </section>
        {!isMobile && (
          <section className="w-[50%] h-[100%]">
            <img
              src={mainImage}
              alt=""
              className=" w-[100%] tablet:h-[100%] desktop:h-[80%] rounded-lg "
            />
          </section>
        )}
      </main>

      <div className="mobile:w-[100%] tablet:w-[88%] desktop:w-[80%] xl-screen:w-[70%] flex mobile:flex-col tablet:flex-row items-center justify-between mobile:mt-8 tablet:mt-auto tablet:mb-12 ">
        <h2 className="text-textPrimary mobile:text-[18px] tablet:text-[20px]  desktop:text-[26px] font-bold ">
          Fill in the <span className="text-secondary">details</span>. Await
          <span className="text-primary"> approval</span>. You're good to go...
        </h2>
        <div className="mobile:mt-10 tablet:mt-0 mobile:mb-4 tablet:mb-0  ">
          <Button
            bgColour="bg-secondary"
            px="px-8"
            py="py-4"
            fontSize="text-[16px]"
            handleClick={handleNextClick}
          >
            Start a Group
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupIntro;
