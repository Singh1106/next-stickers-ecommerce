import React from "react";
import styles from "./dashboard.module.css";
import { getUser } from "./actions";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/index";
import { getProducts } from "../productCard/actions";
import { ProductCard } from "../productCard/ProductCard";

const Dashboard = () => {
  const router = useRouter();
  const { setUser, setIsLoggedIn } = useAuthStore((state: any) => ({
    setUser: state.setUser,
    setIsLoggedIn: state.setIsLoggedIn,
  }));
  const [products, setProducts] = React.useState([]);
  const getAndSetUser = async () => {
    const res = await getUser();
    if (res.code === 1) {
      setUser({
        name: res?.user.name,
        email: res?.user.email,
        age: res?.user.age,
      });
      setIsLoggedIn(true);
    } else {
      router.push("/");
    }
  };

  const getAndSetProducts = async () => {
    const res = await getProducts();
    console.log(res);
    if (res?.code === 1) {
      setProducts(res?.data);
    }
  };
  React.useEffect(() => {
    getAndSetUser();
    getAndSetProducts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.productCard}>
        {products.map((product: any, index: number) => {
          return (
            <ProductCard
              id={product._id}
              name={product.name}
              desc={product.desc}
              imageURL={product.image}
              key={index}
              price={product.price}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Dashboard;
