import React from "react";
import styles from "./dashboard.module.css";
import { getProducts } from "../productCard/actions";
import { ProductCard } from "../productCard/ProductCard";

const Dashboard = () => {
  const [products, setProducts] = React.useState([]);

  const getAndSetProducts = async () => {
    const res = await getProducts();
    console.log(res);
    if (res?.code === 1) {
      setProducts(res?.data);
    }
  };
  React.useEffect(() => {
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
