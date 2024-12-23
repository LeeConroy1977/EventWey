import { useGroup } from "../../contexts/GroupContext";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import GroupEventCard from "./GroupEventCard";

const GroupEvents = () => {
  const { group, groupEvents } = useGroup();
  const handleEventClick = useHandleEventClick();

  const eventsLength = groupEvents.length;

  return (
    <div className="w-[100%] min-h-[8rem] bg-bgPrimary mt-8 rounded-lg p-10 pb-10">
      {group && (
        <>
          <h3 className="font-bold text-textPrimary text-[1rem] mb-8">
            Upcoming Events (
            <span className="text-primary">{eventsLength || 0}</span>)
          </h3>
          {groupEvents.length > 0 ? (
            groupEvents.map((event, i) => {
              return (
                <GroupEventCard
                  event={event}
                  key={i}
                  handleClick={handleEventClick}
                />
              );
            })
          ) : (
            <p>No Upcoming Events To Show...</p>
          )}
        </>
      )}
    </div>
  );
};

export default GroupEvents;
