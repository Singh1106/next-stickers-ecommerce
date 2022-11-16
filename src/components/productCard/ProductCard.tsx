import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Button,
} from "@mantine/core";
import { toast } from "react-toastify";
import useAuthStore from "../../store";
import { cartItem } from "../../types/types";
import { updateCart } from "./actions";
import styles from "./productcard.module.css";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    border: "2px solid #228be6",
    margin: "10px",
    height: "420px",
    width: "250px",
  },
  detailsGroup: {
    marginBottom: "10px",
  },
  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

interface ProductCardProps {
  name: string;
  desc: string;
  imageURL: string;
  id: string;
  price: number;
}

export function ProductCard({
  id,
  name,
  desc,
  imageURL,
  price,
}: ProductCardProps) {
  const { cart, setCart } = useAuthStore((state: any) => ({
    cart: state.cart,
    setCart: state.setCart,
  }));
  const { classes } = useStyles();

  const checkForProduct = (cart: cartItem[]): boolean => {
    const item = cart.filter((cartItem: cartItem) => cartItem.id === id);
    return item.length > 0;
  };

  const addToCartHandler = async () => {
    const isThisProductInCart = checkForProduct(cart);
    if (!isThisProductInCart) {
      const newCart = [...cart, { id, quantity: 1, name, price }];
      const res = await updateCart(newCart);
      if (res?.data.code === 1) {
        setCart(newCart);
        toast("Successfully added to cart.");
      }
      return;
    }
    toast.error(
      "Its already in the cart. You can update the count from there."
    );
  };
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={imageURL} alt={name} className={styles.image} />
      </Card.Section>
      <Group position="apart" mt="md" className={classes.detailsGroup}>
        <div>
          <Text weight={500}>{name}</Text>
          <Text size="xs" color="dimmed">
            {desc}
          </Text>
        </div>
        <Badge variant="outline">Sticker</Badge>
      </Group>
      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <Text size="sm">Rupees: {price}</Text>
          <Button radius="xl" style={{ flex: 1 }} onClick={addToCartHandler}>
            Add to cart.
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}
