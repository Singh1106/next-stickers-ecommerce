import React from "react";
import styles from "./dashboard.module.css";
import { getProducts } from "./actions";
import { Pagination } from "@mantine/core";
import { ProductCard } from "../productCard/ProductCard";
import useAuthStore from "../../store";

const PRODUCTS_PER_PAGE_LIMIT = 10;

const Dashboard = () => {
  const {
    products,
    setProducts,
    activeProductPage,
    setActiveProductPage,
    user,
  } = useAuthStore((state: any) => ({
    products: state.products,
    setProducts: state.setProducts,
    activeProductPage: state.activeProductPage,
    setActiveProductPage: state.setActiveProductPage,
    user: state.user,
  }));

  const getAndSetProducts = async () => {
    const res = await getProducts(activeProductPage, PRODUCTS_PER_PAGE_LIMIT);
    if (res?.code === 1) {
      setProducts(res?.data);
    }
  };
  React.useEffect(() => {
    getAndSetProducts();
  }, [activeProductPage]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Welcome, {user?.email}</h1>
      </div>
      <div className={styles.productCards}>
        {products.map((product: any, index: number) => {
          return (
            <ProductCard
              id={product._id}
              name={product.name}
              desc={product.desc}
              imageURL={product.image}
              price={product.price}
              key={index}
            />
          );
        })}
      </div>
      <Pagination
        page={activeProductPage}
        onChange={setActiveProductPage}
        total={
          products.length === PRODUCTS_PER_PAGE_LIMIT
            ? activeProductPage + 1
            : activeProductPage
        } // Jugaad. Useless Jugaad.
        className={styles.pagination}
      />
    </div>
  );
};
export default Dashboard;
