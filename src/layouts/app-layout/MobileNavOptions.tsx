import { Link, NavLink } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import useHandleCreateUserClick from "../../hooks/useHandleCreateUserClick";

const MobileNavOptions = ({ setIsMobileNavOpen }) => {
  const { user, handleSignOut } = useUser();

  function handleClick() {
    setIsMobileNavOpen(false);
  }
  return (
    <div className=" h-screen-minus-4rem w-full flex flex-col justify-between overflow-hidden ">
      <div className="h-[60%] w-full flex flex-col items-start justify-start gap-y-8 p-6 mt-6 ">
        <NavLink
          to="/user/events"
          className="font-semibold text-textPrimary"
          onClick={handleClick}
        >
          <li className="cursor-pointer list-none">Events</li>
        </NavLink>
        <NavLink
          to="/user/groups"
          className="font-semibold text-textPrimary"
          onClick={handleClick}
        >
          <li className="cursor-pointer list-none">Groups</li>
        </NavLink>
        <div className="w-full border-b-[1px] border-gray-200 mt-4 mb-4"></div>
        <NavLink
          to="/user/my-events"
          className="font-semibold text-textPrimary"
          onClick={handleClick}
        >
          <li className="cursor-pointer list-none">Your events</li>
        </NavLink>
        <NavLink
          to="/user/my-groups"
          className="font-semibold text-textPrimary"
          onClick={handleClick}
        >
          <li className="cursor-pointer list-none">Your groups</li>
        </NavLink>
        <NavLink
          to="/user/my-connections"
          className="font-semibold text-textPrimary"
          onClick={handleClick}
        >
          <li className="cursor-pointer list-none">Your connections</li>
        </NavLink>
      </div>
      <div className=" w-full h-[12%] flex flex-row items-center px-6 py-2 border-t-[1px] border-gray-200">
        <img
          className="w-[40px] h-[40px] rounded-full"
          src={user?.profileImage}
          alt=""
        />
        <div className="flex flex-col items-center justify-start  ml-6">
          <p className="text-[14px] font-semibold mr-auto text-textPrimary">
            {user?.username}
          </p>
          <Link to="/user/profile" onClick={handleClick}>
            <p className="text-[13px] font-medium mr-auto text-primary">
              View profile
            </p>
          </Link>
        </div>
        <p
          onClick={() => {
            handleSignOut();
            setIsMobileNavOpen(false);
          }}
          className="ml-auto "
        >
          Log out
        </p>
      </div>
    </div>
  );
};

export default MobileNavOptions;
