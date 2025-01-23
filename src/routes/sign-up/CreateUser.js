import { jsx as _jsx } from "react/jsx-runtime";
import { useCreateUserContext } from "../../contexts/CreateUserContext";
import AddAboutMe from "./AddAboutMe";
import AddBackgroundImage from "./AddBackgroundImage";
import AddBio from "./AddBio";
import AddProfileImage from "./AddProfileImage";
import AddTags from "./AddTags";
import SignUp from "./SignUp";
const CreateUser = () => {
    const { state, nextStep, prevStep } = useCreateUserContext();
    if (state.isSignUp) {
        return _jsx(SignUp, {});
    }
    const renderStep = () => {
        switch (state.currentStep) {
            case 1:
                return _jsx(AddProfileImage, {});
            case 2:
                return _jsx(AddBackgroundImage, {});
            case 3:
                return _jsx(AddBio, {});
            case 4:
                return _jsx(AddAboutMe, {});
            case 5:
                return _jsx(AddTags, {});
            default:
                return null;
        }
    };
    return (_jsx("div", { className: "flex flex-col items-center mobile:w-screen mobile:h-screen tablet:w-[80%] desktop:w-[66%] tablet:h-[74%] desktop:h-[80%]  bg-bgPrimary  mobile:mt-0 tablet:mt-[4rem] desktop:mt-[4.4rem] rounded-lg", children: _jsx("main", { className: "w-full h-full", children: renderStep() }) }));
};
export default CreateUser;
