import { Group, Text, Anchor } from "@mantine/core";
import React from "react";
import { PerUserTable } from "../perUserTable/PerUserTable";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { updateOrdersStatus } from "./actions";
import { idText } from "typescript";

interface UsersTableProps {
  item: {
    _id: string;
    name: string;
    email: string;
    orders: any[];
  };
}

export function UserRow({ item }: UsersTableProps) {
  const [showTable, setShowTable] = React.useState<Boolean>(false);
  const queryClient = useQueryClient();
  const [ordersToUpdate, setOrdersToUpdate] = React.useState([""]);

  const markThemAsShipped = () => {
    mutation.mutate({
      userId: item._id,
      orders: ordersToUpdate,
      status: "Shipped",
    });
  };
  const markThemAsAccepted = () => {
    mutation.mutate({
      userId: item._id,
      orders: ordersToUpdate,
      status: "Accepted",
    });
  };
  const markThemAsFulfilled = () => {
    mutation.mutate({
      userId: item._id,
      orders: ordersToUpdate,
      status: "Fulfilled",
    });
  };

  const mutation = useMutation(updateOrdersStatus, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("getUnFulfilledOrdersUsers");
    },
  });

  return (
    <>
      <tr key={item._id}>
        <td>
          <Group spacing="sm">
            <Text
              size="sm"
              weight={500}
              onClick={() => {
                setShowTable(!showTable);
              }}
            >
              {item._id}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>
          <Anchor<"a">
            size="sm"
            href="#"
            onClick={(event) => event.preventDefault()}
          >
            {item.email}
          </Anchor>
        </td>
      </tr>
      {showTable && (
        <PerUserTable
          data={item.orders ?? []}
          markThemAsShipped={markThemAsShipped}
          markThemAsAccepted={markThemAsAccepted}
          markThemAsFulfilled={markThemAsFulfilled}
          setOrdersToUpdate={setOrdersToUpdate}
        />
      )}
    </>
  );
}
