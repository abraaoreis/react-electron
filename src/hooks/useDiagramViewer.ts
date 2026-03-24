import { useCallback, useState, useEffect } from 'react';
import { Node as RFNode, Edge as RFEdge, useNodesState, useEdgesState, Connection } from 'reactflow';
import { useDiagramData } from './useDiagramData';
import { Node, Edge } from '../types/database';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke: (channel: string, args?: any) => Promise<any>;
      };
    };
  }
}

export function useDiagramViewer() {
  const { nodes: dbNodes, edges: dbEdges, loading, error, refetch } = useDiagramData();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Estados para edição de nó
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [editPanelOpen, setEditPanelOpen] = useState(false);

  // Estados para confirmação de conexão
  const [connectionToConfirm, setConnectionToConfirm] = useState<{
    connection: Connection;
    edgeId: string;
  } | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [savingEdge, setSavingEdge] = useState(false);

  // Converter dados do banco para formato React Flow
  useEffect(() => {
    const rfNodes: RFNode[] = dbNodes.map((node: Node) => ({
      id: node.id,
      data: { label: node.data.label },
      position: node.position,
      style: {
        padding: '10px',
        borderRadius: '8px',
        border: '2px solid #222',
        backgroundColor: '#fff',
        fontSize: '12px',
        textAlign: 'center',
        minWidth: '100px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
    }));

    const rfEdges: RFEdge[] = dbEdges.map((edge: Edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type || 'smoothstep',
      animated: true,
      style: {
        stroke: '#222',
        strokeWidth: 2,
      },
    }));

    setNodes(rfNodes);
    setEdges(rfEdges);
  }, [dbNodes, dbEdges, setNodes, setEdges]);

  // Handler para clique em nó
  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: RFNode) => {
      const dbNode = dbNodes.find((n) => n.id === node.id);
      if (dbNode) {
        setSelectedNode(dbNode);
        setEditPanelOpen(true);
      }
    },
    [dbNodes]
  );

  // Handler para fechar painel de edição
  const handleEditPanelClose = useCallback(() => {
    setEditPanelOpen(false);
    setSelectedNode(null);
  }, []);

  // Handler para salvar nó (dispara refetch)
  const handleNodeSave = useCallback(() => {
    refetch();
  }, [refetch]);

  // Handler para conectar nós
  const handleConnect = useCallback((connection: Connection) => {
    // Gerar ID único para a edge
    const edgeId = `edge_${connection.source}_${connection.target}_${Date.now()}`;

    // Armazenar conexão pendente e abrir diálogo
    setConnectionToConfirm({ connection, edgeId });
    setConfirmDialogOpen(true);
  }, []);

  // Handler para confirmar conexão
  const handleConfirmConnection = useCallback(async () => {
    if (!connectionToConfirm) return;

    try {
      setSavingEdge(true);

      const newEdge: Edge = {
        id: connectionToConfirm.edgeId,
        source: connectionToConfirm.connection.source || '',
        target: connectionToConfirm.connection.target || '',
        type: 'smoothstep',
      };

      // Salvar edge no banco via IPC
      await window.electron.ipcRenderer.invoke('db:addEdge', newEdge);

      // Refetch dados
      await refetch();

      // Fechar diálogo
      setConfirmDialogOpen(false);
      setConnectionToConfirm(null);
    } catch (err) {
      console.error('Erro ao adicionar conexão:', err);
      alert(`Erro ao adicionar conexão: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
    } finally {
      setSavingEdge(false);
    }
  }, [connectionToConfirm, refetch]);

  // Handler para cancelar conexão
  const handleCancelConnection = useCallback(() => {
    setConfirmDialogOpen(false);
    setConnectionToConfirm(null);
  }, []);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    handleNodeClick,
    selectedNode,
    editPanelOpen,
    handleEditPanelClose,
    handleNodeSave,
    handleConnect,
    confirmDialogOpen,
    connectionToConfirm,
    handleConfirmConnection,
    handleCancelConnection,
    savingEdge,
    loading,
    error,
  };
}