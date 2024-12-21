import { useEffect, useState } from "react";
import { useCreateUserContext } from "../../contexts/CreateUserContext";
import Button from "../../reuseable-components/Button";
import { useUser } from "../../contexts/UserContext";
import signUpImage5 from "../../assets/images/signUp5.jpg";
import { useCreateGroupContext } from "../../contexts/CreateGroupContext";

const CreateGgroupDescription = () => {
  const { nextStep, newGroup, setNewGroup } = useCreateGroupContext();
  const [isValidIntro, setIsValidIntro] = useState<boolean | null>(null);
  const [isValidParagraphOne, setIsValidParagraphOne] = useState<
    boolean | null
  >(null);
  const [isValidParagraphTwo, setIsValidParagraphTwo] = useState<
    boolean | null
  >(null);
  const [isValidParagraphThree, setIsValidParagraphThree] = useState<
    boolean | null
  >(null);
  const [intro, setIntro] = useState<string>("");
  const [paragraphOne, setParagraphOne] = useState<string>("");
  const [paragraphTwo, setParagraphTwo] = useState<string>("");
  const [paragraphThree, setParagraphThree] = useState<string>("");
  const [isIntroBlur, setIsIntroblur] = useState(false);

  useEffect(() => {
    handlePreviewIntro();
    handlePreviewParagraphOne();
    handlePreviewParagraphTwo();
    handlePreviewParagraphThree();
  }, [intro, paragraphOne, paragraphTwo, paragraphThree]);

  useEffect(() => {
    handlePreviewIntro();
  }, [
    isValidIntro,
    isValidParagraphOne,
    isValidParagraphTwo,
    isValidParagraphThree,
  ]);

  function handleIntroBlur() {
    setIsIntroblur(true);
  }

  function handlePreviewIntro() {
    if (intro.length < 8) {
      setIsValidIntro(null);
    } else if (intro.length >= 8 && intro.length <= 200) {
      setIsValidIntro(true);
    } else {
      setIsValidIntro(false);
    }
  }

  function handlePreviewParagraphOne() {
    if (paragraphOne.length === 0) {
      setIsValidParagraphOne(null);
    } else if (paragraphOne.length <= 500) {
      setIsValidParagraphOne(true);
    } else {
      setIsValidParagraphOne(false);
    }
  }

  function handlePreviewParagraphTwo() {
    if (paragraphTwo.length === 0) {
      setIsValidParagraphTwo(null);
    } else if (paragraphTwo.length <= 500) {
      setIsValidParagraphTwo(true);
    } else {
      setIsValidParagraphTwo(false);
    }
  }

  function handlePreviewParagraphThree() {
    if (paragraphThree.length === 0) {
      setIsValidParagraphThree(null);
    } else if (paragraphThree.length <= 500) {
      setIsValidParagraphThree(true);
    } else {
      setIsValidParagraphThree(false);
    }
  }

  function handleSubmit() {
    if (isValidIntro !== true) {
      return;
    }
    const isParagraphOneValid =
      paragraphOne.length === 0 || isValidParagraphOne;
    const isParagraphTwoValid =
      paragraphTwo.length === 0 || isValidParagraphTwo;
    const isParagraphThreeValid =
      paragraphThree.length === 0 || isValidParagraphThree;

    if (isParagraphOneValid && isParagraphTwoValid && isParagraphThreeValid) {
      setNewGroup(
        (prevGroup) =>
          (prevGroup = {
            ...prevGroup,
            description: [intro, paragraphOne, paragraphTwo, paragraphThree],
          })
      );
      nextStep();
    }
  }
  return (
    <div className="flex flex-col items-center w-full h-full bg-bgPrimary rounded-lg">
      <main className="w-full h-full flex">
        <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden">
          <h1 className="text-textPrimary text-[24px] font-semibold mt-12">
            Description Preview
          </h1>
          <div className="w-[70%] h-[70%] rounded-lg border-[1px] border-primary mt-12 p-6">
            <div className="text-[13px] font-semibold text-textPrimary mt-6">
              {intro}
            </div>
            <div className="text-[13px] font-normal text-textPrimary mt-6">
              {paragraphOne}
            </div>
            <div className="text-[13px] font-normal text-textPrimary mt-6">
              {paragraphTwo}
            </div>
            <div className="text-[13px] font-normal text-textPrimary mt-6">
              {paragraphThree}
            </div>
          </div>
        </section>
        <section className="w-[50%] h-[100%] flex flex-col items-center rounded-lg">
          <h1 className="text-textPrimary text-[32px] font-semibold mt-12">
            Add a group description
          </h1>
          <h2 className="w-[70%] text-textPrimary text-[16px] font-medium mt-8">
            * Add an intro sentence and optional paragraphs.
          </h2>
          <div className="w-[70%] flex flex-row items-center justify-between mt-8">
            <label
              htmlFor="username"
              className="text-[12px] text-primary font-semibold ml-2 mr-auto "
            >
              Intro
            </label>

            <p className="text-[11px] text-secondary font-semibold mr-2 ml-auto">
              {isValidIntro === false ||
              (intro.length < 8 && isIntroBlur) ||
              intro.length > 200 ? (
                <p>Must be between 8-200 characters</p>
              ) : null}
            </p>
          </div>
          <textarea
            value={intro}
            type="text"
            className="w-[70%] h-[3.5rem] border-[2px] border-gray-200 rounded-lg p-6 mt-1 text-[13px]  placeholder:text-[12px] focus:outline-none"
            placeholder="Tell us about yourself..."
            onChange={(e) => setIntro(e.target.value)}
            onBlur={() => handleIntroBlur()}
          />
          <div className="w-[70%] flex flex-row items-center justify-between mt-5">
            <label
              htmlFor="username"
              className="text-[12px] text-primary font-semibold ml-2 mr-auto "
            >
              Paragraph one
            </label>

            <p className="text-[11px] text-secondary font-semibold mr-2 ml-auto">
              {isValidParagraphOne === false ||
              (paragraphOne.length > 500 && paragraphOne !== "") ? (
                <p>Must be between 8-200 characters</p>
              ) : null}
            </p>
          </div>
          <textarea
            value={paragraphOne}
            type="text"
            className="w-[70%] h-[5rem] border-[2px] border-gray-200 rounded-lg p-6 mt-1 text-[13px]  placeholder:text-[12px] focus:outline-none"
            placeholder="Add a paragraph..."
            onChange={(e) => setParagraphOne(e.target.value)}
          />

          <div className="w-[70%] flex flex-row items-center justify-between mt-5">
            <label
              htmlFor="username"
              className="text-[12px] text-primary font-semibold ml-2 mr-auto "
            >
              Paragraph one
            </label>

            <p className="text-[11px] text-secondary font-semibold mr-2 ml-auto">
              {isValidParagraphTwo === false ||
              (paragraphTwo.length > 500 && paragraphTwo !== "") ? (
                <p>Must be between 8-200 characters</p>
              ) : null}
            </p>
          </div>
          <textarea
            value={paragraphTwo}
            type="text"
            className="w-[70%] h-[5rem] border-[2px] border-gray-200 rounded-lg p-6 mt-1 text-[13px] placeholder:text-[12px] focus:outline-none"
            placeholder="Add a paragraph..."
            onChange={(e) => setParagraphTwo(e.target.value)}
          />
          <div className="w-[70%] flex flex-row items-center justify-between mt-5">
            <label
              htmlFor="username"
              className="text-[12px] text-primary font-semibold ml-2 mr-auto "
            >
              Paragraph one
            </label>

            <p className="text-[11px] text-secondary font-semibold mr-2 ml-auto">
              {isValidParagraphThree === false ||
              (paragraphThree.length > 500 && intro !== "") ? (
                <p>Must be between 8-200 characters</p>
              ) : null}
            </p>
          </div>
          <textarea
            value={paragraphThree}
            type="text"
            className="w-[70%] h-[5rem] border-[2px] border-gray-200 rounded-lg p-6 mt-1 text-[13px]  placeholder:text-[12px] focus:outline-none"
            placeholder="Add a paragraph..."
            onChange={(e) => setParagraphThree(e.target.value)}
          />
          <div className="mt-auto mb-12">
            <Button
              handleClick={handleSubmit}
              isDisabled={!isValidIntro}
              bgColour={isValidIntro ? "bg-secondary" : "bg-gray-300"}
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

export default CreateGgroupDescription;
