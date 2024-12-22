import { useEffect, useState } from "react";
import { useCreateUserContext } from "../../contexts/CreateUserContext";
import Button from "../../reuseable-components/Button";
import { useUser } from "../../contexts/UserContext";
import signUpImage4 from "../../assets/images/signUp4.jpg";

const AddBio = () => {
  const { user } = useUser();
  const { patchUser, nextStep } = useCreateUserContext();
  const [isValidBio, setIsValidBio] = useState<boolean | null>(null);
  const [bio, setBio] = useState<string>("");

  useEffect(() => {
    handlePreviewBio();
  }, [bio]);

  function handlePreviewBio() {
    if (bio.length > 2 && bio.length < 50) {
      setIsValidBio(true);
    } else {
      setIsValidBio(false);
    }
  }

  function handleSubmit() {
    if (isValidBio) {
      patchUser("bio", bio);
    }

    nextStep();
  }
  return (
    <div className="flex flex-col items-center w-full h-full bg-bgPrimary rounded-lg">
      <main className="w-full h-full flex">
        <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden">
          <img
            src={signUpImage4}
            alt="Sign Up"
            className="w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg"
          />
        </section>
        <section className="w-[50%] h-[100%] flex flex-col items-center rounded-lg">
          <h1 className="text-textPrimary text-[32px] font-semibold mt-12">
            Add a profile bio
          </h1>
          <h2 className="w-[70%] text-textPrimary text-[16px] font-medium mt-8">
            * Describe yourself in less than 50 characters
          </h2>
          <div className="w-[80%] h-[34%] rounded-lg bg-gray-100 border-2 border-gray-200 mt-10 overflow-hidden">
            <p className="text-[16px] font-medium p-6">{bio}</p>
          </div>
          <div className="w-[70%] h-[1rem] flex text-[12px] text-secondary mt-[3rem]">
            <p className="  ml-auto mr-2 text-[12px] text-secondary">
              {isValidBio === false && bio.length > 50
                ? "bio must be between 2-40 characters."
                : ""}
            </p>
          </div>
          <input
            value={bio}
            type="text"
            className="w-[70%] h-[3rem] border-[2px] border-gray-200 rounded-lg pl-4 mt-[1rem] placeholder:text-[14px] focus:outline-none"
            placeholder="Add a bio..."
            onChange={(e) => setBio(e.target.value)}
          />
          <div className="mt-auto mb-12">
            <Button
              handleClick={handleSubmit}
              isDisabled={!isValidBio}
              bgColour={isValidBio ? "bg-secondary" : "bg-gray-300"}
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

export default AddBio;
