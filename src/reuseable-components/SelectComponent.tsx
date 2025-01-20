import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

interface SelectComponentProps {
  defaultOption: string;
  optionArray: { name: string; title: string }[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedOption?: string; // Make it optional, as it could be undefined
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

  const currentSelectedOption = selectedOption || defaultOption;

  const isSelected =
    currentSelectedOption && currentSelectedOption !== defaultOption;

  return (
    <div className="relative flex " ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`tablet:w-[110px] w-[100px] xl-screen:w-[150px] p-2 pl-3 pr-3 mr-0 tablet:mr-5 xl-screen:mr-8  rounded-xl text-[8px] tablet:text-[10px] desktop:text-[12px] xl-screen:text-[14px] font-bold flex justify-between items-center ${
          isSelected
            ? "bg-bgSecondary text-textPrimary font-semibold border-2 border-primary "
            : "text-textPrimary bg-bgSecondary"
        }`}
      >
        {optionArray.find((opt) => opt.name === currentSelectedOption)?.title ||
          defaultOption}
        <FaChevronDown className="ml-2" />
      </button>

      {isOpen && (
        <ul className="absolute left-0 top-[31px] w-[110px] xl-screen:w-[150px] sm:w-[130px] mt-1 rounded-lg bg-bgPrimary shadow-lg z-10">
          {optionArray.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option.name)}
              className="p-2 text-[10px] xl-screen:text-[14px] font-bold text-primary hover:bg-primary hover:text-white dark:hover:text-white cursor-pointer"
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectComponent;
