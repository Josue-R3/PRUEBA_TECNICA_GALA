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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {images.map((img) => (
        <div key={img.id}>
          <Image src={img.image} alt={img.name} width={800} height={400} layout="responsive" />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
