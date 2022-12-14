import { useState, useEffect } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  Group,
  Text,
  TextInput,
  Badge,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import styles from "./orders.module.css";

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
  status?: string;
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
  console.log(query);
  const filteredData = data.filter((item) => {
    console.log(item);
    return item.name.toLowerCase().includes(query);
  });
  return filteredData;
}

function Orders({ data }: TableSortProps) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };
  useEffect(() => {
    setFilteredData(filterData(data, search));
  }, [search]);
  const rows = filteredData.map((row, index) => (
    <tr key={index}>
      <td>
        <div className={styles.name}>
          {row.name}
          <div className={styles.badge}>
            <Badge variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
              {row?.status ?? "Unstatused"}
            </Badge>
          </div>
        </div>
      </td>
      <td>{row.quantity}</td>
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
          {filteredData.length > 0 ? (
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
    </ScrollArea>
  );
}

export default Orders;
