"use client";
import Header from "@/components/common/layout/header";
import RuneTable from "@/components/common/table/rune-table";
import Image from "next/image";
import { useState } from "react";
import { RuneTotals } from "@/services/runeStatsService";
import { RuneApiResponse } from "@/services/runeService";
import FilterModal from "@/components/common/modals/filter/filter-modal";

interface TableAnalyticProps {
  stats: RuneTotals | null;
  loading: boolean;
  dataTable: RuneApiResponse;
  price: number;
}

const TableAnalytic = ({
  stats,
  loading,
  dataTable,
  price,
}: TableAnalyticProps) => {
  const [selectedTab, setSelectedTab] = useState<"runes" | "mints">("runes");

  const formatBTC = (value: string) => {
    const num = parseFloat(value);
    return num.toFixed(2);
  };
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleApplyFilters = () => {
    setIsFilterModalOpen(false);
  };
  return (
    <div className="max-w-[1722px] mx-auto w-full px-4">
      <Header />

      <div className="flex flex-col gap-[25px] mt-[30px] pb-[100px]">
        <div className="w-full bg-[#13171B] rounded-[13px] flex max-w-[484px]">
          <button
            onClick={() => setSelectedTab("runes")}
            className={`flex-1 py-4 px-6 rounded-[13px] max-w-[240px] w-full text-center transition-all duration-200
        ${
          selectedTab === "runes"
            ? "bg-[#BC4F2A] text-white"
            : "text-[#A3A3A3] hover:text-white"
        }
      `}
          >
            <span className="text-[16px] leading-[18.75px] font-medium">
              RUNES
            </span>
          </button>

          <button
            onClick={() => setSelectedTab("mints")}
            className={`flex-1 py-4 px-6 rounded-[13px] text-center transition-all duration-200
        ${
          selectedTab === "mints"
            ? "bg-[#BC4F2A] text-white"
            : "text-[#A3A3A3] hover:text-white"
        }
      `}
          >
            <span className="text-[16px] leading-[18.75px] font-medium">
              MINTS
            </span>
          </button>
        </div>

        <div className="bg-[#131718] rounded-[20px] px-4 sm:px-6 2xl:px-10 py-4 sm:py-5 2xl:py-6 flex flex-col lg:flex-row gap-4 2xl:gap-[33px]">
          <div className="flex flex-col lg:flex-row gap-4 2xl:gap-[33px] w-full">
            <div className="flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-1 lg:max-w-[121px] w-full">
              <Image
                src="/chart.svg"
                alt="Chart"
                width={35.21}
                height={39.03}
                className="w-8 lg:w-[35.21px]"
              />
              <span className="text-[#BC4F2A] font-bold text-base lg:text-lg 2xl:text-[24px] leading-[29px] tracking-[0.08em] uppercase">
                Total volume:
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-row gap-4 2xl:gap-[33px]">
              <div className="bg-[#1B1F22] rounded-[9px] py-[20.5px] px-[15px] flex flex-col gap-[11px] min-w-[195px]">
                <span className="text-[#656565] font-medium text-xs 2xl:text-[14px] leading-[16.41px]">
                  24 H
                </span>
                <span className="text-white font-bold text-lg lg:text-xl 2xl:text-[24px] leading-[28.13px] break-words">
                  {loading
                    ? "..."
                    : `${formatBTC(stats?.total_volume_24h || "0")} BTC`}
                </span>
                <span className="text-[#656565] font-medium text-xs 2xl:text-[14px] leading-[16.41px]">
                  $
                  {(price * ((stats?.total_volume_24h as any) || 0)).toFixed(2)}
                </span>
              </div>

              <div className="bg-[#1B1F22] rounded-[9px] py-[20.5px] px-[15px] flex flex-col gap-[11px] min-w-[192px]">
                <span className="text-[#656565] font-medium text-xs 2xl:text-[14px] leading-[16.41px] uppercase">
                  1 H
                </span>
                <span className="text-white font-bold text-lg lg:text-xl 2xl:text-[24px] leading-[28.13px] break-words">
                  {loading
                    ? "..."
                    : `${formatBTC(stats?.total_volume_1h || "0")} BTC`}
                </span>
                <span className="text-[#656565] font-medium text-xs 2xl:text-[14px] leading-[16.41px]">
                  ${(price * ((stats?.total_volume_1h as any) || 0)).toFixed(2)}
                </span>
              </div>

              <div className="bg-[#1B1F22] rounded-[9px] py-[20.5px] px-[15px] flex flex-col gap-[11px] max-w-[192px]">
                <span className="text-[#656565] font-medium text-xs 2xl:text-[14px] leading-[16.41px] uppercase">
                  market cap
                </span>
                <span className="text-white font-bold text-lg lg:text-xl 2xl:text-[24px] leading-[28.13px] uppercase break-words">
                  {loading
                    ? "..."
                    : `${formatBTC(stats?.total_market_cap || "0")} BTC`}
                </span>
                <span className="text-[#656565] font-medium text-xs 2xl:text-[14px] leading-[16.41px]">
                  $
                  {(price * ((stats?.total_market_cap as any) || 0)).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-1 lg:max-w-[121px] w-full">
              <Image
                src="/chart.svg"
                alt="Chart"
                width={35.21}
                height={39.03}
                className="w-8 lg:w-[35.21px]"
              />
              <span className="text-[#BC4F2A] font-bold text-base lg:text-lg 2xl:text-[24px] leading-[29px] tracking-[0.08em] uppercase">
                wallets:
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-4 2xl:gap-[33px] w-full lg:max-w-[423px]">
              <div className="bg-[#1B1F22] rounded-[9px] py-[20.5px] px-[15px] flex flex-col gap-[11px] lg:max-w-[195px] w-full">
                <span className="text-[#656565] font-medium text-xs 2xl:text-[14px] leading-[16.41px] uppercase">
                  total #
                </span>
                <span className="text-white font-bold text-lg lg:text-xl 2xl:text-[24px] leading-[28.13px] break-words">
                  {loading ? "..." : stats?.total_wallets_holders}
                </span>
              </div>

              <div className="bg-[#1B1F22] rounded-[9px] py-[20.5px] px-[15px] flex flex-col gap-[11px] lg:max-w-[195px] w-full">
                <span className="text-[#656565] font-medium text-xs 2xl:text-[14px] leading-[16.41px] uppercase">
                  active for 24 H
                </span>
                <span className="text-white font-bold text-lg lg:text-xl 2xl:text-[24px] leading-[28.13px] break-words">
                  {loading ? "..." : stats?.total_active_wallets_24h}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex w-full items-center justify-center gap-3 bg-[#1B1F22] rounded-[27px] lg:self-center py-3 px-6 max-w-[192px]"
            >
              <Image
                src="/icons/equalizer.svg"
                alt="Equalizer"
                width={16}
                height={16}
              />
              <span className="text-[#656565] font-medium text-sm 2xl:text-[15px] leading-[17.58px]">
                Filters
              </span>
            </button>
          </div>
        </div>
        <RuneTable dataTable={dataTable} price={price} />
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
};

export default TableAnalytic;
