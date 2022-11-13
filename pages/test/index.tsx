import React from "react";
import useAuthStore from "../../src/store";

const Test = () => {
  const user = useAuthStore((state: any) => state.user);
  return <div>{JSON.stringify(user)}</div>;
};

export default Test;
