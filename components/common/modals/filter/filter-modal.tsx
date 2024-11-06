"use client";
import { X } from "lucide-react";
import React from "react";
import { useEffect, useState, useCallback } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
}

interface FilterValues {
  runeName: string;
  volume: {
    min: string;
    max: string;
  };
  transactions: {
    min: string;
    max: string;
  };
  holders: {
    min: string;
    max: string;
  };
}

interface RangeState {
  values: [number, number];
  dragging: null | "min" | "max";
  bounds: { min: number; max: number };
}

const FilterModal = ({ isOpen, onClose, onApply }: FilterModalProps) => {
  const [filters, setFilters] = useState<FilterValues>({
    runeName: "",
    volume: { min: "0.00008", max: "10.000" },
    transactions: { min: "100", max: "10000" },
    holders: { min: "100", max: "10000" },
  });

  // Separate state for ranges
  const [volumeRange, setVolumeRange] = useState<RangeState>({
    values: [0.00008, 10],
    dragging: null,
    bounds: { min: 0.00008, max: 10 },
  });

  const [transactionsRange, setTransactionsRange] = useState<RangeState>({
    values: [100, 10000],
    dragging: null,
    bounds: { min: 100, max: 10000 },
  });

  const [holdersRange, setHoldersRange] = useState<RangeState>({
    values: [100, 10000],
    dragging: null,
    bounds: { min: 100, max: 10000 },
  });

  const handleRangeChange = (
    range: RangeState,
    setRange: (range: RangeState) => void,
    type: "volume" | "transactions" | "holders",
    trackRef: React.RefObject<HTMLDivElement>,
    clientX: number
  ) => {
    if (!range.dragging || !trackRef.current) return;

    const track = trackRef.current;
    const trackRect = track.getBoundingClientRect();
    let percent = ((clientX - trackRect.left) / trackRect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));

    const value =
      range.bounds.min +
      (percent / 100) * (range.bounds.max - range.bounds.min);
    const roundedValue =
      type === "volume"
        ? Math.round(value * 100000) / 100000
        : Math.round(value);

    const newValues: [number, number] =
      range.dragging === "min"
        ? [Math.min(roundedValue, range.values[1] - 0.00001), range.values[1]]
        : [range.values[0], Math.max(roundedValue, range.values[0] + 0.00001)];

    setRange({ ...range, values: newValues });
    setFilters((prev) => ({
      ...prev,
      [type]: {
        min:
          type === "volume" ? newValues[0].toFixed(5) : newValues[0].toString(),
        max:
          type === "volume" ? newValues[1].toFixed(5) : newValues[1].toString(),
      },
    }));
  };

  const RangeSlider = ({
    range,
    setRange,
    type,
  }: {
    range: RangeState;
    setRange: (range: RangeState) => void;
    type: "volume" | "transactions" | "holders";
  }) => {
    const trackRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        handleRangeChange(range, setRange, type, trackRef, e.clientX);
      };

      const handleMouseUp = () => {
        setRange({ ...range, dragging: null });
      };

      if (range.dragging) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [range.dragging]);

    const leftPercent =
      ((range.values[0] - range.bounds.min) /
        (range.bounds.max - range.bounds.min)) *
      100;
    const rightPercent =
      ((range.bounds.max - range.values[1]) /
        (range.bounds.max - range.bounds.min)) *
      100;

    return (
      <div className="relative h-1 bg-[#222222] rounded-full" ref={trackRef}>
        <div
          className="absolute h-full bg-[#FF4100] rounded-full"
          style={{
            left: `${leftPercent}%`,
            right: `${rightPercent}%`,
          }}
        />
        <div
          className="absolute size-4 bg-[#FF4100] hover:bg-[#a34424] rounded-full -translate-y-1/3 cursor-pointer transition-colors"
          style={{ left: `${leftPercent}%` }}
          onMouseDown={() => setRange({ ...range, dragging: "min" })}
        />
        <div
          className="absolute size-4 bg-[#FF4100] hover:bg-[#a34424] rounded-full -translate-y-1/3 cursor-pointer transition-colors"
          style={{ left: `${100 - rightPercent}%` }}
          onMouseDown={() => setRange({ ...range, dragging: "max" })}
        />
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-[#000] rounded-[20px] max-w-[520px] w-full">
        {/* Header */}
        <div className="flex justify-between items-center px-[58px] py-[33px] border-b border-[#222222]">
          <h2 className="text-white font-medium text-[20px]">Filters</h2>
          <button
            onClick={onClose}
            className="text-[#8D8D8D] hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 px-[54px] space-y-6">
          {/* Runes Search */}
          <div className="space-y-2">
            <label className="text-white text-[15px] leading-[17.58px]">
              Runes
            </label>
            <input
              type="text"
              placeholder="Start typing runes names"
              className="w-full bg-[#1B1F22] border border-[#222222] rounded-lg px-4 py-3
                text-white placeholder:text-[#A9A9A9] outline-none focus:border-[#BC4F2A]"
              value={filters.runeName}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, runeName: e.target.value }))
              }
            />
          </div>

          {/* Volume Range */}
          <div className="space-y-3">
            <label className="text-white text-[15px] leading-[17.58px]">
              Volume 24 h, BTC
            </label>
            <div className="flex gap-4 items-center justify-center">
              <input
                type="text"
                className="w-full bg-[#1B1F22] border border-[#222222] rounded-lg px-4 py-3 max-w-[100px]
                  text-[#9C9C9C] outline-none focus:border-[#BC4F2A]"
                value={volumeRange.values[0].toFixed(5)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value < volumeRange.values[1]) {
                    setVolumeRange({
                      ...volumeRange,
                      values: [value, volumeRange.values[1]],
                    });
                    setFilters((prev) => ({
                      ...prev,
                      volume: {
                        ...prev.volume,
                        min: value.toFixed(5),
                      },
                    }));
                  }
                }}
              />
              <span className="text-[#8D8D8D]">-</span>
              <input
                type="text"
                className="w-full bg-[#1B1F22] border border-[#222222] rounded-lg px-4 py-3 max-w-[100px]
                  text-[#9C9C9C] outline-none focus:border-[#BC4F2A]"
                value={volumeRange.values[1].toFixed(5)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value > volumeRange.values[0]) {
                    setVolumeRange({
                      ...volumeRange,
                      values: [volumeRange.values[0], value],
                    });
                    setFilters((prev) => ({
                      ...prev,
                      volume: {
                        ...prev.volume,
                        max: value.toFixed(5),
                      },
                    }));
                  }
                }}
              />
            </div>
            <RangeSlider
              range={volumeRange}
              setRange={setVolumeRange}
              type="volume"
            />
          </div>

          {/* Transactions Range */}
          <div className="space-y-3">
            <label className="text-white text-[15px] leading-[17.58px]">
              Transactions
            </label>
            <div className="flex gap-4 items-center justify-center">
              <input
                type="text"
                className="w-full bg-[#1B1F22] border border-[#222222] rounded-lg px-[21.5px] py-[10px] max-w-[100px]
                  text-[#9C9C9C] outline-none focus:border-[#BC4F2A]"
                value={transactionsRange.values[0]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value < transactionsRange.values[1]) {
                    setTransactionsRange({
                      ...transactionsRange,
                      values: [value, transactionsRange.values[1]],
                    });
                    setFilters((prev) => ({
                      ...prev,
                      transactions: {
                        ...prev.transactions,
                        min: value.toString(),
                      },
                    }));
                  }
                }}
              />
              <span className="text-[#8D8D8D]">-</span>
              <input
                type="text"
                className="w-full bg-[#1B1F22] border border-[#222222] rounded-lg px-[21.5px] py-[10px] max-w-[100px]
                  text-[#9C9C9C] outline-none focus:border-[#BC4F2A]"
                value={transactionsRange.values[1]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value > transactionsRange.values[0]) {
                    setTransactionsRange({
                      ...transactionsRange,
                      values: [transactionsRange.values[0], value],
                    });
                    setFilters((prev) => ({
                      ...prev,
                      transactions: {
                        ...prev.transactions,
                        max: value.toString(),
                      },
                    }));
                  }
                }}
              />
            </div>
            <RangeSlider
              range={transactionsRange}
              setRange={setTransactionsRange}
              type="transactions"
            />
          </div>

          {/* Holders Range */}
          <div className="space-y-3">
            <label className="text-white text-[15px]">Holders</label>
            <div className="flex gap-4 items-center justify-center">
              <input
                type="text"
                className="w-full bg-[#1B1F22] border border-[#222222] rounded-lg px-[21.5px] py-[10px] max-w-[100px]
                  text-[#9C9C9C] outline-none focus:border-[#BC4F2A]"
                value={holdersRange.values[0]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value < holdersRange.values[1]) {
                    setHoldersRange({
                      ...holdersRange,
                      values: [value, holdersRange.values[1]],
                    });
                    setFilters((prev) => ({
                      ...prev,
                      holders: {
                        ...prev.holders,
                        min: value.toString(),
                      },
                    }));
                  }
                }}
              />
              <span className="text-[#8D8D8D]">-</span>
              <input
                type="text"
                className="w-full bg-[#1B1F22] border border-[#222222] rounded-lg px-[21.5px] py-[10px] max-w-[100px]
                  text-[#9C9C9C] outline-none focus:border-[#BC4F2A]"
                value={holdersRange.values[1]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value > holdersRange.values[0]) {
                    setHoldersRange({
                      ...holdersRange,
                      values: [holdersRange.values[0], value],
                    });
                    setFilters((prev) => ({
                      ...prev,
                      holders: {
                        ...prev.holders,
                        max: value.toString(),
                      },
                    }));
                  }
                }}
              />
            </div>
            <RangeSlider
              range={holdersRange}
              setRange={setHoldersRange}
              type="holders"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-[55px] py-[29px] flex gap-[50px]">
          <button
            onClick={() => onApply(filters)}
            className="flex-1 bg-[#BC4F2A] text-white rounded-[8px] py-[18.5px] font-medium
              hover:bg-[#a34424] transition-colors"
          >
            Apply
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-[#989898] text-white rounded-[8px] py-[18.5px] leading-[17.58px] font-medium
              hover:bg-[#1B1F22] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
