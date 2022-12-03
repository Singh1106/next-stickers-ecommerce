import { Group, Text, Anchor } from "@mantine/core";
import React from "react";
import { PerUserTable } from "../perUserTable/PerUserTable";

interface UsersTableProps {
  item: {
    _id: string;
    name: string;
    email: string;
    orders?: any[];
  };
}

export function UserRow({ item }: UsersTableProps) {
  const [showTable, setShowTable] = React.useState<Boolean>(false);
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
      {showTable && <PerUserTable data={item.orders ?? []} />}
    </>
  );
}
