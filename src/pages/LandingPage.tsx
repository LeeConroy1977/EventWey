import { useState } from "react";
import LandingPageAdvert from "../components/LandingPageAdvert";
import LandingPageWrapper from "../components/LandingPageWrapper";
import EventDisplayContainer from "../reuseable-components/EventDisplayContainer";
import { useNavigate, useSearchParams } from "react-router-dom";

const LandingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sortBy") || ""
  );

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
    setSortBy(sortByValue);
    handleParams("sortBy", sortByValue);
    navigate(`/events?sortBy=${sortByValue}`);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start bg-bgPrimary mt-6 ">
      <LandingPageWrapper />
      <main className="w-[66%] flex flex-col items-center justify-start pb-8 ">
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
        <LandingPageAdvert />
      </main>
    </div>
  );
};

export default LandingPage;
