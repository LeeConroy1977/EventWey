import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserWrapper from "./UserWrapper";
import UserEventsPreview from "./UserEventsPreview";
import UserConnectionPreview from "./UserConnectionPreview";
import UserGroupsPreview from "./UserGroupsPreview";
import EventsOptions from "../../components/OptionsContainer";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const UserLayout: React.FC = () => {
  // const location = useLocation();
  // const isHomePage = location.pathname === "/user/home";
  const { isMobile } = useScreenWidth();

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-bgSecondary mt-0 tablet:mt-6">
      {!isMobile && <UserWrapper />}
      <EventsOptions />
      <main className="w-full tablet:w-[94%] desktop:w-[66%] min-h-screen flex items-center justify-center bg-bgSecondary ">
        {!isMobile && (
          <section className="w-[34%] tablet:w-[34%] desktop:w-[34%] h-[100%] flex flex-col items-center justify-start mt-8 ">
            <UserEventsPreview />
            <UserConnectionPreview />
            <UserGroupsPreview />
          </section>
        )}

        <section className="flex flex-col justify-start items-start w-full tablet:w-[66%] desktop:w-[66%] h-[100%] tablet:pl-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default UserLayout;
