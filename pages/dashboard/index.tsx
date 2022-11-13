import dynamic from "next/dynamic";

export default function DashboardPage() {
  const Dashboard = dynamic(
    () => import("../../src/components/dashboard/Dashboard"),
    {
      loading: () => <b>Loading your dashboard ji...</b>,
    }
  );
  return <Dashboard />;
}
