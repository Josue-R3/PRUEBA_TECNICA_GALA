// pages/_app.js
import "../../public/styles/globals.css";
import Layout from "../components/layout/layout"
import {CartProvider} from '../context/CartContext'
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps }) {
  return (
  <NextUIProvider>
    <CartProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </CartProvider>
  </NextUIProvider>
  );
}

export default MyApp;
