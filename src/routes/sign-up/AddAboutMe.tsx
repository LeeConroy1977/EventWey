import { useEffect, useState } from "react";
import { useCreateUserContext } from "../../contexts/CreateUserContext";
import Button from "../../reuseable-components/Button";
import { useUser } from "../../contexts/UserContext";
import signUpImage5 from "../../assets/images/signUp5.jpg";

const AddAboutMe = () => {
  const { user } = useUser();
  const { patchUser, nextStep } = useCreateUserContext();
  const [isValidAboutMe, setIsValidAboutMe] = useState<boolean | null>(null);
  const [aboutMe, setAboutMe] = useState<string>("");

  useEffect(() => {
    handlePreviewAboutMe();
  }, [aboutMe]);

  function handlePreviewAboutMe() {
    if (aboutMe.length > 2 && aboutMe.length < 500) {
      setIsValidAboutMe(true);
    } else {
      setIsValidAboutMe(false);
    }
  }

  function handleSubmit() {
    if (isValidAboutMe) {
      patchUser("aboutMe", aboutMe);
    }

    nextStep();
  }
  return (
    <div className="flex flex-col items-center w-full h-full bg-bgPrimary rounded-lg">
      <main className="w-full h-full flex">
        <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden">
          <img
            src={signUpImage5}
            alt="Sign Up"
            className="w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg"
          />
        </section>
        <section className="w-[50%] h-[100%] flex flex-col items-center rounded-lg">
          <h1 className="text-textPrimary text-[32px] font-semibold mt-12">
            Tell us about yourself
          </h1>
          <h2 className="w-[70%] text-textPrimary text-[16px] font-medium mt-8">
            * Describe yourself in a paragraph.
          </h2>
          <div className="w-[80%] h-[30%] rounded-lg bg-gray-100 border-2 border-gray-200 mt-10 overflow-hidden">
            <p className="text-[16px] font-medium p-6">{aboutMe}</p>
          </div>
          <div className="w-[70%] h-[1rem] flex text-[12px] text-secondary mt-[3rem]">
            <p className="  ml-auto mr-2 text-[12px] text-secondary">
              {isValidAboutMe === false && aboutMe.length > 500
                ? "Paragraph must be between 2-500 characters."
                : ""}
            </p>
          </div>
          <textarea
            value={aboutMe}
            type="text"
            className="w-[80%] h-[8rem] border-[2px] border-gray-200 rounded-lg p-6  placeholder:text-[14px] focus:outline-none"
            placeholder="Tell us about yourself..."
            onChange={(e) => setAboutMe(e.target.value)}
          />
          <div className="mt-auto mb-12">
            <Button
              handleClick={handleSubmit}
              isDisabled={!isValidAboutMe}
              bgColour={isValidAboutMe ? "bg-secondary" : "bg-gray-300"}
              py="py-3"
              px="px-12"
              fontSize="text-14px"
            >
              Add bio
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AddAboutMe;
