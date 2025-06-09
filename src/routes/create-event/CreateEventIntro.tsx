import AdminGroupCard from "./AdminGroupCard";
import createGroup2 from "../../assets/images/createGroup2.jpeg";
import { useCreateEventContext } from "../../contexts/CreateEventContext";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import React from "react";
import {Group} from '../../types/group'


interface CreateEventIntroProps {
  adminGroups: Group[] | undefined;
  handleClick: (id: string) => void;
}

const CreateEventIntro: React.FC<CreateEventIntroProps> = ({ adminGroups }) => {
  const { setNewEvent, startEventCreation } = useCreateEventContext();
  const { isMobile } = useScreenWidth();

  function handleClick(id: string) {
    const selectedGroup = adminGroups?.find((group: Group) => (group!.id) === Number(id));
    setNewEvent(
      (prevEvent) =>
        (prevEvent = {
          ...prevEvent,
          group: Number(selectedGroup!.id),
         
        })
    );
    startEventCreation();
  }

  return (
    <div className="flex flex-col items-center mobile:w-[100%] tablet:w-[94%] desktop:w-[66%] mobile:h-[100%] tablet:h-[74%] desktop:h-[80%] bg-bgPrimary tablet:mt-[4rem] desktop:mt-[4.4rem] rounded-lg">
      <main className="w-[100%] h-[100%] flex mobile:flex-col tablet:flex-row mobile:p-6 tablet:p-0">
        {!isMobile && (
          <section className="w-[50%] h-[100%] p-0">
            <img
              src={createGroup2}
              alt="Sign Up"
              className="w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg"
            />
          </section>
        )}
        <section className="mobile:w-[100%] tablet:w-[50%] h-[100%] flex flex-col items-center ">
          <h1 className="text-textPrimary mobile:text-[17px] tablet:text-[20px] desktop:text-[28px] xl-screen:text-[30px] font-bold mobile:mt-2 tablet:mt-6 desktop:mt-12 mobile:mr-auto tablet:mr-0">
            Select the group hosting the event.
          </h1>
          <div className="w-[100%] min-h-[90%] tablet:mt-4 desktop:mt-8 overflow-y-auto scrollbar-hide mobile:p-0 tablet:p-8">
            {adminGroups?.map((group: Group) => {
              return (
                <AdminGroupCard
                  group={group}
                  key={group.id}
                  handleClick={handleClick}
                />
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreateEventIntro;
