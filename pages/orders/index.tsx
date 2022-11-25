import Orders from "../../src/components/orders/Orders";
import useAuthStore from "../../src/store";
import WPR from "../../src/components/withPrivateRoute/WPR";

const OrdersPage = () => {
  const orders = useAuthStore((state: any) => state.orders);
  return <Orders data={orders} />;
};

export default WPR(OrdersPage);
