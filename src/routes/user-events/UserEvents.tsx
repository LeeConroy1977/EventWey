import { useSearchParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useEffect } from "react";
import useHandleEventClick from "../../hooks/useHandleEventClick";
import HomeEventsCard from "../events/HomeEventsCard";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";
import { ClipLoader } from "react-spinners";

const UserEvents = () => {
  const { userEvents, loading, error, getUserEvents } = useUser();
  const { isMobile } = useScreenWidth();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const date = searchParams.get("date");
  const sortBy = searchParams.get("sortBy");

  const handleEventClick = useHandleEventClick();

  useEffect(() => {
    const params = {
      category,
      date,
      sortBy,
    };
    // @ts-ignore
    getUserEvents(params);
  }, [category, date, sortBy]);

  return (
    <div className="w-full min-h-screen bg-bgSecondary px-6 desktop:px-0 pb-6">
      {isMobile && (
        <h2 className="text-[14px] font-bold text-textPrimary mb-4 mr-auto mt-4">
          Your events (
          <span className="text-primary">{userEvents?.length || 0}</span>)
        </h2>
      )}

      {loading ? (
        <div className="flex mobile:flex-col mobile:justify-start tablet:justify-center items-center mobile:mb-auto tablet:mb-0 mobile:h-screen tablet:h-[200px] mobile:mt-16 mt-8">
          <ClipLoader size={80} color={"#5d9b9b"} />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-4">{error}</div>
      ) : userEvents && userEvents.length > 0 ? (
        userEvents.map((event) => (
          <HomeEventsCard
            // @ts-ignore
            event={event}
            key={event.id}
            handleClick={handleEventClick}
          />
        ))
      ) : (
        !loading && (
          <div className="text-center text-gray-500 mt-4">No events found.</div>
        )
      )}
    </div>
  );
};

export default UserEvents;
