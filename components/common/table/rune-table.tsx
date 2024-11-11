"use client";
import { InfoSVG, SortIcon } from "../svgs";
import Image from "next/image";
import { useState } from "react";
import { RuneApiResponse } from "@/services/runeService";

type SortDirection = "asc" | "desc" | null;
type SortField =
  | "volume_1d"
  | "volume_1h"
  | "market_cap"
  | "txn_count_1d"
  | "txn_count"
  | "pending_count_tx"
  | "holder_count"
  | "smart_holders_count"
  | null;

const RuneTable = ({
  dataTable,
  price,
}: {
  dataTable: RuneApiResponse;
  price: number;
}) => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortField(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortedData = () => {
    if (!dataTable?.runes || !sortField || !sortDirection) {
      return dataTable?.runes;
    }

    return [...dataTable.runes].sort((a, b) => {
      let aValue: number = 0;
      let bValue: number = 0;

      switch (sortField) {
        case "volume_1d":
          aValue = parseFloat(a.volume.volume_1d);
          bValue = parseFloat(b.volume.volume_1d);
          break;
        case "volume_1h":
          aValue = parseFloat(a.volume.volume_1h);
          bValue = parseFloat(b.volume.volume_1h);
          break;
        case "market_cap":
          aValue = parseFloat(a.price.market_cap);
          bValue = parseFloat(b.price.market_cap);
          break;
        case "txn_count_1d":
          aValue = a.transactions.txn_count_1d;
          bValue = b.transactions.txn_count_1d;
          break;
        case "txn_count":
          aValue = a.transactions.txn_count;
          bValue = b.transactions.txn_count;
          break;
        case "pending_count_tx":
          aValue = a.pending_count_tx;
          bValue = b.pending_count_tx;
          break;
        case "holder_count":
          aValue = a.holder_count.holder_count;
          bValue = b.holder_count.holder_count;
          break;
        case "smart_holders_count":
          aValue = a.holder_count.smart_holders_count;
          bValue = b.holder_count.smart_holders_count;
          break;
      }

      if (sortDirection === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  };

  const SortableHeader = ({
    label,
    field,
  }: {
    label: string;
    field: SortField;
  }) => (
    <div
      className="flex items-center gap-1 font-medium grow justify-between cursor-pointer text-[13px] leading-[15.24px] text-[#C4C4C4]"
      onClick={() => handleSort(field)}
    >
      {label}
      <div className="relative w-4 h-4">
        <SortIcon
          className={`transition-opacity ${
            sortField === field ? "opacity-100" : "opacity-50 hover:opacity-75"
          } ${
            sortField === field && sortDirection === "desc"
              ? "transform rotate-180"
              : ""
          }`}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-[#131718] rounded-[20px] overflow-hidden">
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-track-[#222222] scrollbar-thumb-[#BC4F2A]">
        <table className="w-full border-collapse min-w-[1200px]">
          <thead className="border-b border-[#222222] text-[#8D8D8D] sticky top-0 z-20 h-[73px] bg-[#131718]">
            <tr className="font-harmony py-4">
              {/* RUNE */}
              <th className="text-left font-normal z-30">
                <div className="px-4 py-4 h-[73px] flex items-center">
                  <span className="font-medium text-[13px] sm:text-[15px] leading-[17.58px] text-white">
                    RUNE
                  </span>
                </div>
              </th>

              {/* PRICE */}
              <th className="text-left font-normal">
                <div className="flex items-center gap-2 px-4 h-[73px] max-w-[173px]">
                  <span className="font-medium text-[13px] sm:text-[15px] leading-[17.58px] text-white">
                    PRICE
                  </span>
                  <InfoSVG />
                </div>
              </th>

              {/* VOLUME */}
              <th className="text-center" colSpan={2}>
                <div className="border-x border-[#222222] h-[73px]">
                  <div className="flex justify-center gap-1 items-center py-[10px]">
                    <span className="font-medium text-[13px] sm:text-[15px] leading-[17.58px] text-white">
                      VOLUME
                    </span>
                  </div>
                  <div className="flex justify-between gap-6 px-4 py-[10px]">
                    <SortableHeader label="24 H" field="volume_1d" />
                    <SortableHeader label="1 H" field="volume_1h" />
                  </div>
                </div>
              </th>

              {/* MARKET CAP */}
              <th className="text-center font-normal relative">
                <div className="flex gap-1 w-full justify-between px-4 items-center py-[20px] absolute bottom-0 h-[73px]">
                  <span className="font-medium text-[13px] leading-[15.24px] text-[#C4C4C4]">
                    MARKET CAP
                  </span>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleSort("market_cap")}
                  >
                    <SortIcon
                      className={`transition-opacity ${
                        sortField === "market_cap"
                          ? "opacity-100"
                          : "opacity-50 hover:opacity-75"
                      }`}
                    />
                  </div>
                </div>
              </th>

              {/* TRANSACTIONS */}
              <th className="text-center" colSpan={3}>
                <div className="border-x border-[#222222] h-[73px]">
                  <div className="flex justify-center gap-1 items-center py-[10px]">
                    <span className="font-medium text-[13px] sm:text-[15px] leading-[17.58px] text-white">
                      TRANSACTIONS
                    </span>
                  </div>
                  <div className="flex justify-center gap-6 px-4 py-[10px]">
                    <SortableHeader label="24 H" field="txn_count_1d" />
                    <SortableHeader label="1 H" field="txn_count" />
                    <SortableHeader label="PENDING" field="pending_count_tx" />
                  </div>
                </div>
              </th>

              {/* HOLDERS */}
              <th className="text-center" colSpan={2}>
                <div className="border- border-[#222222] h-[73px]">
                  <div className="flex justify-center gap-1 items-center py-[10px]">
                    <span className="font-medium text-[13px] sm:text-[15px] leading-[17.58px] text-white">
                      HOLDERS
                    </span>
                  </div>
                  <div className="flex justify-center gap-6 px-4 py-[10px]">
                    <SortableHeader label="REGULAR" field="holder_count" />
                    <SortableHeader label="SMART" field="smart_holders_count" />
                  </div>
                </div>
              </th>

              {/* Settings */}
              <th className="bg-[#13171B] z-30">
                <div className="flex justify-center p-2 h-[73px]">
                  <button className="flex items-center justify-center gap-1 md:gap-3 bg-[#1B1F22] rounded-[27px] w-full self-center p-2  md:p-3 max-w-[103px]">
                    <div className="relative md:size-4 size-3 md:block hidden">
                      <Image
                        src={"/icons/equalizer.svg"}
                        alt={"Equalizer"}
                        fill
                      />
                    </div>
                    <span className="text-[#656565] font-medium text-[11px] md:text-[12px]  sm:text-[14px] leading-[16.41px]">
                      Settings
                    </span>
                  </button>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {getSortedData()?.map((rune, index) => (
              <tr
                key={`${rune.rune_name}-${index}`}
                className="bg-[#131718]  transition-colors duration-200 group shadow-row h-[98px]"
              >
                {/* RUNE - Sticky Column */}
                <td className="py-5 pl-[16.83px]">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-[160px] max-w-[322px] ">
                    {rune.image_uri ? (
                      <Image
                        src={rune.image_uri}
                        alt={rune.rune_name}
                        width={40}
                        height={40}
                        className="rounded-lg w-8 sm:w-10 h-8 sm:h-10"
                      />
                    ) : (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg" />
                    )}
                    <div className="flex flex-col">
                      <span className="text-white font-harmony font-bold text-[13px] sm:text-[14.72px] leading-tight sm:leading-[17.26px] truncate max-w-[120px] sm:max-w-none">
                        {rune.rune_name}
                      </span>
                      <span className="text-[#656565] text-[11px] sm:text-[12.62px] leading-tight sm:leading-[14.79px] font-medium font-harmony">
                        Rune #{rune.rune_number}
                      </span>
                    </div>
                  </div>
                </td>

                {/* PRICE */}
                <td className="py-5 pl-[12.19px] max-w-[173px]">
                  <div className="flex flex-col gap-2 sm:gap-[14px] max-w-[173px]">
                    <div className="text-white font-harmony text-[13px] sm:text-[14px]">
                      {parseFloat(rune?.price?.floor_unit_price_value).toFixed(
                        2
                      )}{" "}
                      BTC
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-[#8D8D8D] text-[11px] sm:text-sm">
                        ${parseFloat(rune?.price?.market_cap).toFixed(2)}
                      </span>
                      <div className={`flex gap-1 items-center text-[#636363]`}>
                        <Image
                          src={
                            parseFloat(rune?.price?.delta_floor_1d) > 0
                              ? "/icons/high.svg"
                              : "/icons/low.svg"
                          }
                          alt={
                            parseFloat(rune?.price?.delta_floor_1d) > 0
                              ? "high"
                              : "low"
                          }
                          width={15.25}
                          height={12.25}
                          className="w-3 sm:w-[15.25px]"
                        />
                        <span className="text-[11px] sm:text-sm">
                          {Math.abs(
                            parseFloat(rune?.price?.delta_floor_1d)
                          ).toFixed(2)}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* VOLUME 24H */}
                <td className="py-5 pl-[16.8px] min-w-[140px]">
                  <div className="flex flex-col items-start">
                    <div className="text-white font-harmony text-[13px] sm:text-[14px]">
                      {parseFloat(rune?.volume?.volume_1d).toFixed(2)} BTC
                    </div>
                    <div className="text-[#8D8D8D] text-[11px] sm:text-sm">
                      ${parseInt(rune?.volume?.volume_1d)}
                    </div>
                  </div>
                </td>

                {/* VOLUME 1H */}
                <td className="py-5 pl-[16.8px] min-w-[140px]">
                  <div className="flex flex-col items-start">
                    <div className="text-white font-harmony text-[13px] sm:text-[14px]">
                      {parseFloat(rune?.volume?.volume_1h).toFixed(2)} BTC
                    </div>
                    <div className="text-[#8D8D8D] text-[11px] sm:text-sm">
                      ${parseInt(rune?.volume?.volume_1h)}
                    </div>
                  </div>
                </td>

                {/* MARKET CAP */}
                <td className="py-5 pl-[16.8px] min-w-[140px]">
                  <div className="flex flex-col items-start">
                    <div className="text-white font-harmony text-[13px] sm:text-[14px]">
                      {parseFloat(rune?.price?.market_cap).toFixed(2)} BTC
                    </div>
                    <div className="text-[#8D8D8D] text-[11px] sm:text-sm">
                      $
                      {(parseFloat(rune?.price?.market_cap) * price).toFixed(2)}
                    </div>
                  </div>
                </td>

                {/* TRANSACTIONS COUNTS */}
                <td className="py-5 pl-[16.8px] text-left min-w-[126px]">
                  <div>
                    <span className="text-white font-harmony text-[13px] sm:text-[14px]">
                      {rune?.transactions?.txn_count_1d}
                    </span>
                  </div>
                </td>

                <td className="py-5 pl-[16.8px] text-left min-w-[126px]">
                  <div>
                    <span className="text-white font-harmony text-[13px] sm:text-[14px]">
                      {rune?.transactions?.txn_count}
                    </span>
                  </div>
                </td>

                <td className="py-5 pl-[16.8px] text-left min-w-[126px]">
                  <div>
                    <span className="text-white font-harmony text-[13px] sm:text-[14px]">
                      {rune?.pending_count_tx}
                    </span>
                  </div>
                </td>

                {/* HOLDERS */}
                <td className="py-5 pl-[16.8px] min-w-[120px]">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-white font-harmony text-[13px] sm:text-[14px]">
                      {rune.holder_count.holder_count}
                    </span>
                    <div
                      className={`gap-1 sm:gap-[6px] flex items-center text-[#636363]`}
                    >
                      <Image
                        src={
                          parseFloat(rune?.price?.delta_floor_7d) > 0
                            ? "/icons/high.svg"
                            : "/icons/low.svg"
                        }
                        alt={
                          parseFloat(rune?.price?.delta_floor_7d) > 0
                            ? "high"
                            : "low"
                        }
                        width={15.25}
                        height={12.25}
                        className="w-3 sm:w-[15.25px]"
                      />
                      <span className="text-[11px] sm:text-sm">
                        {Math.abs(
                          parseFloat(rune?.price?.delta_floor_7d)
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-5 pl-[16.8px] min-w-[120px]">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-white font-harmony text-[13px] sm:text-[14px]">
                      {rune?.holder_count?.smart_holders_count}
                    </span>
                    <div
                      className={`gap-1 sm:gap-[6px] flex items-center text-[#636363]`}
                    >
                      <Image
                        src={
                          parseFloat(rune?.price?.delta_floor_1d) > 0
                            ? "/icons/high.svg"
                            : "/icons/low.svg"
                        }
                        alt={
                          parseFloat(rune?.price?.delta_floor_1d) > 0
                            ? "high"
                            : "low"
                        }
                        width={15.25}
                        height={12.25}
                        className="w-3 sm:w-[15.25px]"
                      />
                      <span className="text-[11px] sm:text-sm">
                        {Math.abs(
                          parseFloat(rune?.price?.delta_floor_1d)
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                  </div>
                </td>

                {/* BUY BUTTON - Sticky */}
                <td className="px-[16.3px]  py-5">
                  <button className="px-4 sm:px-6 py-1.5 sm:py-[14.5px] sm:h-[50px] grid place-content-center bg-[#FF4100] rounded-[8.41px] text-white font-harmony hover:bg-[#e64930] transition-colors duration-200 text-[12px] sm:text-[15.78px] whitespace-nowrap">
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RuneTable;
