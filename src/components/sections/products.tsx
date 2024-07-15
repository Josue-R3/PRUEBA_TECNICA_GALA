import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { Card, CardBody, CardFooter, Button } from '@nextui-org/react';
import CartContext from '../../context/CartContext';

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
  const [addedToolIds, setAddedToolIds] = useState<Set<number>>(new Set());

  const { state, dispatch } = useContext(CartContext);

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

  const handleAddToCart = (tool: Tool) => {
    dispatch({ type: 'ADD_TO_CART', payload: tool });
    setAddedToolIds(prev => new Set(prev).add(tool.id));
    setTimeout(() => {
      setAddedToolIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(tool.id);
        return newSet;
      });
    }, 2000);
    console.log(`Added to cart: ${tool.name}, ID: ${tool.id}`);
  };

  const isInCart = (toolId: number) => {
    return state.items.some(item => item.tool.id === toolId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {tools.map((tool) => {
          const added = addedToolIds.has(tool.id);

          return (
            <Card key={tool.id} className="max-w-xs mx-auto">
              <CardBody>
                <Image src={tool.image} alt={tool.name} width={300} height={200} className="w-full h-auto object-cover"/>
                <p className="font-semibold text-lg mt-2">{tool.name}</p>
                <p className="text-gray-500">{tool.description}</p>
              </CardBody>
              <CardFooter className="flex justify-between items-center">
                <p className="font-bold text-xl">${tool.price}</p>
                <Button 
                  color={added ? "success" : "primary"} 
                  onClick={() => handleAddToCart(tool)} 
                  className={added ? "bg-[#15B75B]" : "bg-[#FFA400] hover:bg-yellow-600"}
                >
                  {added ? "Añadido al Carrito" : "Add to Cart"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
