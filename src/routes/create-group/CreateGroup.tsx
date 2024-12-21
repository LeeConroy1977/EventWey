import { useCreateGroupContext } from "../../contexts/CreateGroupContext";
import StepIndicator from "../../layouts/create-group-layout/StepIndicator";
import CreateGroupAccess from "./CreateGroupAccess";
import CreateGroupCategory from "./CreateGroupType";
import CreateGroupDescription from "./CreateGroupDescription";
import CreateGroupImage from "./CreateGroupImage";
import CreateGroupIntro from "./CreateGroupIntro";
import CreateGroupLocation from "./CreateGroupLocation";
import CreateGroupName from "./CreateGroupName";
import CreateGroupType from "./CreateGroupType";

const CreateGroup = () => {
  const { state } = useCreateGroupContext();

  if (state.isCreateGroupIntro) {
    return <CreateGroupIntro />;
  }

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <CreateGroupName />;
      case 2:
        return <CreateGroupDescription />;
      case 3:
        return <CreateGroupImage />;
      case 4:
        return <CreateGroupType />;
      case 5:
        return <CreateGroupLocation />;

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center w-[66%] h-[80%] bg-bgPrimary  mt-[6rem] rounded-lg">
      <main className="w-[100%] h-[100%]">{renderStep()}</main>
    </div>
  );
};

export default CreateGroup;
