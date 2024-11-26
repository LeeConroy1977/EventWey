import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import EventsPreviewCard from "./EventsPreviewCard";

const UserEventsPreview = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // // change date to a date string in database
  // const previewArr = [...userEvents]
  //   .sort((a, b) => b.date.localeCompare(a.date))
  //   .slice(0, 3);

  // const eventsLength = userEvents.length;

  function handleNavigation() {
    navigate("/user/my-events");
  }

  return (
    <div className="w-[100%] h-[380px] flex flex-col rounded-lg bg-white p-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textPrimary">
          {/* Your Events(<span className="text-primary">{eventsLength}</span>) */}
        </h3>
        <p
          className="text-[12px] font-semibold text-primary cursor-pointer"
          onClick={handleNavigation}
        >
          Show all
        </p>
      </div>
      <div className="mt-4 space-y-2">
        {/* {previewArr &&
          previewArr.map((event) => {
            return <EventsPreviewCard event={event} key={event.id} />;
          })} */}
      </div>
    </div>
  );
};

export default UserEventsPreview;
