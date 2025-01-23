import { NavLink } from "react-router-dom";

interface GroupNavProps {
  id: string | null;
}

const GroupNav: React.FC<GroupNavProps> = ({ id }) => {
  return (
    <nav className="flex items-center w-full  tablet:w-[100%] h-[3rem] tablet:h-[4rem] bg-bgPrimary tablet:rounded-lg border-b-[1px] border-gray-300 tablet:border-b-0 pb-1 tablet:pb-0">
      <ul className="w-[100%] flex items-center justify-start gap-8 tablet:gap-10 text-[13px] desktop:text-[15px]  tablet:ml-4 tablet:p-4 ">
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
      </ul>
    </nav>
  );
};

export default GroupNav;
