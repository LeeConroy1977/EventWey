import React, { useState } from "react";
import SelectComponent from "../reuseable-components/SelectComponent";
import { categoriesArr, dateArr, sortByArr } from "../../data/options";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import ConnectionsOptions from "../layouts/connection-layout/ConnectionsOptions";
import { useUser } from "../contexts/UserContext";
import { useScreenWidth } from "../contexts/ScreenWidthContext";
import AdminNav from "../layouts/user-layout/AdminNav";

const OptionsContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isMobile } = useScreenWidth();
  const { user } = useUser();
  const location = useLocation();
  const isConnectionsPage =
    location.pathname === "/user/my-connections" ||
    location.pathname === "/user/my-connections/requests";

  const isGroupPage = location.pathname === "/user/groups";
  const isEventPage = location.pathname === "/user/events";
  const isAdminPage =
    location.pathname === "/user/admin/groups" ||
    location.pathname === "/user/admin/events";

  const [category, setCategory] = useState<string>(
    searchParams.get("category") || ""
  );
  const [date, setDate] = useState<string>(searchParams.get("date") || "");
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sortBy") || ""
  );

  const handleParams = (paramOption: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set(paramOption, value);
    } else {
      newParams.delete(paramOption);
    }
    setSearchParams(newParams);
  };

  const handleCategoryOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryValue = e.target.value;
    setCategory(categoryValue);
    handleParams(
      "category",
      categoryValue === "categories" || categoryValue === ""
        ? null
        : categoryValue
    );
  };

  const handleDateOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dateValue = e.target.value;
    setDate(dateValue);
    handleParams(
      "date",
      dateValue === "date" || dateValue === "" ? null : dateValue
    );
  };

  const handleSortByOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortByValue = e.target.value;
    setSortBy(sortByValue);
    handleParams(
      "sortBy",
      sortByValue === "sort by" || sortByValue === "" ? null : sortByValue
    );
  };

  const handleResetParams = () => {
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
    setDate("");

    setCategory("");
    setSortBy("");
  };

  return (
    <div
      className={`${
        isConnectionsPage || isAdminPage ? "h-[4rem]" : "h-[6rem]"
      } w-screen  tablet:w-[100%] tablet:h-[62px] desktop:h-[65px] xl-screen:h-[70px] flex items-center justify-center bg-white border-t-2 border-b-2 border-gray-100 font-semibold  py-4 desktop:py-0`}
    >
      {isMobile && (
        <div className="w-screen flex flex-col px-6 ">
          {isConnectionsPage && <ConnectionsOptions />}
          {(isGroupPage || isEventPage) && !isConnectionsPage && (
            <nav className="w-[100%] h-[100%] flex items-center mt-6 ">
              <ul className="w-[100%] flex items-center justify-start text-[13px] ">
                <NavLink
                  to={user ? "/user/events" : "/events"}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-primary"
                      : "font-semibold text-textPrimary"
                  }
                >
                  <li className="cursor-pointer">Events</li>
                </NavLink>
                <NavLink
                  to={user ? "/user/groups" : "/groups"}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-primary"
                      : "font-semibold text-textPrimary"
                  }
                >
                  <li className="cursor-pointer ml-4">Groups</li>
                </NavLink>{" "}
                {user?.role === "admin" && (
                  <NavLink
                    to={"/user/admin"}
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold text-primary"
                        : "font-semibold text-textPrimary"
                    }
                  >
                    <li className="cursor-pointer ml-4">Admin</li>
                  </NavLink>
                )}
                <button
                  className="ml-auto  text-[11px] text-[#5D9B9B] font-semibold"
                  onClick={handleResetParams}
                >
                  Reset filters
                </button>
              </ul>
            </nav>
          )}
          {!isConnectionsPage && !isAdminPage && (
            <div
              className={`${
                isGroupPage
                  ? "justify-end gap-x-4 desktop:ml-0"
                  : "justify-between gap-x-0 "
              } flex w-[100%]  items-center  desktop:justify-start mb-4 mt-4`}
            >
              {!isGroupPage && !isConnectionsPage && (
                <SelectComponent
                  optionArray={dateArr}
                  defaultOption="Date"
                  handleChange={handleDateOption}
                  selectedOption={date}
                />
              )}
              {!isConnectionsPage && (
                <>
                  {" "}
                  <SelectComponent
                    optionArray={categoriesArr}
                    defaultOption="Categories"
                    handleChange={handleCategoryOption}
                    selectedOption={category}
                  />
                  <SelectComponent
                    optionArray={sortByArr}
                    defaultOption="Sort By"
                    handleChange={handleSortByOption}
                    selectedOption={sortBy}
                  />
                </>
              )}
            </div>
          )}
          {isAdminPage && <AdminNav />}
          {!isEventPage &&
            !isGroupPage &&
            !isConnectionsPage &&
            !isAdminPage && (
              <div className="ml-auto mb-4 mt-0">
                <button
                  className="ml-auto  text-[11px] text-[#5D9B9B] font-semibold"
                  onClick={handleResetParams}
                >
                  Reset filters
                </button>
              </div>
            )}
        </div>
      )}
      {!isMobile && (
        <div className="tablet:w-[90%] desktop:w-[66%] h-[100%]">
          <div className="w-[100%] h-[100%] flex justify-between mr-auto ">
            <nav className="w-[50%] h-[100%] flex items-center desktop:ml-4 ">
              <ul className="w-[100%] flex items-center justify-start gap-10 text-[15px] xl-screen:text-[17px] ml-6">
                <NavLink
                  to={user ? "/user/events" : "/events"}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-primary"
                      : "font-semibold text-textPrimary"
                  }
                >
                  <li className="cursor-pointer">Events</li>
                </NavLink>
                <NavLink
                  to={user ? "/user/groups" : "/groups"}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-primary"
                      : "font-semibold text-textPrimary"
                  }
                >
                  <li className="cursor-pointer">Groups</li>
                </NavLink>
                {user?.role === "admin" && (
                  <NavLink
                    to={"/user/admin"}
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold text-primary"
                        : "font-semibold text-textPrimary"
                    }
                  >
                    <li className="cursor-pointer">Admin</li>
                  </NavLink>
                )}
              </ul>
            </nav>
            {isConnectionsPage ? (
              <ConnectionsOptions />
            ) : isAdminPage ? (
              <AdminNav />
            ) : (
              <div className="w-full flex  items-center justify-end">
                {!isGroupPage && (
                  <SelectComponent
                    optionArray={dateArr}
                    defaultOption="Date"
                    handleChange={handleDateOption}
                    selectedOption={date}
                  />
                )}
                <SelectComponent
                  optionArray={categoriesArr}
                  defaultOption="Categories"
                  handleChange={handleCategoryOption}
                  selectedOption={category}
                />

                <SelectComponent
                  optionArray={sortByArr}
                  defaultOption="Sort By"
                  handleChange={handleSortByOption}
                  selectedOption={sortBy}
                />
                <button
                  className="mr-8  text-[14px] tablet:text-[12px] desktop:text-[14px] xl-screen:text-[15px] text-[#5D9B9B] font-semibold"
                  onClick={handleResetParams}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionsContainer;
