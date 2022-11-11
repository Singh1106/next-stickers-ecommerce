import React from "react";
import useAuthStore from "../../src/store";

const index = () => {
  const user = useAuthStore((state: any) => state.user);
  return <div>{JSON.stringify(user)}</div>;
};

export default index;
