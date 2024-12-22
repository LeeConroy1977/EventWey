import { useEffect, useState } from "react";
import Button from "../../reuseable-components/Button";
import createGroup1 from "../../assets/images/createGroup1.jpeg";
import { useCreateGroupContext } from "../../contexts/CreateGroupContext";
import { useCreateEventContext } from "../../contexts/CreateEventContext";

const CreateEventTitle = () => {
  const { nextStep, newEvent, setNewEvent } = useCreateEventContext();
  const [isValidTitle, setIsValidTitle] = useState<boolean | null>(null);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    handlePreviewTitle();
  }, [title]);

  function handlePreviewTitle() {
    if (title.length > 2 && title.length < 40) {
      setIsValidTitle(true);
    } else {
      setIsValidTitle(false);
    }
  }

  function handleSubmit() {
    if (isValidTitle) {
      setNewEvent((prevEvent) => ({ ...prevEvent, title }));
      nextStep();
    }

    return;
  }

  return (
    <div className="flex flex-col items-center w-full h-full bg-bgPrimary rounded-lg">
      <main className="w-full h-full flex">
        <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden">
          <img
            src={createGroup1}
            alt="Sign Up"
            className="w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg"
          />
        </section>
        <section className="w-[50%] h-[100%] flex flex-col items-center rounded-lg">
          <h1 className="text-textPrimary text-[32px] font-semibold mt-12">
            Add an event title...
          </h1>
          <h2 className="w-[70%] text-textPrimary text-[16px] font-medium mt-8">
            * Add a title for your event.
          </h2>
          <div className="w-[80%] h-[34%] rounded-lg bg-gray-100 border-2 border-gray-200 mt-10 overflow-hidden">
            <p className="text-[16px] font-medium p-6">{title}</p>
          </div>
          <div className="w-[70%] h-[1rem] flex text-[12px] text-secondary mt-[3rem]">
            <p className="  ml-auto mr-2 text-[12px] text-secondary">
              {isValidTitle === false && title.length > 40
                ? "Group name must be between 2-40 characters."
                : ""}
            </p>
          </div>
          <input
            value={title}
            type="text"
            className="w-[70%] h-[3rem] border-[2px] border-gray-200 rounded-lg pl-4 mt-[1rem] placeholder:text-[14px] focus:outline-none"
            placeholder="Add a group name..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="mt-auto mb-12">
            <Button
              handleClick={handleSubmit}
              isDisabled={!isValidTitle}
              bgColour={isValidTitle ? "bg-secondary" : "bg-gray-300"}
              py="py-3"
              px="px-12"
              fontSize="text-14px"
            >
              Add event title
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreateEventTitle;
