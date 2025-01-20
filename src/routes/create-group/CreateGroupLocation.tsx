import { useState } from "react";
import Button from "../../reuseable-components/Button";
import { useCreateGroupContext } from "../../contexts/CreateGroupContext";
import EventMapContainer from "../../components/EventMapContainer";
import { useUser } from "../../contexts/UserContext";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

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
  const { isMobile } = useScreenWidth();

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
    <div className="flex flex-col items-center mobile:w-screen mobile:h-screen tablet:w-[100%]  tablet:h-[100%] bg-bgPrimary mobile:mt-0 rounded-lg">
      <main className="w-[100%] h-[100%] flex mobile:flex-col tablet:flex-row mobile:p-6 tablet:p-0">
        {!isMobile && (
          <section className="w-[50%] h-[100%] flex flex-col items-center overflow-hidden">
            <EventMapContainer
              lng={defaultLocation.lng}
              lat={defaultLocation.lat}
              placename={defaultLocation.placename}
              onLocationSelect={handleLocationSelect}
            />
          </section>
        )}
        <section className="mobile:w-[100%] tablet:w-[50%] tablet:h-[100%] flex flex-col items-center ">
          <h1 className="text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-2 tablet:mt-6 desktop:mt-12 mobile:mr-auto tablet:mr-0">
            Add a group location
          </h1>
          <h2 className=" mobile:w-[100%] tablet:w-[70%] text-textPrimary mobile:text-[13px] tablet:text-[13px] desktop:text-[16px]  font-medium mobile:mt-6 desktop:mt-8">
            * Click on the map and select your group location.
          </h2>
          {isMobile && (
            <section className="w-[100%] h-[360px] mt-6 flex flex-col items-center overflow-hidden">
              <EventMapContainer
                lng={defaultLocation.lng}
                lat={defaultLocation.lat}
                placename={defaultLocation.placename}
                onLocationSelect={handleLocationSelect}
              />
            </section>
          )}
          <div className="mobile:w-[100%] tablet:w-[70%] py-6 mobile:mt-0 desktop:mt-8">
            <p className="mobile:text-[14px] desktop:text-[16px]  text-textPrmary font-semibold  mr-auto ml-2 mt-6">
              Place name
            </p>
            <div className="w-[100%] h-[3rem] mobile:text-[14px] desktop:text-[16px] border-[1px] text-textPrmary font-medium border-gray-200 flex items-center justify-start mt-2 pl-4 rounded-lg ">
              {groupLocation.placename}
            </div>
            <p className="mobile:text-[14px] desktop:text-[16px]  text-textPrmary font-semibold  mr-auto ml-2 mt-8">
              Longitude
            </p>
            <div className="w-[100%] h-[3rem] mobile:text-[14px] desktop:text-[16px] border-[1px] text-textPrmary font-medium border-gray-200 flex items-center justify-start mt-2 pl-4 rounded-lg">
              {groupLocation.lng}
            </div>
            <p className="mobile:text-[14px] desktop:text-[16px]  text-textPrmary font-semibold  mr-auto ml-2 mt-8">
              Latitude
            </p>
            <div className="w-[100%] h-[3rem] mobile:text-[14px] desktop:text-[16px] border-[1px] text-textPrmary font-medium border-gray-200 flex items-center justify-start mt-2 pl-4 rounded-lg">
              {groupLocation.lat}
            </div>
          </div>

          <div className="mobile:mt-6 desktop:mt-auto mobile:mb-[70px] tablet:mb-8 desktop:mb-12">
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
