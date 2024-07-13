import React from "react";
import Products from "../components/sections/products";
import Testimonials from "../components/sections/testimonials";
import Carousel from "../components/sections/carousel";

export default function Home() {
  return (
    <>
      <h1>GALA PRUEBA TECNICA</h1>
      <Carousel />
      <Products />
      <Testimonials />
    </>
  );
}
