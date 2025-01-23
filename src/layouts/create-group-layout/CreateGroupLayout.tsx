import { Outlet } from "react-router-dom";
import { useCreateGroupContext } from "../../contexts/CreateGroupContext";

const CreateGroupLayout = () => {
  const { nextStep, prevStep } = useCreateGroupContext();
  return (
    <div className="flex flex-col items-center w-[66%] h-[80%] bg-bgPrimary p-12 mt-[6rem] rounded-lg">
      <main>
        <Outlet />
      </main>
      <div className="w-[80%] flex justify-between mt-auto mb-6">
        <button onClick={prevStep}>Prev</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
};

export default CreateGroupLayout;
