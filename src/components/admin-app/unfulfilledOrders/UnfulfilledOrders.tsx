import { ScrollArea, Table } from "@mantine/core";
import React from "react";
import { UserRow } from "../components/userRow/UserRow";
import { getUnFulfilledOrdersUsers } from "./actions";

const UnfulfilledOrders = () => {
  const [users, setUsers] = React.useState([]);
  const getOrders = async () => {
    const res = await getUnFulfilledOrdersUsers();
    if (res?.code === 1) {
      setUsers(res?.users);
    }
  };
  React.useEffect(() => {
    getOrders();
  }, []);
  return (
    <div>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>ID. Click on id to expand</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return <UserRow item={user} />;
            })}
          </tbody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default UnfulfilledOrders;
