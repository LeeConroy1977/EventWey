import React, { useState, useEffect } from "react";
import SelectComponent from "../reuseable-components/SelectComponent";
import {
  eventGroupArr,
  categoriesArr,
  dateArr,
  sortByArr,
} from "../../data/options";
import { useSearchParams } from "react-router-dom";

const OptionsContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [type, setType] = useState<string>(searchParams.get("type") || "");
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

  const handleTypeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const typeValue = e.target.value;
    setType(typeValue);
    handleParams("type", typeValue);
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
    setType("");
    setCategory("");
    setSortBy("");
  };

  return (
    <div className="w-[100%] h-[65px] flex items-center justify-center bg-white border-t-2 border-b-2 border-gray-100 font-semibold">
      <div className="w-[80%]">
        <div className="w-[67%] h-[100%] flex items mr-auto">
          <SelectComponent
            optionArray={eventGroupArr}
            defaultOption="Events"
            handleChange={handleTypeOption}
            selectedOption={type}
          />
          <SelectComponent
            optionArray={categoriesArr}
            defaultOption="Categories"
            handleChange={handleCategoryOption}
            selectedOption={category}
          />
          {type !== "Groups" && (
            <SelectComponent
              optionArray={dateArr}
              defaultOption="Date"
              handleChange={handleDateOption}
              selectedOption={date}
            />
          )}

          <div className=" flex  items-center ml-auto">
            <button
              className="mr-8  text-[14px] text-[#5D9B9B]"
              onClick={handleResetParams}
            >
              Reset
            </button>
            <SelectComponent
              optionArray={sortByArr}
              defaultOption="Sort By"
              handleChange={handleSortByOption}
              selectedOption={sortBy}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsContainer;
