import EventsOptions from "../components/OptionsContainer";
import UserConnectionPreview from "../components/UserConnectionPreview";
import UserConnectionsPreview from "../components/UserConnectionPreview";
import UserEventsPreview from "../components/UserEventsPreview";
import UserGroupsPreview from "../components/UserGroupsPreview";
import UserWrapper from "../components/UserWrapper";
import { Outlet, useLocation } from "react-router-dom";

const UserLayout: React.FC = () => {
  // const location = useLocation();
  // const isHomePage = location.pathname === "/user/home";
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-bgSecondary">
      <UserWrapper />
      <EventsOptions />
      <main className="w-[76%] min-h-screen flex items-center justify-center bg-bgSecondary">
        <section className="w-[34%] h-[100%] flex flex-col items-center justify-start p-4">
          <UserEventsPreview />
          <UserConnectionPreview />
          <UserGroupsPreview />
        </section>
        <section className="flex flex-col justify-start items-start w-[66%] h-[100%]">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default UserLayout;
