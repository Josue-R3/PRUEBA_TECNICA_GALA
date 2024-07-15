import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Card, CardBody } from '@nextui-org/react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface Testimonial {
  id: number;
  name: string;
  testimonial: string;
  avatar: string;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/data/testimonials.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Testimonial[] = await response.json();
        setTestimonials(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500, // Incrementa la duración de la transición para que sea más suave
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // Aumenta el tiempo de reproducción automática
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="testimonial-container">
      <h2 className="text-2xl font-bold text-center my-6">Testimonios</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={`${testimonial.id}-${index}`} className="testimonial-card">
            <Card className="p-4">
              <CardBody className="flex flex-col items-center text-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <p className="mt-2 italic">&quot;{testimonial.testimonial}&quot;</p>
                <p className="mt-2 font-bold">{testimonial.name}</p>
              </CardBody>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
