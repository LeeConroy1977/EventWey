import { useEffect, useState } from "react";
import Button from "../../reuseable-components/Button";
import { useCreateEventContext } from "../../contexts/CreateEventContext";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const CreateGroupDescription = () => {
  const { nextStep, setNewEvent } = useCreateEventContext();
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
  const { isMobile } = useScreenWidth();

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
      setNewEvent(
        (prevEvent) =>
          (prevEvent = {
            ...prevEvent,
            description: [intro, paragraphOne, paragraphTwo, paragraphThree],
          })
      );
      nextStep();
    }
  }
  return (
    <div className="flex flex-col items-center mobile:w-screen mobile:h-screen tablet:w-[100%]  tablet:h-[100%] bg-bgPrimary mobile:mt-0 rounded-lg">
      <main className="w-[100%] h-[100%] flex mobile:flex-col tablet:flex-row mobile:p-6 tablet:p-0">
        {!isMobile && (
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
        )}
        <section className="mobile:w-[100%] tablet:w-[50%] tablet:h-[100%] flex flex-col items-center ">
          <h1 className="text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-2 tablet:mt-6 desktop:mt-12 mobile:mr-auto tablet:mr-0">
            Add an event description
          </h1>
          {isMobile && (
            <section className="mobile:w-[100%]  h-[400px] flex flex-col items-center ">
              <h1 className=" mobile:w-[100%] tablet:w-[70%] text-textPrimary mobile:text-[13px] tablet:text-[13px] desktop:text-[16px]  font-medium mobile:mt-6 desktop:mt-8">
                Description Preview
              </h1>
              <div className="w-[100%] h-[70%] rounded-lg border-[1px] border-primary mt-6 p-6">
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
          )}
          <h2 className=" mobile:w-[100%] tablet:w-[70%] text-textPrimary mobile:text-[13px] tablet:text-[13px] desktop:text-[16px]  font-medium mobile:mt-0 tablet:mt-8">
            * Add an intro sentence and optional paragraphs.
          </h2>
          <div className="mobile:w-[100%] tablet:w-[70%] flex flex-row items-center justify-between mobile:mt-8 tablet:mt-6">
            <label
              htmlFor="username"
              className="mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] xl-screen:text-[14px]  text-primary font-semibold ml-2 mr-auto "
            >
              Intro
            </label>

            <p className=" mobile:mr-auto tablet:mr-0 tablet:ml-auto mr-2 font-semibold mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] text-secondary">
              {isValidIntro === false ||
              (intro.length < 8 && isIntroBlur) ||
              intro.length > 200 ? (
                <p>Must be between 8-200 characters</p>
              ) : null}
            </p>
          </div>
          <textarea
            value={intro}
            className="mobile:w-[100%] tablet:w-[70%] h-[5rem] xl-screen:h-[5.4rem] border-[2px] border-gray-200 rounded-lg p-4 mobile:mt-[1rem] tablet:mt-2  mobile:placeholder:text-[12px] desktop:placeholder:text-[14px] focus:outline-none mobile:text-[14px] desktop:text-[16px]"
            placeholder="Add an intro..."
            onChange={(e) => setIntro(e.target.value)}
            onBlur={() => handleIntroBlur()}
          />
          <div className="mobile:w-[100%] tablet:w-[70%] flex flex-row items-center justify-between mobile:mt-8 tablet:mt-4 ">
            <label
              htmlFor="username"
              className="mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] xl-screen:text-[14px]  text-primary font-semibold ml-2 mr-auto "
            >
              Paragraph one
            </label>

            <p className=" mobile:mr-auto tablet:mr-0 tablet:ml-auto mr-2 font-semibold mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] text-secondary">
              {isValidParagraphOne === false ||
              (paragraphOne.length > 500 && paragraphOne !== "") ? (
                <p>Must be between 8-200 characters</p>
              ) : null}
            </p>
          </div>
          <textarea
            value={paragraphOne}
            className="mobile:w-[100%] tablet:w-[70%] h-[5rem] xl-screen:h-[5.4rem]  border-[2px] border-gray-200 rounded-lg p-4 mobile:mt-[1rem] tablet:mt-2  mobile:placeholder:text-[12px] desktop:placeholder:text-[14px] focus:outline-none mobile:text-[14px] desktop:text-[16px]"
            placeholder="Add a paragraph..."
            onChange={(e) => setParagraphOne(e.target.value)}
          />

          <div className="mobile:w-[100%] tablet:w-[70%] flex flex-row items-center justify-between mobile:mt-8 tablet:mt-4">
            <label
              htmlFor="username"
              className="mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] xl-screen:text-[14px]  text-primary font-semibold ml-2 mr-auto "
            >
              Paragraph two
            </label>

            <p className=" mobile:mr-auto tablet:mr-0 tablet:ml-auto mr-2 font-semibold mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] text-secondary">
              {isValidParagraphTwo === false ||
              (paragraphTwo.length > 500 && paragraphTwo !== "") ? (
                <p>Must be between 8-200 characters</p>
              ) : null}
            </p>
          </div>
          <textarea
            value={paragraphTwo}
            className="mobile:w-[100%] tablet:w-[70%] h-[5rem] xl-screen:h-[5.4rem]  border-[2px] border-gray-200 rounded-lg p-4 mobile:mt-[1rem] tablet:mt-2  mobile:placeholder:text-[12px] desktop:placeholder:text-[14px] focus:outline-none mobile:text-[14px] desktop:text-[16px]"
            placeholder="Add a paragraph..."
            onChange={(e) => setParagraphTwo(e.target.value)}
          />
          <div className="mobile:w-[100%] tablet:w-[70%] flex flex-row items-center justify-between mobile:mt-8 tablet:mt-4">
            <label
              htmlFor="username"
              className="mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] xl-screen:text-[14px]  text-primary font-semibold ml-2 mr-auto "
            >
              Paragraph three
            </label>

            <p className=" mobile:mr-auto tablet:mr-0 tablet:ml-auto mr-2 font-semibold mobile:text-[12px] tablet:text-[11px] desktop:text-[12px] text-secondary">
              {isValidParagraphThree === false ||
              (paragraphThree.length > 500 && intro !== "") ? (
                <p>Must be between 8-200 characters</p>
              ) : null}
            </p>
          </div>
          <textarea
            value={paragraphThree}
            className="mobile:w-[100%] tablet:w-[70%] h-[5rem] xl-screen:h-[5.4rem]  border-[2px] border-gray-200 rounded-lg p-4 mobile:mt-[1rem] tablet:mt-2 mobile:placeholder:text-[12px] desktop:placeholder:text-[14px] focus:outline-none mobile:text-[14px] desktop:text-[16px]"
            placeholder="Add a paragraph..."
            onChange={(e) => setParagraphThree(e.target.value)}
          />
          <div className="mobile:mt-10 tablet:mt-6 desktop:mt-auto mb-12">
            <Button
              handleClick={handleSubmit}
              isDisabled={!isValidIntro}
              bgColour={isValidIntro ? "bg-secondary" : "bg-gray-300"}
              py="py-3"
              px="px-12"
              fontSize="text-14px"
            >
              Add despcription
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreateGroupDescription;
