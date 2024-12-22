import { useState } from "react";
import Button from "../../reuseable-components/Button";
import EventMapContainer from "../../components/EventMapContainer";
import { useUser } from "../../contexts/UserContext";
import { useCreateEventContext } from "../../contexts/CreateEventContext";

const defaultLocation = {
  placename: "Weymouth",
  lng: -2.4512,
  lat: 50.6105,
};

const CreateEventLocation = () => {
  const {
    nextStep,
    setNewEvent,
    newEvent,
    createEvent,
    finishCreateEvent,
    resetEvent,
  } = useCreateEventContext();
  const [eventLocation, setEventLocation] = useState(defaultLocation);
  const { user } = useUser();

  const handleLocationSelect = (
    lat: number,
    lng: number,
    placename: string
  ) => {
    setEventLocation({ placename, lat, lng });
  };

  async function handleSubmit() {
    if (!user || !user.id) {
      console.error("User is not logged in or missing an ID.");
      return;
    }

    const updatedEvent = {
      ...newEvent,
      location: { ...eventLocation },
      creationDate: new Date().toISOString(),
    };

    setNewEvent(updatedEvent);

    try {
      await createEvent(updatedEvent);
      resetEvent();
      finishCreateEvent();
    } catch (error) {
      console.error("Failed to create Event:", error);
    }
  }

  console.log(eventLocation);
  return (
    <div className="flex flex-col items-center w-full h-full bg-bgPrimary rounded-lg">
      <main className="w-full h-full flex">
        <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden">
          <EventMapContainer
            lng={defaultLocation.lng}
            lat={defaultLocation.lat}
            placename={defaultLocation.placename}
            onLocationSelect={handleLocationSelect}
          />
        </section>
        <section className="w-[50%] h-[100%] flex flex-col items-center rounded-lg">
          <h1 className="text-textPrimary text-[32px] font-semibold mt-12">
            Add an event location
          </h1>
          <h2 className="w-[70%] text-textPrimary text-[16px] font-semibold mt-8">
            * Click on the map and select your event location.
          </h2>

          <div className="w-[70%] py-6 mt-8">
            <p className="  text-textPrmary font-semibold  mr-auto ml-2 mt-6">
              Place name
            </p>
            <div className="w-[100%] h-[3rem] border-[1px] text-textPrmary font-medium border-gray-200 flex items-center justify-start mt-2 pl-4 rounded-lg ">
              {eventLocation.placename}
            </div>
            <p className="  text-textPrmary font-semibold  mr-auto ml-2 mt-8">
              Longitude
            </p>
            <div className="w-[100%] h-[3rem] border-[1px] text-textPrmary font-medium border-gray-200 flex items-center justify-start mt-2 pl-4 rounded-lg">
              {eventLocation.lng}
            </div>
            <p className="  text-textPrmary font-semibold  mr-auto ml-2 mt-8">
              Latitude
            </p>
            <div className="w-[100%] h-[3rem] border-[1px] text-textPrmary font-medium border-gray-200 flex items-center justify-start mt-2 pl-4 rounded-lg">
              {eventLocation.lat}
            </div>
          </div>

          <div className="mt-auto mb-12">
            <Button
              handleClick={handleSubmit}
              bgColour={"bg-secondary"}
              py="py-3"
              px="px-12"
              fontSize="text-14px"
            >
              Submit group
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreateEventLocation;
