import { useUser } from "../../contexts/UserContext";
import useHandleCreateEventClick from "../../hooks/useHandleCreateEventClick";
import Button from "../../reuseable-components/Button";

const UserWrapper = () => {
  const { user } = useUser();

  const handleCreateEventClick = useHandleCreateEventClick();
  const firstName = user?.username ? user.username.split(" ")[0] : "";

  function handleClick() {
    return handleCreateEventClick();
  }
  return (
    <div className="w-[100%] h-[9rem] flex items-center justify-center   bg-[#F6F7F8]">
      <div className=" w-[66%] h-[100%] flex items-center justify-center">
        <h1 className="text-[26px] font-bold ml-6 text-[#2C3E50]">
          Welcome, <span className="text-[#5D9B9B]">{firstName}</span>
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

export default UserWrapper;
