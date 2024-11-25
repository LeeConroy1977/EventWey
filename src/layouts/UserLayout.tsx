import EventsOptions from "../components/EventOptions";

const UserLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-bgSecondary">
      <EventsOptions />
    </div>
  );
};

export default UserLayout;
