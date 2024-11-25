import EventsOptions from "../components/EventOptions";
import UserWrapper from "../components/UserWrapper";
import { Outlet, useLocation } from "react-router-dom";

const UserLayout: React.FC = () => {
  const isHomePage = location.pathname === "/user/home";
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-bgSecondary">
      <UserWrapper />
      {isHomePage && <EventsOptions />}
      <main className="w-[80%] min-h-screen flex items-center justify-center bg-bgSecondary">
        <section className="flex flex-col justify-center w-[66%]">
          <Outlet />
        </section>
        <section className="w-[34%] h-[100%] flex flex-col items-center justify-start p-4">
          {/* <UserEventsPreview />
          <UserConnectionsPreview />
          <UserGroupsPreview /> */}
        </section>
      </main>
    </div>
  );
};

export default UserLayout;
