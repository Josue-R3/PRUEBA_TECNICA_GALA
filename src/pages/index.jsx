import React from "react";
import Products from "../components/sections/products";
import Testimonials from "../components/sections/testimonials";
import Carousel from "../components/sections/carousel";

export default function Home() {
  return (
    <>
      {/*<div className="w-screen">
      <Carousel />
      </div>*/}
      <div className="m-4" >
        <Products />
      {/*<Testimonials />*/}
        </div>
    </>
  );
}
