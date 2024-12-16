import { NavLink, useParams } from "react-router-dom";

const ConnectionNavBar = () => {
  const { id } = useParams();
  return (
    <nav className="flex items-center t w-[100%] h-[4rem] bg-bgPrimary rounded-lg mt-8">
      <ul className="w-[100%] flex items-center justify-start gap-10 text-[15px] ml-4 p-4 ">
        <NavLink
          to={`/connection/${id}/events`}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary"
              : "font-semibold text-textPrimary"
          }
        >
          Events
        </NavLink>
        <NavLink
          to={`/connection/${id}/groups`}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary"
              : "font-semibold text-textPrimary"
          }
        >
          Groups
        </NavLink>
        <NavLink
          to={`/connection/${id}/connections`}
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary"
              : "font-semibold text-textPrimary"
          }
        >
          Connections
        </NavLink>
      </ul>
    </nav>
  );
};

export default ConnectionNavBar;
