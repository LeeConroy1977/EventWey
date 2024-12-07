import LandingPageAdvert from "../components/LandingPageAdvert";
import LandingPageWrapper from "../components/LandingPageWrapper";
import EventDisplayContainer from "../reuseable-components/EventDisplayContainer";

const LandingPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start bg-bgPrimary mt-6 ">
      <LandingPageWrapper />
      <main className="w-[76%] flex flex-col items-center justify-start pb-8 ">
        <EventDisplayContainer title="Popular events" sortBy="popular" />
        <EventDisplayContainer title="Upcoming events" sortBy="date" />
        <EventDisplayContainer title="Free events" sortBy="Free" />
        <LandingPageAdvert />
      </main>
    </div>
  );
};

export default LandingPage;
