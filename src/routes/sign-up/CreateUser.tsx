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
    return <SignUp />;
  }

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <AddProfileImage />;
      case 2:
        return <AddBackgroundImage />;
      case 3:
        return <AddBio />;
      case 4:
        return <AddAboutMe />;
      case 5:
        return <AddTags />;

      default:
        return null;
    }
  };
  return (
    <div className="flex flex-col items-center mobile:w-screen mobile:h-screen tablet:w-[80%] desktop:w-[66%] tablet:h-[74%] desktop:h-[80%]  bg-bgPrimary  mobile:mt-0 tablet:mt-[4rem] desktop:mt-[4.4rem] rounded-lg">
      <main className="w-full h-full">{renderStep()}</main>
    </div>
  );
};

export default CreateUser;
