"use client";
import Image from "next/image";
import React, { useState } from "react";
import TabSwitcher from "../tabs/header-tabs";
import { Menu, X } from "lucide-react"; // Import Menu and X icons for toggle

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const options = [
    { id: "runes", label: "Runes" },
    { id: "traders", label: "Traders" },
  ];

  const handleTabChange = (selectedId: string) => {
    console.log("Selected tab:", selectedId);
    // Handle tab change
  };

  return (
    <header className="w-full flex flex-col lg:flex-row lg:items-center justify-between pt-4 lg:pt-[22px] px-4 lg:px-0 gap-4 lg:gap-0">
      {/* Logo and Mobile Menu Button */}
      <div className="flex items-center justify-between">
        <Image
          src={"/logo.svg"}
          alt={"Logo"}
          width={112}
          height={58}
          className="w-[90px] lg:w-[112px] h-auto"
        />

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-white hover:text-[#BC4F2A] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex items-center justify-between w-full max-w-[970px]">
        <div className="hidden lg:block">
          <TabSwitcher options={options} onChange={handleTabChange} />
        </div>

        <div
          className={`
        flex flex-col lg:flex-row gap-4 lg:gap-[42px]
        ${isMobileMenuOpen ? "flex" : "hidden lg:flex"}
      `}
        >
          <div className="relative w-full lg:w-auto">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D8D8D]">
              <Image
                src={"/icons/search.svg"}
                alt={"Search"}
                width={20}
                height={20}
              />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full lg:w-[200px] h-[40px] bg-transparent rounded-full 
              pl-12 pr-4 outline-none 
              text-white placeholder:text-[#8D8D8D] 
              font-harmony text-[15px] leading-[18.75px]
              border border-[#AFAFB0] focus:border-[#BC4F2A]
              transition-colors duration-200"
            />
          </div>

          <button
            className="w-full lg:w-auto px-[42px] h-[40px] bg-[#BC4F2A] rounded-full
            text-white font-harmony text-[16px] leading-[18.75px]
            hover:bg-[#a34424] transition-colors duration-200 whitespace-nowrap"
          >
            Connect wallet
          </button>

          <div className="lg:hidden">
            <TabSwitcher options={options} onChange={handleTabChange} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
