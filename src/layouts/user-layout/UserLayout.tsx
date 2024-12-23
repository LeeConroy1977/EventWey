import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserWrapper from "./UserWrapper";
import UserEventsPreview from "./UserEventsPreview";
import UserConnectionPreview from "./UserConnectionPreview";
import UserGroupsPreview from "./UserGroupsPreview";
import EventsOptions from "../../components/OptionsContainer";

const UserLayout: React.FC = () => {
  // const location = useLocation();
  // const isHomePage = location.pathname === "/user/home";

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-bgSecondary mt-6">
      <UserWrapper />
      <EventsOptions />
      <main className="w-[66%] min-h-screen flex items-center justify-center bg-bgSecondary">
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
