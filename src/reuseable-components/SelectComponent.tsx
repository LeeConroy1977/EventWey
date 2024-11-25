import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

interface SelectComponentProps {
  defaultOption: string;
  optionArray: string[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedOption: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  defaultOption,
  optionArray,
  handleChange,
  selectedOption,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    handleChange({
      target: { value: optionValue },
    } as React.ChangeEvent<HTMLSelectElement>);
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentSelectedOption = selectedOption
    ? selectedOption.toLowerCase()
    : defaultOption.toLowerCase();

  const isSelectedEventOrGroup =
    currentSelectedOption === "events" || currentSelectedOption === "groups";
  const isSelectedOther =
    currentSelectedOption &&
    currentSelectedOption !== defaultOption.toLowerCase();

  return (
    <div className="relative flex" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`w-[110px] sm:w-[130px] p-2 pl-3 pr-3 mr-4 rounded-xl text-[12px] font-bold flex justify-between items-center ${
          isSelectedEventOrGroup
            ? "bg-primary text-white font-semibold"
            : isSelectedOther
            ? "bg-primary text-textSecondary font-semibold"
            : "text-textPrimary bg-bgSecondary"
        }`}
      >
        {currentSelectedOption
          ? optionArray.find(
              (opt) => opt.toLowerCase() === currentSelectedOption
            )
          : defaultOption}
        <FaChevronDown className="ml-2" />
      </button>

      {isOpen && (
        <ul className="absolute left-0 top-[31px] w-[110px] sm:w-[130px] mt-1 rounded-lg bg-bgPrimary  shadow-lg z-10">
          {optionArray.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option.toLowerCase())}
              className="p-2 text-[10px] font-bold text-primary  hover:bg-primary hover:text-white dark:hover:text-white cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectComponent;
