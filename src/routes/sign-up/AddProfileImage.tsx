import { useEffect, useState } from "react";
import Button from "../../reuseable-components/Button";
import { useUser } from "../../contexts/UserContext";
import { useCreateUserContext } from "../../contexts/CreateUserContext";
import signUpImage2 from "../../assets/images/signUp2.jpg";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const AddProfileImage = () => {
  const {} = useUser();
  // @ts-ignore
  const { patchUser, nextStep } = useCreateUserContext();
  const [showImage, setShowImage] = useState<boolean>(false);
  const [isValidImage, setIsValidImage] = useState<boolean | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const { isMobile } = useScreenWidth();

  useEffect(() => {
    handlePreviewImage();
  }, [profileImage]);

  function handlePreviewImage() {
    if (
      profileImage &&
      (profileImage.endsWith(".jpg") ||
        profileImage.endsWith(".jpeg") ||
        profileImage.endsWith(".png"))
    ) {
      setIsValidImage(true);
      setShowImage(true);
    } else {
      setIsValidImage(false);
      setShowImage(false);
    }
  }

  async function handleSubmit() {
    if (isValidImage) {
      patchUser("profileImage", profileImage);
    }

    nextStep();
  }

  return (
    <div className="flex flex-col items-center mobile:w-screen mobile:h-screen tablet:w-[100%]  tablet:h-[100%] bg-bgPrimary mobile:mt-0 rounded-lg">
      <main className="w-[100%] h-[100%] flex mobile:flex-col tablet:flex-row mobile:p-6 tablet:p-0">
        {!isMobile && (
          <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden">
            <img
              src={signUpImage2}
              alt="Sign Up"
              className="w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg"
            />
          </section>
        )}

        <section className="mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center ">
          <h1 className="text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-2 tablet:mt-6 desktop:mt-12 mobile:mr-auto tablet:mr-0">
            Add a profile picture
          </h1>
          <h2 className=" mobile:w-[100%] tablet:w-[70%] text-textPrimary mobile:text-[13px] tablet:text-[13px] desktop:text-[16px]  font-medium mobile:mt-6 desktop:mt-8">
            * Please provide a valid image URL ending with the file extension
            .jpg or .png
          </h2>
          <div className="mobile:w-[220px] mobile:h-[220px] tablet:w-[200px] tablet:h-[200px] desktop:w-[240px] desktop:h-[240px] xl-screen:w-[260px] xl-screen:h-[260px] rounded-full bg-gray-100 border-2 border-gray-200 mobile:mt-8 desktop:mt-10 desktop:overflow-hidden">
            {showImage && profileImage ? (
              <img
                src={profileImage}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-400 text-center mt-[50%] mobile:text-[14px] desktop:text-[16px]">
                Image Preview
              </p>
            )}
          </div>
          <div className="mobile:w-[100%] tablet:w-[70%] h-[1rem] flex text-[12px] text-secondary mobile:mt-8 tablet:mt-6 desktop:mt-[3rem] xl-screen:mt-[4rem]">
            <p className=" mobile:mr-auto tablet:mr-0 tablet:ml-auto mr-2 font-semibold mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] text-secondary">
              {isValidImage === false && profileImage.length !== 0
                ? "Image must end in .jpg, .jpeg, or .png"
                : ""}
            </p>
          </div>
          <input
            value={profileImage}
            type="text"
            className="mobile:w-[100%] tablet:w-[70%] h-[3rem] xl-screen:h-[3.4] border-[2px] border-gray-200 rounded-lg pl-4 mt-[1rem] mobile:placeholder:text-[12px] desktop:placeholder:text-[14px] focus:outline-none mobile:text-[14px] desktop:text-[16px]"
            placeholder="Add an image address"
            onChange={(e) => setProfileImage(e.target.value)}
          />
          <div className="mt-auto mobile:mb-[70px] tablet:mb-8 desktop:mb-12">
            <Button
              handleClick={handleSubmit}
              isDisabled={!isValidImage}
              bgColour={isValidImage ? "bg-secondary" : "bg-gray-300"}
              py="py-3"
              px="px-12"
              fontSize="text-14px"
            >
              Add profile image
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AddProfileImage;
