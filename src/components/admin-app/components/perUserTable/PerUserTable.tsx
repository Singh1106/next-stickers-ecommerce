import { useState, useEffect } from "react";
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Text,
  Badge,
  Button,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

interface TableSelectionProps {
  data: {
    name: string;
    quantity: number;
    status: string;
    orderedAt: string;
    id: string;
  }[];
  markThemAsShipped: () => void;
  markThemAsAccepted: () => void;
  markThemAsFulfilled: () => void;
  setOrdersToUpdate: React.Dispatch<React.SetStateAction<string[]>>;
}

export function PerUserTable({
  data,
  markThemAsShipped,
  markThemAsAccepted,
  markThemAsFulfilled,
  setOrdersToUpdate,
}: TableSelectionProps) {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState([""]);

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );
  useEffect(() => {
    console.log(selection);
    setOrdersToUpdate(selection);
  }, [selection]);

  const rows = data.map((item) => {
    const badgeVariant = (() => {
      if (item.status === "Accepted") {
        return "dot";
      }
      if (item.status === "Shipped") {
        return "filled";
      }
      return "filled";
    })();
    const selected = selection.includes(item.id);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {item.name}{" "}
              <div>
                <Badge variant={badgeVariant}>{item.status}</Badge>
              </div>
            </Text>
          </Group>
        </td>
        <td>{item.quantity}</td>
        <td>{item.orderedAt}</td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Button.Group>
        <Button
          disabled={!selection.length}
          onClick={markThemAsAccepted}
          variant="subtle"
        >
          Mark em as Accepted
        </Button>
        <Button
          disabled={!selection.length}
          onClick={markThemAsShipped}
          variant="subtle"
        >
          Mark em as Shipped
        </Button>
        <Button
          disabled={!selection.length}
          onClick={markThemAsFulfilled}
          variant="subtle"
        >
          Mark em as Fulfilled
        </Button>
      </Button.Group>

      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
                transitionDuration={0}
              />
            </th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Ordered At</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
