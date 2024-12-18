import { useCreateGroupContext } from "../../contexts/CreateGroupContext";
import StepIndicator from "../../layouts/create-group-layout/StepIndicator";
import CreateGroupAccess from "./CreateGroupAccess";
import CreateGroupCategory from "./CreateGroupCategory";
import CreateGroupDescription from "./CreateGroupDescription";
import CreateGroupImage from "./CreateGroupImage";
import CreateGroupIntro from "./CreateGroupIntro";
import CreateGroupLocation from "./CreateGroupLocation";
import CreateGroupName from "./CreateGroupName";

const CreateGroup = () => {
  const { state, nextStep, prevStep } = useCreateGroupContext();

  if (state.isIntro) {
    return <CreateGroupIntro />;
  }

  const renderStep = () => {
    switch (state.currentStep) {
      case "name":
        return <CreateGroupName />;
      case "description":
        return <CreateGroupDescription />;
      case "image":
        return <CreateGroupImage />;
      case "category":
        return <CreateGroupCategory />;
      case "access":
        return <CreateGroupAccess />;
      case "location":
        return <CreateGroupLocation />;

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center w-[66%] h-[80%] bg-bgPrimary  mt-[6rem] rounded-lg">
      <StepIndicator currentStepNum={state.currentStepNum} />
      <main className="w-[100%] h-[100%]">{renderStep()}</main>
      <div className="w-[80%] flex justify-between mt-auto mb-6">
        <button onClick={prevStep}>Prev</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
};

export default CreateGroup;
