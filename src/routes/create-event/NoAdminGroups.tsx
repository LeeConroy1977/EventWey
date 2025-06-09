import useHandleCreateGroupClick from "../../hooks/useHandleCreateGroupClick";
import Button from "../../reuseable-components/Button";

const NoAdminGroups = () => {
  const handleCreateGroupClick = useHandleCreateGroupClick();

  async function handleClick() {
    handleCreateGroupClick();
  }
  return (
    <div className="flex flex-col items-center w-[66%] h-[80%] bg-bgPrimary mt-[4rem] rounded-lg">
      <main className="w-full h-[100%] flex flex-col items-center bg-bgPrimary">
        <h1 className="text-[36px] font-bold text-secondary mt-12">EventWey</h1>
        <h2 className="text-[28px] font-semibold text-textPrimary mt-[8rem]">
          You need to be a group organiser to create an event!
        </h2>
        <h3 className="text-[26px] font-semibold text-textPrimary mt-[5rem]">
          Start a{" "}
          <span onClick={handleClick} className="text-primary cursor-pointer">
            group
          </span>{" "}
          and create some exciting events in Weymouth...
        </h3>
        <div className="mt-auto mb-16">
          <Button handleClick={handleClick} px="px-12" py="py-3">
            Create a group
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NoAdminGroups;
