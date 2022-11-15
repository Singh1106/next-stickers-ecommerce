import Cart from "../../src/components/cart/Cart";
import useAuthStore from "../../src/store";

const CartPage = () => {
  const cart = useAuthStore((state: any) => state.cart);
  return <Cart data={cart} />;
};

export default CartPage;
