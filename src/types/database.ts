// Tipo para dados do nó
export interface NodeData {
  id: string;
  label: string;
  image?: string;
  title: string;
}

// Tipo para nó completo
export interface Node {
  id: string;
  data: NodeData;
  position: {
    x: number;
    y: number;
  };
}

// Tipo para edge
export interface Edge {
  id: string;
  type?: string;
  source: string;
  target: string;
}

// Tipo para diagrama completo
export interface DiagramData {
  nodes: Node[];
  edges: Edge[];
}