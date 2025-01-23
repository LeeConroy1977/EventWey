import { useGroup } from "../../contexts/GroupContext";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import GroupEventCard from "./GroupEventCard";

const GroupEvents = () => {
  const { group, groupEvents } = useGroup();
  const handleEventClick = useHandleEventClick();

  const eventsLength = groupEvents.length;

  return (
    <div className="w-[100%] min-h-[8rem] bg-bgPrimary  mt-0 tablet:mt-8 rounded-lg tablet:p-6  desktop:p-10 desktop:pb-10">
      {group && (
        <>
          <h3 className="text-[14px] desktop:text-[1rem] xl-screen:text-[18px] font-bold text-textPrimary mr-auto  mt-6 tablet:mt-0.5">
            Upcoming Events (
            <span className="text-primary">{eventsLength || 0}</span>)
          </h3>
          {groupEvents.length > 0 ? (
            groupEvents.map((event, i) => {
              return (
                <GroupEventCard
                  // @ts-ignore
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
