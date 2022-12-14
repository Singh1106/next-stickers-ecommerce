import { ScrollArea, Table } from "@mantine/core";
import React from "react";
import { UserRow } from "../components/userRow/UserRow";
import { getUnFulfilledOrdersUsers } from "./actions";
import { useQuery } from "react-query";
const UnfulfilledOrders = () => {
  const { data, isLoading, isError } = useQuery(
    "getUnFulfilledOrdersUsers",
    getUnFulfilledOrdersUsers
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Something went wrong, please try logging in again.</div>;
  }
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
            {data.users.map((user: any, index: number) => {
              return <UserRow key={index} item={user} />;
            })}
          </tbody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default UnfulfilledOrders;
