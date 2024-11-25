import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const AppLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex justify-center bg-bgSecondary font-poppins">
      <NavBar />
      <main className="w-full min-h-screen mt-[4rem] flex justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
