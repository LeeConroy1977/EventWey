import EventsOptions from "../components/OptionsContainer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import VistorWrapper from "../components/VistorWrapper";
import VistorSignUpAdvert from "../components/VistorSignUpAdvert";
import VistorCreateEventAdvert from "../components/VistorCreateEventAdvert";

const VistorLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-bgSecondary mt-6">
      <VistorWrapper />
      <EventsOptions />
      <main className="w-[66%] min-h-screen flex items-center justify-center bg-bgSecondary">
        <section className="w-[34%] h-[100%] flex flex-col items-center justify-start p-4">
          <VistorSignUpAdvert />
          <VistorCreateEventAdvert />
        </section>
        <section className="flex flex-col justify-start items-start w-[66%] h-[100%]">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default VistorLayout;
