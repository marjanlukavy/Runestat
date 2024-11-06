import { fetchRuneTotals } from "@/services/runeStatsService";
import TableAnalytic from "@/components/pages/home";
import { fetchRuneStats } from "@/services/runeService";

const Home = async () => {
  // const [stats, setStats] = useState<RuneTotals | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const loadStats = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await fetchRuneTotals();
  //       setStats(data);
  //     } catch (err) {
  //       setError("Failed to load statistics");
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadStats();
  // }, []);

  const data = await fetchRuneTotals();
  const dataTable = await fetchRuneStats();
  return (
    <div>
      <TableAnalytic stats={data} loading={false} dataTable={dataTable} />;
    </div>
  );
};

export default Home;
