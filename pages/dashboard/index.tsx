import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicDashboard = dynamic(() =>
  import("../../src/components/dashboard/Dashboard").then(
    (mod) => mod.Dashboard
  )
);

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicDashboard />
    </Suspense>
  );
}
