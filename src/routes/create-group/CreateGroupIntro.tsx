import mainImage from "../../assets/images/main_2.jpg";
import Button from "../../reuseable-components/Button";
import { useCreateGroupContext } from "../../contexts/CreateGroupContext";

const CreateGroupIntro = () => {
  const { dispatch } = useCreateGroupContext();

  function handleNextClick() {
    dispatch({
      type: "START_GROUP_CREATION",
    });
    console.log("this ranssssssssssssssss");
  }

  return (
    <div className="flex flex-col items-center w-[66%] h-[80%] bg-bgPrimary p-12 mt-[6rem] rounded-lg">
      <main className="w-full h-[60%] flex  items-center">
        <section className="w-[60%] h-[100%]">
          <h1 className="text-textPrimary text-[32px] font-bold mt-9">
            Start a <span className="text-primary">Group</span>. Build
            Community.
            <br />
            Make an Impact in <span className="text-secondary">
              Weymouth
            </span>{" "}
          </h1>

          <p className="text-[16px] text-textPrimary font-medium mt-8 w-[90%]">
            Whether you’re passionate about a cause, a hobby, or bringing people
            together, starting a group is the perfect way to create meaningful
            connections. Gather like-minded individuals, host engaging events,
            and turn your vision into reality. Weymouth is waiting for your next
            great idea—let's make it happen!
          </p>
        </section>
        <section className="w-[50%] h-[100%]">
          <img
            src={mainImage}
            alt=""
            className=" w-[100%] h-[80%] rounded-lg "
          />
        </section>
      </main>

      <div className="w-[80%] flex items-center justify-between mt-auto mb-12 ">
        <h2 className="text-textPrimary text-[26px] font-bold ">
          Fill in the <span className="text-secondary">details</span>. Await
          <span className="text-primary"> approval</span>. You're good to go...
        </h2>
        <Button
          bgColour="bg-secondary"
          px="px-6"
          py="py-3"
          fontSize="text-[16px]"
          handleClick={handleNextClick}
        >
          Start a Group
        </Button>
      </div>
    </div>
  );
};

export default CreateGroupIntro;
