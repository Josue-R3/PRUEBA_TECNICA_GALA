declare module 'react-slick' {
    import * as React from 'react';
  
    interface Settings {
      dots?: boolean;
      infinite?: boolean;
      speed?: number;
      slidesToShow?: number;
      slidesToScroll?: number;
      autoplay?: boolean;
      autoplaySpeed?: number;
      pauseOnHover?: boolean;
      responsive?: {
        breakpoint: number;
        settings: {
          slidesToShow?: number;
          slidesToScroll?: number;
          infinite?: boolean;
          dots?: boolean;
          initialSlide?: number;
        };
      }[];
    }
  
    class Slider extends React.Component<Settings> {}
  
    export = Slider;
  }
  