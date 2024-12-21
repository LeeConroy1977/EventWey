import { useState } from "react";
import Button from "../../reuseable-components/Button";
import { useCreateGroupContext } from "../../contexts/CreateGroupContext";
import EventMapContainer from "../../components/EventMapContainer";
import { useUser } from "../../contexts/UserContext";

const defaultLocation = {
  placename: "Weymouth",
  lng: -2.4512,
  lat: 50.6105,
};

const CreateGroupLocation = () => {
  const {
    nextStep,
    setNewGroup,
    newGroup,
    createGroup,
    finishCreateGroup,
    resetGroup,
  } = useCreateGroupContext();
  const [groupLocation, setGroupLocation] = useState(defaultLocation);
  const { user } = useUser();

  const handleLocationSelect = (
    lat: number,
    lng: number,
    placename: string
  ) => {
    setGroupLocation({ placename, lat, lng });
  };

  async function handleSubmit() {
    if (!user || !user.id) {
      console.error("User is not logged in or missing an ID.");
      return;
    }

    const updatedGroup = {
      ...newGroup,
      location: { ...groupLocation },
      creationDate: new Date().toISOString(),
      groupAdmin: [user.id],
      members: [user.id],
    };

    setNewGroup(updatedGroup);

    try {
      await createGroup(updatedGroup);
      resetGroup();
      finishCreateGroup();
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  }

  console.log(groupLocation);
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
            Add a group location
          </h1>
          <h2 className="w-[70%] text-textPrimary text-[16px] font-semibold mt-8">
            * Click on the map and select your group location.
          </h2>

          <div className="w-[70%] py-6 mt-8">
            <p className="  text-textPrmary font-semibold  mr-auto ml-2 mt-6">
              Place name
            </p>
            <div className="w-[100%] h-[3rem] border-[1px] text-textPrmary font-medium border-gray-200 flex items-center justify-start mt-2 pl-4 rounded-lg ">
              {groupLocation.placename}
            </div>
            <p className="  text-textPrmary font-semibold  mr-auto ml-2 mt-8">
              Longitude
            </p>
            <div className="w-[100%] h-[3rem] border-[1px] text-textPrmary font-medium border-gray-200 flex items-center justify-start mt-2 pl-4 rounded-lg">
              {groupLocation.lng}
            </div>
            <p className="  text-textPrmary font-semibold  mr-auto ml-2 mt-8">
              Latitude
            </p>
            <div className="w-[100%] h-[3rem] border-[1px] text-textPrmary font-medium border-gray-200 flex items-center justify-start mt-2 pl-4 rounded-lg">
              {groupLocation.lat}
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

export default CreateGroupLocation;
