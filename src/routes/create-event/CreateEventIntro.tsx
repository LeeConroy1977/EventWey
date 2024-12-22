
import AdminGroupCard from "./AdminGroupCard";
import createGroup2 from "../../assets/images/createGroup2.jpeg";
import { useCreateEventContext } from "../../contexts/CreateEventContext";
const CreateEventIntro = ({ adminGroups }) => {
  const { dispatch, setNewEvent, startEventCreation } = useCreateEventContext();
  function handleClick(id) {
    const selectedGroup = adminGroups.find((group) => group.id === id);
    setNewEvent(
      (prevEvent) =>
        (prevEvent = {
          ...prevEvent,
          groupId: selectedGroup.id,
          groupName: selectedGroup.name,
        })
    );
    startEventCreation();
  }

  return (
    <div className="flex flex-col items-center w-[66%] h-[80%] bg-bgPrimary mt-[4rem] rounded-lg">
      <main className="w-full h-[100%] flex items-center bg-bgPrimary">
        <section className="w-[50%] h-[100%] p-0">
          <img
            src={createGroup2}
            alt="Sign Up"
            className="w-[100%] h-[100%] rounded-tl-lg rounded-bl-lg"
          />
        </section>
        <section className="w-[50%] h-[100%] flex flex-col items-center justify-center p-8">
          <h1 className="text-textPrimary text-[26px] font-bold mt-6">
            Select the group hosting the event.
          </h1>
          <div className="w-[100%] min-h-[90%] mt-8 overflow-y-auto scrollbar-hide">
            {adminGroups.map((group) => {
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
