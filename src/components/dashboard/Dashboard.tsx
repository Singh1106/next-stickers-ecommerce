import React from "react";
import styles from "./dashboard.module.css";
import { getProducts } from "./actions";
import { Pagination } from "@mantine/core";
import { ProductCard } from "../productCard/ProductCard";
import useAuthStore from "../../store";

const PRODUCTS_PER_PAGE_LIMIT = 10;

const Dashboard = () => {
  const [products, setProducts] = React.useState([]);
  const [activePage, setPage] = React.useState(1);
  const { setIsLoggedIn, user } = useAuthStore((state: any) => ({
    setIsLoggedIn: state.setIsLoggedIn,
    user: state.user,
  }));

  const getAndSetProducts = async () => {
    const res = await getProducts(activePage, PRODUCTS_PER_PAGE_LIMIT);
    console.log(res);
    if (res?.code === 1) {
      setProducts(res?.data);
    }
  };
  React.useEffect(() => {
    setIsLoggedIn(true);
  }, []);

  React.useEffect(() => {
    getAndSetProducts();
  }, [activePage]);

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
        page={activePage}
        onChange={setPage}
        total={
          products.length === PRODUCTS_PER_PAGE_LIMIT
            ? activePage + 1
            : activePage
        } // Jugaad. Useless Jugaad.
        className={styles.pagination}
      />
    </div>
  );
};
export default Dashboard;
