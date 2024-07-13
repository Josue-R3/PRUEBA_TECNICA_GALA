import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Tool {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const Products: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('/data/tools.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Tool[] = await response.json();
        setTools(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {tools.map((tool) => (
          <li key={tool.id}>
            <h2>{tool.name}</h2>
            <p>{tool.description}</p>
            <p>${tool.price}</p>
            <Image src={tool.image} alt={tool.name} width={150} height={100} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
