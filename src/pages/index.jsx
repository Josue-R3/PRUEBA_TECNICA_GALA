// pages/index.js
import { useTools } from "./hooks/useTools";
import Image from "next/image";

export default function Home() {
  const { tools, loading, error } = useTools();

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
}
