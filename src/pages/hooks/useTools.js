// hooks/useTools.js
import { useState, useEffect } from 'react';

export function useTools() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTools() {
      try {
        const response = await fetch('/api/getTools');
        if (!response.ok) {
          throw new Error('Failed to fetch tools');
        }
        const data = await response.json();
        setTools(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadTools();
  }, []);

  return { tools, loading, error };
}
