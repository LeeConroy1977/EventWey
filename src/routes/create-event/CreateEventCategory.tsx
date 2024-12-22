import { useEffect, useState } from "react";
import createGroup3 from "../../assets/images/createGroup3.jpeg";
import Button from "../../reuseable-components/Button";
import { useCreateEventContext } from "../../contexts/CreateEventContext";

const CreateGroupCategory = () => {
  const { nextStep, newEvent, setNewEvent, categories, getAllCatgories } =
    useCreateEventContext();
  const [eventCategory, setEventCategory] = useState<string>("");

  useEffect(() => {
    (async () => {
      await getAllCatgories();
    })();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEventCategory(e.target.value);
  };

  const handleSubmit = () => {
    if (eventCategory) {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        category: eventCategory.toLowerCase(),
      }));
      nextStep();
    }
  };

  console.log(eventCategory);

  return (
    <div className="flex flex-col items-center w-full h-full bg-bgPrimary rounded-lg">
      <main className="w-full h-full flex">
        <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden">
          <img
            src={createGroup3}
            alt="Sign Up Illustration"
            className="w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg"
          />
        </section>
        <section className="w-[50%] h-[100%] flex flex-col items-center rounded-lg">
          <h1 className="text-textPrimary text-[32px] font-semibold mt-12">
            Add a group type
          </h1>
          <h2 className="w-[70%] text-textPrimary text-[16px] font-semibold mt-8">
            * Add a group category.
          </h2>
          <div className="mt-12 w-[70%]">
            <label
              htmlFor="category"
              className="text-textPrimary font-semibold "
            >
              Group Category
            </label>
            <select
              id="category"
              value={eventCategory}
              onChange={handleCategoryChange}
              className="w-full mt-2 p-2 border-2 border-gray-300 rounded-lg text-textPrimary focus:outline-none"
              aria-label="Select Group Category"
            >
              <option value="" disabled>
                Select a category
              </option>
              {(categories || []).map((category, index) => (
                <option
                  key={index}
                  value={category}
                  className="bg-bgPrimary hover:bg-primary hover:text-white"
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-auto mb-12">
            <Button
              handleClick={handleSubmit}
              isDisabled={!eventCategory}
              bgColour={eventCategory ? "bg-secondary" : "bg-gray-300"}
              py="py-3"
              px="px-12"
              fontSize="text-14px"
            >
              Add category
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreateGroupCategory;
