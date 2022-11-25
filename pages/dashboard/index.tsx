import dynamic from "next/dynamic";
import Dashboard from "../../src/components/dashboard/Dashboard";
import WPR from "../../src/components/withPrivateRoute/WPR";

function DashboardPage() {
  const Dashboard = dynamic(
    () => import("../../src/components/dashboard/Dashboard"),
    {
      loading: () => <b>Loading your dashboard ji...</b>,
    }
  );
  return <Dashboard />;
}

export default WPR(Dashboard);
