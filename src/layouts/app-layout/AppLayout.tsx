import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const AppLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex justify-center bg-bgSecondary font-poppins">
      <NavBar />
      <main className="w-full min-h-screen mt-[2.3rem] flex justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
