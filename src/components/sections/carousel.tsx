import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface ImageItem {
  id: number;
  name: string;
  image: string;
}

const Carousel: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/data/carrusel.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ImageItem[] = await response.json();
        setImages(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {images.map((img, index) => (
        <div
          key={img.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image src={img.image} alt={img.name} layout="fill" objectFit="cover" className="w-full h-full" />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
