import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";
import MobileNavOptions from "./MobileNavOptions";

const AppLayout: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="w-full min-h-screen flex justify-center bg-bgSecondary font-poppins">
      <NavBar
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
      />
      <main className="w-full min-h-screen mt-[2.3rem] flex justify-center">
        {isMobileNavOpen ? (
          // @ts-ignore
          <MobileNavOptions setIsMobileNavOpen={setIsMobileNavOpen} />
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default AppLayout;
