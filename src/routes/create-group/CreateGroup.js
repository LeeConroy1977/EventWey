import { jsx as _jsx } from "react/jsx-runtime";
import { useCreateGroupContext } from "../../contexts/CreateGroupContext";
import CreateGroupDescription from "./CreateGroupDescription";
import CreateGroupImage from "./CreateGroupImage";
import CreateGroupIntro from "./CreateGroupIntro";
import CreateGroupLocation from "./CreateGroupLocation";
import CreateGroupName from "./CreateGroupName";
import CreateGroupType from "./CreateGroupType";
const CreateGroup = () => {
    const { state } = useCreateGroupContext();
    if (state.isCreateGroupIntro) {
        return _jsx(CreateGroupIntro, {});
    }
    const renderStep = () => {
        switch (state.currentStep) {
            case 1:
                return _jsx(CreateGroupName, {});
            case 2:
                return _jsx(CreateGroupDescription, {});
            case 3:
                return _jsx(CreateGroupImage, {});
            case 4:
                return _jsx(CreateGroupType, {});
            case 5:
                return _jsx(CreateGroupLocation, {});
            default:
                return null;
        }
    };
    return (_jsx("div", { className: "flex flex-col items-center mobile:w-[100%] tablet:w-[94%] desktop:w-[66%] mobile:h-[100%] tablet:h-[74%] desktop:h-[80%] bg-bgPrimary tablet:mt-[4rem] desktop:mt-[4.4rem] rounded-lg", children: _jsx("main", { className: "w-[100%] h-[100%]", children: renderStep() }) }));
};
export default CreateGroup;
