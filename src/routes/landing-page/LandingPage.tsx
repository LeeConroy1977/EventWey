import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LandingPageWrapper from "./LandingPageWrapper";
import EventDisplayContainer from "../../reuseable-components/EventDisplayContainer";
import LandingPageAdvert from "./LandingPageAdvert";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const LandingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isMobile } = useScreenWidth();
  const [setSortBy] = useState<string>(searchParams.get("sortBy") || "");

  const navigate = useNavigate();

  const handleParams = (paramOption: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set(paramOption, value);
    } else {
      newParams.delete(paramOption);
    }
    setSearchParams(newParams);
  };

  const handleSortByOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortByValue = e.target.value;
    // @ts-ignore
    setSortBy(sortByValue);
    handleParams("sortBy", sortByValue);
    navigate(`/events?sortBy=${sortByValue}`);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start bg-bgPrimary mt-0 ">
      <LandingPageWrapper />
      <main className="w-full tablet:w-[86%] desktop:w-[66%] flex flex-col items-center justify-start pb-8 px-6 tablet:px-0 desktop:mt-8 ">
        <EventDisplayContainer
          title="Popular events"
          sortBy="popular"
          listName="popular"
          handleClick={handleSortByOption}
        />
        <EventDisplayContainer
          title="Upcoming events"
          sortBy="date"
          listName="upcoming"
          handleClick={handleSortByOption}
        />
        <EventDisplayContainer
          title="Free events"
          sortBy="free"
          listName="free"
          handleClick={handleSortByOption}
        />
        {!isMobile && <LandingPageAdvert />}
      </main>
    </div>
  );
};

export default LandingPage;
