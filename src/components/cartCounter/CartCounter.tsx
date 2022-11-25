import React from "react";
import styles from "./cartcounter.module.css";
import { Button } from "@mantine/core";
import useAuthStore from "../../store";
import { cartItem } from "../../types/types";
import { toast } from "react-toastify";

interface CartCounterProps {
  children: number;
  id: string;
  name: string;
}

const MAX_CART_COUNTER = 10;
const MIN_CART_COUNTER = 0;

const CartCounter = ({ children, id, name }: CartCounterProps) => {
  const { cart, setCart } = useAuthStore((state: any) => ({
    cart: state.cart,
    setCart: state.setCart,
  }));
  const incrementHandler = () => {
    const newCart = cart.map((cartItem: cartItem) => {
      if (cartItem.id === id) {
        if (cartItem.quantity < MAX_CART_COUNTER) {
          cartItem.quantity += 1;
          toast.info(`You have one MORE ${name} in your cart now.`);
        } else {
          toast.error(`You can not have more than ${MAX_CART_COUNTER} count.`);
        }
      }
      return cartItem;
    });
    setCart(newCart);
  };
  const decrementHandler = () => {
    const newCart = cart.filter((cartItem: cartItem) => {
      let returnThisItem = true;
      if (cartItem.id === id) {
        cartItem.quantity -= 1;
        if (cartItem.quantity > MIN_CART_COUNTER) {
          toast.warning(`You have one LESS ${name} in your cart now.`);
        } else {
          returnThisItem = false;
          toast.error(`Great wow. You do not have ${name} in your cart now.`);
        }
      }
      return returnThisItem;
    });
    setCart(newCart);
  };
  return (
    <>
      <Button
        variant="subtle"
        onClick={decrementHandler}
        className={styles.decrementBtn}
        compact
      >
        -
      </Button>
      {children}
      <Button
        variant="subtle"
        onClick={incrementHandler}
        className={styles.incrementBtn}
        compact
      >
        +
      </Button>
    </>
  );
};

export default CartCounter;
