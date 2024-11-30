import { useUser } from "../contexts/UserContext";

const UserWrapper = () => {
  const { user } = useUser();
  const firstName = user?.username.split(" ")[0];
  return (
    <div className="w-[100%] h-[7rem] flex items-center justify-center   bg-[#F6F7F8]">
      <div className=" w-[76%] h-[100%] flex items-center justify-center">
        <h1 className="text-[26px] font-bold ml-6 text-[#2C3E50]">
          Welcome, <span className="text-[#5D9B9B]">{firstName}</span>
        </h1>
        <button className="p-2 pl-4 pr-4 bg-[#D66E6E]  text-white rounded-lg text-[14px] font-semibold ml-auto ">
          Create an event
        </button>
      </div>
    </div>
  );
};

export default UserWrapper;
