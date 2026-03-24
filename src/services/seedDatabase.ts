import {
  addNode,
  addEdge,
  Node,
  Edge,
  DiagramData,
} from './database';

export function seedDiagramDatabase(): DiagramData {

  const nodes: Node[] = [
    {
      id: 'node-1',
      data: {
        id: 'node-1',
        label: 'Processamento',
        image: 'https://via.placeholder.com/50?text=P',
        title: 'Nó de Processamento',
      },
      position: {
        x: 100,
        y: 100,
      },
    },
    {
      id: 'node-2',
      data: {
        id: 'node-2',
        label: 'Validação',
        image: 'https://via.placeholder.com/50?text=V',
        title: 'Nó de Validação',
      },
      position: {
        x: 350,
        y: 100,
      },
    },
    {
      id: 'node-3',
      data: {
        id: 'node-3',
        label: 'Saída',
        image: 'https://via.placeholder.com/50?text=S',
        title: 'Nó de Saída',
      },
      position: {
        x: 600,
        y: 100,
      },
    },
    {
      id: 'node-4',
      data: {
        id: 'node-4',
        label: 'Armazenamento',
        image: 'https://via.placeholder.com/50?text=A',
        title: 'Nó de Armazenamento',
      },
      position: {
        x: 350,
        y: 300,
      },
    },
  ];

  // Criar edges (conexões) entre nós
  const edges: Edge[] = [
    {
      id: 'edge-1-2',
      type: 'smoothstep',
      source: 'node-1',
      target: 'node-2',
    },
    {
      id: 'edge-2-3',
      type: 'smoothstep',
      source: 'node-2',
      target: 'node-3',
    },
    {
      id: 'edge-2-4',
      type: 'smoothstep',
      source: 'node-2',
      target: 'node-4',
    },
  ];

  // Adicionar nós ao banco de dados
  nodes.forEach(node => {
    try {
      addNode(node);
    } catch (error) {
      // Nó já existente, ignorar
    }
  });

  // Adicionar edges ao banco de dados
  edges.forEach(edge => {
    try {
      addEdge(edge);
    } catch (error) {
      // Edge já existente, ignorar
    }
  });

  console.log('✓ Banco de dados populado com sucesso');
  console.log(`  - ${nodes.length} nós criados`);
  console.log(`  - ${edges.length} conexões criadas`);

  return {
    nodes,
    edges,
  };
}
