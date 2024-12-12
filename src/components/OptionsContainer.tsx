import React, { useState, useEffect } from "react";
import SelectComponent from "../reuseable-components/SelectComponent";
import {
  eventGroupArr,
  categoriesArr,
  dateArr,
  sortByArr,
} from "../../data/options";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import ConnectionsOptions from "./ConnectionsOptions";
import { useUser } from "../contexts/UserContext";

const OptionsContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useUser();
  const location = useLocation();
  const isConnectionsPage =
    location.pathname === "/user/my-connections" ||
    location.pathname === "/user/my-connections/requests";

  const isGroupPage = location.pathname === "/user/groups";

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
    <div className="w-[100%] h-[65px] flex items-center justify-center bg-white border-t-2 border-b-2 border-gray-100 font-semibold">
      <div className="w-[66%] h-[100%] ">
        <div className="w-[100%] h-[100%] flex justify-between mr-auto ">
          <nav className="w-[50%] h-[100%] flex items-center ml-4 ">
            <ul className="w-[100%] flex items-center justify-start gap-10 text-[15px] ml-6">
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
            </ul>
          </nav>
          {isConnectionsPage ? (
            <ConnectionsOptions />
          ) : (
            <div className="flex  items-center">
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
                className="mr-8  text-[14px] text-[#5D9B9B] font-semibold"
                onClick={handleResetParams}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptionsContainer;
