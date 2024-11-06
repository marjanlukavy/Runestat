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
}

const TableAnalytic = ({ stats, loading, dataTable }: TableAnalyticProps) => {
  const [selectedTab, setSelectedTab] = useState<"runes" | "mints">("runes");

  const formatBTC = (value: string) => {
    const num = parseFloat(value);
    return num.toFixed(6);
  };
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleApplyFilters = () => {
    setIsFilterModalOpen(false);
  };
  return (
    <div className="max-w-[1722px] mx-auto w-full px-4">
      <Header />

      <div className="flex flex-col gap-[25px] mt-[30px]">
        <div className="w-full bg-[#13171B] rounded-[13px] flex max-w-[448px]">
          <button
            onClick={() => setSelectedTab("runes")}
            className={`flex-1 py-4 px-6 rounded-[13px] text-center transition-all duration-200
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

        <div className="bg-[#131718] rounded-[20px] px-4 sm:px-6 2xl:px-10 py-4 sm:py-5 2xl:py-6 flex flex-col 2xl:flex-row gap-4 2xl:gap-[33px]">
          <div className="flex flex-col 2xl:flex-row gap-4 2xl:gap-[33px] w-full">
            <div className="flex flex-row 2xl:flex-col items-center 2xl:items-start gap-4 2xl:gap-1 2xl:max-w-[121px] w-full">
              <Image
                src={"/chart.svg"}
                alt={"Chart"}
                width={35.21}
                height={39.03}
                className="w-8 2xl:w-[35.21px]"
              />
              <span className="text-[#BC4F2A] font-bold text-2xl 2xl:text-[24px] leading-[29px] tracking-[0.08em] uppercase">
                Total volume:
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 2xl:flex 2xl:flex-row gap-4 2xl:gap-[33px]">
              <div className="bg-[#1B1F22] rounded-[9px] py-[20.5px] px-[15px] flex flex-col gap-[11px]">
                <span className="text-[#656565] font-medium text-[14px] leading-[16.41px]">
                  24 H
                </span>
                <span className="text-white font-bold text-xl 2xl:text-[24px] leading-[28.13px] break-words">
                  {loading
                    ? "..."
                    : `${formatBTC(stats?.total_volume_24h || "0")} BTC`}
                </span>
              </div>

              <div className="bg-[#1B1F22] rounded-[9px] py-[20.5px] px-[15px] flex flex-col gap-[11px]">
                <span className="text-[#656565] font-medium text-[14px] leading-[16.41px] uppercase">
                  1 H
                </span>
                <span className="text-white font-bold text-xl 2xl:text-[24px] leading-[28.13px] break-words">
                  {loading
                    ? "..."
                    : `${formatBTC(stats?.total_volume_1h || "0")} BTC`}
                </span>
              </div>

              <div className="bg-[#1B1F22] rounded-[9px] py-[20.5px] px-[15px] flex flex-col gap-[11px]">
                <span className="text-[#656565] font-medium text-[14px] leading-[16.41px] uppercase">
                  market cap
                </span>
                <span className="text-white font-bold text-xl 2xl:text-[24px] leading-[28.13px] uppercase break-words">
                  {loading
                    ? "..."
                    : `${formatBTC(stats?.total_market_cap || "0")} BTC`}
                </span>
              </div>
            </div>

            <div className="flex flex-row 2xl:flex-col items-center 2xl:items-start gap-4 2xl:gap-1 2xl:max-w-[121px] w-full">
              <Image
                src={"/chart.svg"}
                alt={"Chart"}
                width={35.21}
                height={39.03}
                className="w-8 2xl:w-[35.21px]"
              />
              <span className="text-[#BC4F2A] font-bold text-2xl 2xl:text-[24px] leading-[29px] tracking-[0.08em] uppercase">
                wallets:
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:flex 2xl:flex-row gap-4 2xl:gap-[33px] w-full 2xl:max-w-[423px]">
              <div className="bg-[#1B1F22] rounded-[9px] py-[20.5px] px-[15px] flex flex-col gap-[11px] 2xl:max-w-[195px] w-full">
                <span className="text-[#656565] font-medium text-[14px] leading-[16.41px] uppercase">
                  total #
                </span>
                <span className="text-white font-bold text-xl 2xl:text-[24px] leading-[28.13px] break-words">
                  {loading ? "..." : stats?.total_wallets_holders}
                </span>
              </div>

              <div className="bg-[#1B1F22] rounded-[9px] py-[20.5px] px-[15px] flex flex-col gap-[11px] 2xl:max-w-[195px] w-full">
                <span className="text-[#656565] font-medium text-[14px] leading-[16.41px] uppercase">
                  active for 24 H
                </span>
                <span className="text-white font-bold text-xl 2xl:text-[24px] leading-[28.13px] break-words">
                  {loading ? "..." : stats?.total_active_wallets_24h}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center justify-center gap-3 bg-[#1B1F22] rounded-[27px] w-full 2xl:w-auto 2xl:self-center py-3 px-6 max-w-[192px]"
            >
              <Image
                src={"/icons/equalizer.svg"}
                alt={"Equalizer"}
                width={16}
                height={16}
              />
              <span className="text-[#656565] font-medium text-[15px] leading-[17.58px]">
                Filters
              </span>
            </button>
          </div>
        </div>

        <div>
          <RuneTable dataTable={dataTable} />
        </div>
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
