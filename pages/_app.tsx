import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../src/components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
        <ToastContainer autoClose={5000} position="bottom-right" />
      </MantineProvider>
    </Layout>
  );
}
