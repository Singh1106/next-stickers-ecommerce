import React from "react";
import { adminNavbarTabEnums } from "../../../utils/enums";
import { AdminNavbar } from "../adminNavbar/AdminNavbar";
import FulfilledOrders from "../fulfilledOrders/FulfilledOrders";
import Messages from "../messages/Messages";
import UnfulfilledOrders from "../unfulfilledOrders/UnfulfilledOrders";
import styles from "./admindashboard.module.css";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const AdminDashboard = () => {
  const [tab, setTab] = React.useState<number | null>(null);
  const renderTab = () => {
    switch (tab) {
      case adminNavbarTabEnums.unfulfilledOrders:
        return <UnfulfilledOrders />;
      case adminNavbarTabEnums.messages:
        return <Messages />;
      case adminNavbarTabEnums.fulfilledOrders:
        return <FulfilledOrders />;
      default:
        return "Bro, Select a tab for fuck's sake.";
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.mainAdminDashboard}>
        <div>
          <h1>Welcome to Admin Dashboard!</h1>

          <AdminNavbar setTab={setTab} />
          <div>{renderTab()}</div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default AdminDashboard;
