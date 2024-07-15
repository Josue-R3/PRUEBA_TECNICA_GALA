import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardBody } from '@nextui-org/react';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="testimonial-container">
      <h2 className="text-2xl font-bold text-center my-6">Testimonios</h2>
      <div className="testimonial-slider">
        {testimonials.concat(testimonials).map((testimonial) => (
          <Card key={testimonial.id} className="testimonial-card">
            <CardBody className="flex flex-col items-center text-center">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={200}
                height={200}
                className="rounded-full"
              />
              <p className="mt-2 italic">"{testimonial.testimonial}"</p>
              <p className="mt-2 font-bold">{testimonial.name}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
