import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <div className="w-[100%] h-[100%] flex items-center justify-end desktop:ml-6">
      <nav>
        <ul className="flex items-center ml-auto desktop:mr-0 text-[13px] desktop:text-[14px]">
          <NavLink
            end
            to={"/user/admin/groups"}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary"
                : "font-semibold text-textPrimary"
            }
          >
            <li className=" mr-6 desktop:ml-auto desktop:mr-11   cursor-pointer ">
              Review groups
            </li>
          </NavLink>
          <NavLink
            to={"/user/admin/events"}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary"
                : "font-semibold text-textPrimary"
            }
          >
            <li className="desktop:ml-auto desktop:mr-11   cursor-pointer  ">
              Review events
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNav;
