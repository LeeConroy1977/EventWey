import { useEffect, useState } from "react";
import createGroup3 from "../../assets/images/createGroup3.jpeg";
import { useCreateGroupContext } from "../../contexts/CreateGroupContext";
import Button from "../../reuseable-components/Button";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const CreateGroupType = () => {
  const { nextStep, setNewGroup, categories, getAllCategories } =
    useCreateGroupContext();
  const [groupCategory, setGroupCategory] = useState<string>("");
  const [groupAccess, setGroupAccess] = useState<string>("");
  const { isMobile } = useScreenWidth();

  useEffect(() => {
    getAllCategories();
  }, []);
  console.log(categories);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupCategory(e.target.value);
  };

  const handleSubmit = () => {
    if (groupCategory && groupAccess) {
      setNewGroup((prevGroup) => ({
        ...prevGroup,
        category: groupCategory.toLowerCase(),
        access: groupAccess,
        openAccess: groupAccess === "public" ? true : false,
      }));
      nextStep();
    }
  };

  return (
    <div className="flex flex-col items-center mobile:w-screen mobile:h-screen tablet:w-[100%]  tablet:h-[100%] bg-bgPrimary mobile:mt-0 rounded-lg">
      <main className="w-[100%] h-[100%] flex mobile:flex-col tablet:flex-row mobile:p-6 tablet:p-0">
        {!isMobile && (
          <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden">
            <img
              src={createGroup3}
              alt="Sign Up Illustration"
              className="w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg"
            />
          </section>
        )}
        <section className="mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center ">
          <h1 className="text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-2 tablet:mt-6 desktop:mt-12 mobile:mr-auto tablet:mr-0">
            Add a group type
          </h1>
          <h2 className=" mobile:w-[100%] tablet:w-[70%] text-textPrimary mobile:text-[13px] tablet:text-[13px] desktop:text-[16px]  font-medium mobile:mt-6 desktop:mt-8">
            * Add a group category.
          </h2>
          <div className=" mt-12 w-[70%] ">
            <label
              htmlFor="category"
              className="text-textPrimary font-semibold mobile:text-[14px] desktop:text-[16px]"
            >
              Group Category
            </label>
            <div className="relative w-full mobile:text-[14px] desktop:text-[16px]">
              <select
                id="category"
                value={groupCategory}
                onChange={handleCategoryChange}
                className="w-full mt-2 p-2 border-2 border-gray-300 rounded-lg text-textPrimary focus:outline-none"
                aria-label="Select Group Category"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <option
                  value=""
                  disabled
                  className="bg-bgPrimary hover:bg-primary hover:text-white w-[70%] "
                >
                  Select a category
                </option>
                {categories?.map((category, index) => (
                  <option
                    key={index}
                    value={category}
                    className="bg-bgPrimary hover:bg-primary hover:text-white "
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-8 w-[70%] mobile:text-[14px] desktop:text-[16px]">
            <label
              htmlFor="access"
              className="text-textPrimary font-semibold mobile:text-[14px] desktop:text-[16px] "
            >
              Group Access
            </label>
            <select
              id="access"
              value={groupAccess}
              onChange={(e) => setGroupAccess(e.target.value)}
              className="w-full mt-2 p-2 border-2 border-gray-300 rounded-lg text-textPrimary focus:outline-none "
              aria-label="Select Group Access"
            >
              <option value="" disabled>
                Select access type
              </option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="mt-auto mobile:mb-[70px] tablet:mb-8 desktop:mb-12">
            <Button
              handleClick={handleSubmit}
              isDisabled={!groupCategory || !groupAccess}
              bgColour={
                groupCategory && groupAccess ? "bg-secondary" : "bg-gray-300"
              }
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

export default CreateGroupType;
