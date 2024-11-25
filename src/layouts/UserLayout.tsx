import EventsOptions from "../components/EventOptions";
import UserWrapper from "../components/UserWrapper";

const UserLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-bgSecondary">
      <UserWrapper />
      <EventsOptions />
    </div>
  );
};

export default UserLayout;
