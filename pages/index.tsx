import { MantineProvider } from "@mantine/core";
import { LoginForm } from "../src/components/login/LoginForm";

export default function Home() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <LoginForm />
    </MantineProvider>
  );
}
