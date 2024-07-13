import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  // Construir la ruta completa del archivo JSON
  const jsonDirectory = path.join(process.cwd(), 'public/data');
  const fileContents = await fs.readFile(jsonDirectory + '/tools.json', 'utf8');
  
  // Enviar el contenido del archivo JSON como respuesta
  res.status(200).json(JSON.parse(fileContents));
}
