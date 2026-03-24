import { useEffect, useState } from 'react';
import { Node, Edge, DiagramData } from '../types/database';

interface UseDiagramDataReturn {
  nodes: Node[];
  edges: Edge[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke: (channel: string, args?: any) => Promise<any>;
      };
    };
  }
}

export function useDiagramData(): UseDiagramDataReturn {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDiagramData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Primeiro, fazer seed do banco se estiver vazio
      try {
        await window.electron.ipcRenderer.invoke('db:seed');
      } catch (seedError) {
        // Seed pode falhar se o banco já tem dados, é ok
        console.log('Seed já foi executado ou banco já contém dados');
      }

      // Depois, obter os dados
      const data: DiagramData = await window.electron.ipcRenderer.invoke(
        'db:getDiagramData'
      );

      setNodes(data.nodes);
      setEdges(data.edges);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      console.error('Erro ao carregar dados do diagrama:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagramData();
  }, []);

  return {
    nodes,
    edges,
    loading,
    error,
    refetch: fetchDiagramData,
  };
}
