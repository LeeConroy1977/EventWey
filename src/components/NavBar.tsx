import { NavLink, useLocation, useMatch } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import Button from "../reuseable-components/Button";
import useHandleCreateGroupClick from "../hooks/useHandleCreateGroupClick";
import useHandleCreateUserClick from "../hooks/useHandleCreateUserClick";
import { CgProfile } from "react-icons/cg";
import useHandleSignInClick from "../hooks/useHandleSignUpClick";

const NavBar: React.FC = () => {
  const { user, handleSignOut } = useUser();
  const location = useLocation();
  const handleCreateUserClick = useHandleCreateUserClick();
  const handleCreateGroupClick = useHandleCreateGroupClick();

  const isHomeActive =
    location.pathname.startsWith("/user/events") ||
    location.pathname.startsWith("/user/groups") ||
    location.pathname.startsWith("/user/messages") ||
    location.pathname.startsWith("/user/notifications");

  return (
    <nav className="fixed top-0 left-0 w-[100%] h-[4.6rem] flex items-center justify-between bg-bgPrimary border-b-2 border-gray-100 z-20">
      <NavLink to={user ? "user/events" : "/"}>
        <div className="text-[22px] font-bold ml-12 text-secondary">
          EventWey
        </div>
      </NavLink>
      <div className="flex items-center gap-10 mr-12">
        <ul className="flex items-center gap-10">
          <li
            className="p-2 pl-4 pr-4 bg-bgPrimary border-2 border-[#2C3E50] text-textPrimary rounded-lg text-[14px] font-semibold cursor-pointer"
            onClick={handleCreateGroupClick}
          >
            Create a group
          </li>

          {user ? (
            <>
              <NavLink
                to="/user/events"
                className={({ isActive }) =>
                  isHomeActive || isActive
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
                to="/user/notifications"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-primary"
                    : "font-semibold text-textPrimary"
                }
              >
                <li className="cursor-pointer">Notifications</li>
              </NavLink>
              {user ? (
                <NavLink
                  onClick={handleSignOut}
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-primary"
                      : "font-semibold text-textPrimary"
                  }
                >
                  <li className="cursor-pointer">Sign out</li>
                </NavLink>
              ) : null}
            </>
          ) : (
            <>
              <NavLink
                to="/events"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-primary"
                    : "font-semibold text-textPrimary"
                }
              >
                <li className="cursor-pointer">Events</li>
              </NavLink>
              <NavLink
                to="/groups"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-primary"
                    : "font-semibold text-textPrimary"
                }
              >
                <li className="cursor-pointer">Groups</li>
              </NavLink>
              <NavLink
                to="/auth/sign-in"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-primary"
                    : "font-semibold text-textPrimary"
                }
              >
                <li className="font-semibold text-textPrimary cursor-pointer">
                  Log in
                </li>
              </NavLink>
            </>
          )}
        </ul>
        {user && !user.profileImage ? (
          <CgProfile className="w-[50px] h-[50px] rounded-full text-textPrimary" />
        ) : user && user.profileImage ? (
          <img
            src={user.profileImage || "path/to/default-image.jpg"}
            alt="User Profile"
            className="w-[48px] h-[48px] rounded-full border-[3px] border-textPrimary"
          />
        ) : (
          <Button handleClick={handleCreateUserClick}>Sign up</Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
