"use client";
import { useState } from "react";

interface TabOption {
  id: string;
  label: string;
}

interface TabSwitcherProps {
  options: TabOption[];
  defaultSelected?: string;
  onChange?: (id: string) => void;
}

const TabSwitcher = ({
  options,
  defaultSelected = options[0]?.id,
  onChange,
}: TabSwitcherProps) => {
  const [selectedTab, setSelectedTab] = useState(defaultSelected);

  const handleTabChange = (id: string) => {
    setSelectedTab(id);
    onChange?.(id);
  };

  return (
    <div
      className="flex bg-[#13171B] rounded-[29px] w-fit gap-[6px]"
      style={{ height: "43px" }}
    >
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => handleTabChange(option.id)}
          className={`
            px-[22px] py-3 rounded-[29px] transition-all duration-200
            font-harmony text-[15px] leading-[18.75px] font-medium
            ${
              selectedTab === option.id
                ? "bg-[#BC4F2A] text-white"
                : "text-[#8D8D8D] hover:text-white"
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;
