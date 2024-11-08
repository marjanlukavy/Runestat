export interface RuneApiResponse {
  runes: {
    rune_name: string;
    rune_number: number;
    symbol: string | null;
    divisibility: number;
    image_uri: string | null;
    price: {
      market_cap: string;
      floor_unit_price_value: string;
      delta_floor_1d: string;
      delta_floor_7d: string;
      delta_floor_30d: string;
    };
    volume: {
      volume_1h: string;
      volume_1d: string;
      volume_7d: string;
      volume_30d: string;
      volume_all: string;
    };
    transactions: {
      total_txns: number;
      txn_count: number;
      txn_count_1d: number;
      txn_count_7d: number;
      txn_count_30d: number;
    };
    holder_count: {
      holder_count: number;
      smart_holders_count: number;
    };
    pending_count_tx: number;
  }[];
}

export const fetchRuneStats = async (): Promise<RuneApiResponse> => {
  try {
    const response = await fetch("https://api.mosaikbtc.com/api/runes/stats", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching rune stats:", error);
    throw error;
  }
};
