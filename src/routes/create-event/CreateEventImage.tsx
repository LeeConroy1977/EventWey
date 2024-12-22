import { useEffect, useState } from "react";
import Button from "../../reuseable-components/Button";
import createGroup2 from "../../assets/images/createGroup2.jpeg";
import { useCreateEventContext } from "../../contexts/CreateEventContext";

const CreateEventImage = () => {
  const { nextStep, setNewEvent } = useCreateEventContext();
  const [showImage, setShowImage] = useState<boolean>(false);
  const [isValidImage, setIsValidImage] = useState<boolean | null>(null);
  const [eventImage, setEventImage] = useState<string>("");

  useEffect(() => {
    handlePreviewImage();
  }, [eventImage]);

  function handlePreviewImage() {
    if (
      eventImage &&
      (eventImage.endsWith(".jpg") ||
        eventImage.endsWith(".jpeg") ||
        eventImage.endsWith(".png"))
    ) {
      setIsValidImage(true);
      setShowImage(true);
    } else {
      setIsValidImage(false);
      setShowImage(false);
    }
  }

  function handleSubmit() {
    if (isValidImage) {
      setNewEvent((prevEvent) => ({ ...prevEvent, image: eventImage }));
      nextStep();
    }
  }
  return (
    <div className="flex flex-col items-center w-full h-full bg-bgPrimary rounded-lg">
      <main className="w-full h-full flex">
        <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden">
          <img
            src={createGroup2}
            alt="Sign Up"
            className="w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg"
          />
        </section>
        <section className="w-[50%] h-[100%] flex flex-col items-center rounded-lg">
          <h1 className="text-textPrimary text-[32px] font-semibold mt-12">
            Add an event picture
          </h1>
          <h2 className="w-[70%] text-textPrimary text-[16px] font-medium mt-8">
            * Please provide a valid image URL ending with the file extension
            .jpg or .png
          </h2>
          <div className="w-[80%] h-[34%] rounded-lg bg-gray-100 border-2 border-gray-200 mt-10 overflow-hidden">
            {showImage && eventImage ? (
              <img
                src={eventImage}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-400 text-center mt-[50%]">
                Image Preview
              </p>
            )}
          </div>
          <div className="w-[70%] h-[1rem] flex text-[12px] text-secondary mt-[3rem]">
            <p className="  ml-auto mr-2 text-[12px] text-secondary">
              {isValidImage === false && eventImage.length !== 0
                ? "Image must end in .jpg, .jpeg, or .png"
                : ""}
            </p>
          </div>
          <input
            value={eventImage}
            type="text"
            className="w-[70%] h-[3rem] border-[2px] border-gray-200 rounded-lg pl-4 mt-[1rem] placeholder:text-[14px] focus:outline-none"
            placeholder="Add an image address"
            onChange={(e) => setEventImage(e.target.value)}
          />
          <div className="mt-auto mb-12">
            <Button
              handleClick={handleSubmit}
              isDisabled={!isValidImage}
              bgColour={isValidImage ? "bg-secondary" : "bg-gray-300"}
              py="py-3"
              px="px-12"
              fontSize="text-14px"
            >
              Add event image
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreateEventImage;
