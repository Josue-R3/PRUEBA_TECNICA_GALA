// pages/_app.js
import "../../public/styles/globals.css";
import Layout from "../components/layout/layout"
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps }) {
  return (
  <NextUIProvider>
    <Layout>
    <Component {...pageProps} />;
    </Layout>
  </NextUIProvider>
  );
}

export default MyApp;
