import { Outlet } from "react-router-dom";
import VistorWrapper from "./VistorWrapper";
import VistorSignUpAdvert from "./VistorSignUpAdvert";
import VistorCreateEventAdvert from "./VistorCreateEventAdvert";
import EventsOptions from "../../components/OptionsContainer";
import { useScreenWidth } from "../../contexts/ScreenWidthContext";

const VistorLayout: React.FC = () => {
  const { isMobile } = useScreenWidth();
  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-bgSecondary mt-0 desktop:mt-6">
      {!isMobile && <VistorWrapper />}
      <EventsOptions />
      <main className="w-screen tablet:w-[86%] desktop:w-[76%] min-h-screen flex items-center justify-center bg-bgSecondary mt-6 tablet:mt-0">
        {!isMobile && (
          <section className="w-[34%] h-[100%] flex flex-col items-center justify-start p-4">
            <VistorSignUpAdvert />
            <VistorCreateEventAdvert />
          </section>
        )}

        <section className="flex flex-col justify-start items-start w-screen tablet:w-[86%]  desktop:w-[66%] h-auto desktop:h-[100%] ">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default VistorLayout;
