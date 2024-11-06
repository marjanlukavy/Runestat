export interface RuneTotals {
  total_volume_1h: string;
  total_volume_24h: string;
  total_market_cap: string;
  total_wallets_holders: number;
  total_active_wallets_24h: number;
}

export const fetchRuneTotals = async (): Promise<RuneTotals> => {
  try {
    const response = await fetch("https://api.mosaikbtc.com/api/runes/totals");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching rune totals:", error);
    throw error;
  }
};
