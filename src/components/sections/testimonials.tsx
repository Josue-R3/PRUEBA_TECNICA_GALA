import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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
    <div>
      <h2>Testimonios</h2>
      <ul>
        {testimonials.map((testimonial) => (
          <li key={testimonial.id} className="mb-4 flex flex-col items-center text-center">
            <Image src={testimonial.avatar} alt={testimonial.name} width={150} height={150} className="rounded-full" />
            <p className="mt-2 italic">&quot;{testimonial.testimonial}&quot;</p>
            <p className="mt-2 font-bold">{testimonial.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Testimonials;
