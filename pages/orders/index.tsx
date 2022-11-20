import Orders from "../../src/components/orders/Orders";
import useAuthStore from "../../src/store";

const OrdersPage = () => {
  const orders = useAuthStore((state: any) => state.orders);
  return <Orders data={orders} />;
};

export default OrdersPage;
