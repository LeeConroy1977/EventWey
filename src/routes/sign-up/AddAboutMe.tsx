import { useEffect, useState } from "react";
import { useCreateUserContext } from "../../contexts/CreateUserContext";
import Button from "../../reuseable-components/Button";
import { useUser } from "../../contexts/UserContext";
import signUpImage5 from "../../assets/images/signUp5.jpg";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const AddAboutMe = () => {
  const {} = useUser();
  const { isMobile } = useScreenWidth();
  const { nextStep } = useCreateUserContext();
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

  async function handleSubmit() {
    if (isValidAboutMe) {
      // @ts-ignore
      patchUser("aboutMe", aboutMe);
    }

    nextStep();
  }
  return (
    <div className="flex flex-col items-center mobile:w-screen mobile:h-screen tablet:w-[100%]  tablet:h-[100%] bg-bgPrimary mobile:mt-0 rounded-lg">
      <main className="w-[100%] h-[100%] flex mobile:flex-col tablet:flex-row mobile:p-6 tablet:p-0">
        {!isMobile && (
          <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden">
            <img
              src={signUpImage5}
              alt="Sign Up"
              className="w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg"
            />
          </section>
        )}
        <section className="mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center ">
          <h1 className="text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-2 tablet:mt-6 desktop:mt-12 mobile:mr-auto tablet:mr-0">
            Tell us about yourself
          </h1>
          <h2 className=" mobile:w-[100%] tablet:w-[70%] text-textPrimary mobile:text-[13px] tablet:text-[13px] desktop:text-[16px]  font-medium mobile:mt-6 desktop:mt-8">
            * Describe yourself in a paragraph.
          </h2>
          <div className="mobile:w-[100%] tablet:w-[80%] h-[30%] rounded-lg bg-gray-100 border-2 border-gray-200 mt-10 overflow-hidden">
            <p className="text-[16px] font-medium p-6">{aboutMe}</p>
          </div>
          <div className="mobile:w-[100%] tablet:w-[70%] h-[1rem] flex text-[12px] text-secondary mobile:mt-8 tablet:mt-6 desktop:mt-[3rem] xl-screen:mt-[4rem]">
            <p className=" mobile:mr-auto tablet:mr-0 tablet:ml-auto mr-2 font-semibold mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] text-secondary">
              {isValidAboutMe === false && aboutMe.length > 500
                ? "Paragraph must be between 2-500 characters."
                : ""}
            </p>
          </div>
          <textarea
            value={aboutMe}
            className="mobile:w-[100%] tablet:w-[80%] h-[8rem] border-[2px] border-gray-200 rounded-lg p-6  mobile:placeholder:text-[12px] desktop:placeholder:text-[14px] focus:outline-none mobile:text-[14px] desktop:text-[16px] "
            placeholder="Tell us about yourself..."
            onChange={(e) => setAboutMe(e.target.value)}
          />
          <div className="mt-auto mobile:mb-[70px] tablet:mb-8 desktop:mb-12">
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
