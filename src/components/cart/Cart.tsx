import { useState, useEffect } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  Group,
  Text,
  TextInput,
  Button,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import CartCounter from "../cartCounter/CartCounter";
import styles from "./cart.module.css";
import { addOrders } from "./actions";
import { toast } from "react-toastify";
import useAuthStore from "../../store";
import { useRouter } from "next/navigation";
import { updateCart } from "../productCard/actions";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },
  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface RowData {
  name: string;
  quantity: number;
  price: number;
  id: string;
}

interface TableSortProps {
  data: RowData[];
}

interface ThProps {
  children: React.ReactNode;
}

function Th({ children }: ThProps) {
  const { classes } = useStyles();
  return (
    <th className={classes.th}>
      <Group position="left">
        <Text weight={600} size="sm">
          {children}
        </Text>
      </Group>
    </th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) => item.name.toLowerCase().includes(query));
}

function Cart({ data }: TableSortProps) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const { setCart, orders, setOrders } = useAuthStore((state: any) => ({
    setCart: state.setCart,
    orders: state.orders,
    setOrders: state.setOrders,
  }));
  const router = useRouter();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };

  const getTotal = () => {
    let total = 0;
    data.map((filteredDataItem) => {
      total += filteredDataItem.quantity * filteredDataItem.price;
    });
    return total;
  };
  const goAheadHandler = async () => {
    try {
      const res = await addOrders(data);
      if (res?.code === 1) {
        toast("Order placed successfully");
        await updateCart([]);
        setCart([]);
        setOrders(res?.data);
        router.push("/orders");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }
  };
  useEffect(() => {
    setFilteredData(filterData(data, search));
  }, [search, data.length]);
  const rows = filteredData.map((row) => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td>
        <CartCounter id={row.id} name={row.name}>
          {row.quantity}
        </CartCounter>
      </td>
      <td>
        {row.price} Rupees x {row.quantity} = {row.price * row.quantity} Rupees
      </td>
    </tr>
  ));

  return (
    <ScrollArea className={styles.cartContainer}>
      <TextInput
        placeholder="Search by name"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
        className={styles.searchBar}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: "fixed", minWidth: 700 }}
        className={styles.mainTable}
      >
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={3}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className={styles.totalContainer}>
        Total price: {getTotal()}
        <Button
          variant="subtle"
          compact
          className={styles.checkoutBtn}
          disabled={getTotal() === 0}
          onClick={goAheadHandler}
        >
          {getTotal() === 0 ? "Yo, do not go ahead." : "Yo, go ahead."}
        </Button>
      </div>
    </ScrollArea>
  );
}

export default Cart;
