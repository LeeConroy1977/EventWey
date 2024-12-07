import { NavLink } from "react-router-dom";

const GroupNav = ({ id }) => {
  return (
    <nav className="flex items-center t w-[100%] h-[4rem] bg-bgPrimary rounded-lg">
      <ul className="w-[100%] flex items-center justify-start gap-10 text-[15px] ml-4 p-4 ">
        <NavLink
          to={`/user/groups/${id}/details`}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary"
              : "font-semibold text-textPrimary"
          }
        >
          Details
        </NavLink>
        <NavLink
          to={`/user/groups/${id}/events`}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary"
              : "font-semibold text-textPrimary"
          }
        >
          Events
        </NavLink>
        <NavLink
          to={`/user/groups/${id}/members`}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary"
              : "font-semibold text-textPrimary"
          }
        >
          Members
        </NavLink>
        <NavLink
          to={`/user/groups/${id}/chat`}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary"
              : "font-semibold text-textPrimary"
          }
        >
          Chat
        </NavLink>
      </ul>
    </nav>
  );
};

export default GroupNav;
