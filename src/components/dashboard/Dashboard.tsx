import React from "react";
import styles from "./dashboard.module.css";
import { getProducts } from "../productCard/actions";
import { ProductCard } from "../productCard/ProductCard";
import useAuthStore from "../../store";

const Dashboard = () => {
  const [products, setProducts] = React.useState([]);
  const { setIsLoggedIn } = useAuthStore((state: any) => ({
    setIsLoggedIn: state.setIsLoggedIn,
  }));

  const getAndSetProducts = async () => {
    const res = await getProducts();
    console.log(res);
    if (res?.code === 1) {
      setProducts(res?.data);
    }
  };
  React.useEffect(() => {
    setIsLoggedIn(true);
    getAndSetProducts();
  }, []);

  return (
    <div className={styles.container}>
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
    </div>
  );
};
export default Dashboard;
