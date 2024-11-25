import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const NavBar: React.FC = () => {
  const { user } = useUser();

  return (
    <nav className="fixed top-0 left-0 w-[100%] h-[4rem] flex items-center justify-between bg-bgPrimary border-b-2 border-gray-100 z-20">
      <NavLink to="/">
        <div className="text-[22px] font-bold ml-12 text-secondary">
          EventWey
        </div>
      </NavLink>
      <div className="flex items-center gap-10 mr-12 ">
        <ul className="flex items-center gap-10">
          <li className="p-2 pl-4 pr-4 bg-bgPrimary border-2 border-[#2C3E50] text-textPrimary rounded-lg text-[14px] font-semibold cursor-pointer">
            Create a group
          </li>
          {user ? (
            <>
              <NavLink
                to="/user/home"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-primary"
                    : "font-semibold text-textPrimary"
                }
              >
                <li className="cursor-pointer">Home</li>
              </NavLink>
              <NavLink
                to="/user/profile"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-primary"
                    : "font-semibold text-textPrimary"
                }
              >
                <li className="cursor-pointer">Profile</li>
              </NavLink>
              <NavLink
                to="/user/messages"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-primary"
                    : "font-semibold text-textPrimary"
                }
              >
                <li className="cursor-pointer">Messages</li>
              </NavLink>
              <NavLink
                to="/user/notifications"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-primary"
                    : "font-semibold text-textPrimary"
                }
              >
                <li className="cursor-pointer">Notifications</li>
              </NavLink>
            </>
          ) : (
            <>
              <li className="font-semibold text-textPrimary cursor-pointer">
                Events
              </li>
              <li className="font-semibold text-textPrimary cursor-pointer">
                Log in
              </li>
            </>
          )}
        </ul>
        {user ? (
          <img
            src={user.profileImage} // Using user profile image
            alt="User Profile"
            className="w-[48px] h-[48px] rounded-full border-[3px] border-textPrimary"
          />
        ) : (
          <button className="p-2 pl-4 pr-4 bg-primary  text-textSecondary rounded-lg text-[14px] font-semibold">
            Sign up
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
