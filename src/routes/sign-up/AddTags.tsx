import { useEffect, useState } from "react";
import { useCreateUserContext } from "../../contexts/CreateUserContext";
import Button from "../../reuseable-components/Button";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const AddTags = () => {
  const { patchUser, getTags, categoryTags, finishSignUp } =
    useCreateUserContext();
  const [isValidTags, setIsValidTags] = useState<boolean | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { isMobile } = useScreenWidth();

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    handleValidTags();
  }, [tags]);

  function handleValidTags() {
    if (tags.length > 2) {
      setIsValidTags(true);
    } else {
      setIsValidTags(false);
    }
  }

  function handleSubmit() {
    if (isValidTags) {
      patchUser("tags", tags);
    }

    finishSignUp();
  }
  function handleTagClick(name: string) {
    const isSelected = selectedTags.includes(name);

    if (isSelected) {
      setSelectedTags(selectedTags.filter((tag) => tag !== name));
      setTags(tags.filter((tag) => tag !== name));
    } else {
      setSelectedTags([...selectedTags, name]);
      setTags([...tags, name]);
    }
  }

  return (
    <div className="flex flex-col items-center mobile:w-screen mobile:h-screen tablet:w-[100%]  tablet:h-[100%] bg-bgPrimary mobile:mt-0 rounded-lg">
      <main className="w-[100%] h-[100%] flex mobile:flex-col tablet:flex-row mobile:p-6 tablet:p-0">
        {!isMobile && (
          <section className="w-[50%] h-[90%] flex flex-col items-center justify-center my-auto">
            <div className="w-[84%] tablet:h-[600px] desktop:h-[680px] xl-screen:h-[680px] flex justify-start items-start flex-wrap gap-3 p-6 rounded-lg bg-bgPrimary border-2 border-gray-200  overflow-y-scroll">
              {categoryTags
                .sort((a, b) => a.localeCompare(b))
                .map((tag, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center text-textPrimary text-[10px] font-semibold px-4 py-2 rounded-full border-[1px] border-gray-200 cursor-pointer ${
                      selectedTags.includes(tag)
                        ? "bg-primary text-white"
                        : "bg-bgSecondary"
                    }`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </div>
                ))}
            </div>
          </section>
        )}
        <section className="mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center ">
          <h1 className="text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-2 tablet:mt-6 desktop:mt-12 mobile:mr-auto tablet:mr-0">
            What are you interested in?
          </h1>
          <h2 className=" mobile:w-[100%] tablet:w-[70%] text-textPrimary mobile:text-[13px] tablet:text-[13px] desktop:text-[16px]  font-medium mobile:mt-6 desktop:mt-8">
            * Select at least 3 tags.
          </h2>

          {isMobile ? (
            <div className="w-[100%] h-[340px] flex justify-start items-start flex-wrap gap-3 p-4 rounded-lg bg-bgPrimary border-2 border-gray-200 mt-8 overflow-y-scroll">
              {categoryTags
                .sort((a, b) => a.localeCompare(b))
                .map((tag, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center text-textPrimary text-[9px] font-semibold px-3 py-2 rounded-full border-[1px] border-gray-200 cursor-pointer ${
                      selectedTags.includes(tag)
                        ? "bg-primary text-white"
                        : "bg-bgSecondary"
                    }`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </div>
                ))}
            </div>
          ) : (
            <div className=" tablet:w-[70%] tablet:h-[300px] desktop:h-[400px] flex flex-wrap gap-2 items-start bg-bgPrimary p-4 mt-10 border-2 border-gray-200 rounded-lg overflow-y-auto">
              <div className="h-auto  flex flex-wrap gap-3 items-start ">
                {tags?.map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center text-textPrimary text-[10px] font-semibold px-4 py-2 bg-bgSecondary rounded-full border-[1px] border-gray-200 cursor-pointer"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto mobile:mb-[70px] tablet:mb-8 desktop:mb-12">
            <Button
              handleClick={handleSubmit}
              isDisabled={!isValidTags}
              bgColour={isValidTags ? "bg-secondary" : "bg-gray-300"}
              py="py-3"
              px="px-12"
              fontSize="text-14px"
            >
              Finish
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AddTags;
