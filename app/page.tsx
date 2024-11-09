export const dynamic = "force-dynamic";
import { fetchRuneTotals } from "@/services/runeStatsService";
import TableAnalytic from "@/components/pages/home";
import { fetchRuneStats } from "@/services/runeService";

const Home = async () => {
  const btcPrice = await fetch("https://mempool.space/api/v1/prices", {
    cache: "no-store",
  });
  const price = await btcPrice.json();

  const data = await fetchRuneTotals();
  const dataTable = await fetchRuneStats();

  return (
    <>
      <TableAnalytic
        stats={data}
        loading={false}
        dataTable={dataTable}
        price={price.USD}
      />
    </>
  );
};

export default Home;
