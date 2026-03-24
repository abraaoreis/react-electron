import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { NodeEditPanel } from './NodeEditPanel';
import { useDiagramViewer } from '../hooks/useDiagramViewer';

interface DiagramViewerProps {
  height?: string;
}

export function DiagramViewer({ height = '600px' }: DiagramViewerProps) {
  const {
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
  } = useDiagramViewer();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={height}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box height={height}>
        <Alert severity="error">
          Erro ao carregar diagrama: {error.message}
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Box height={height} style={{ border: '1px solid #ccc', position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          onConnect={handleConnect}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </Box>

      {/* Painel de Edição de Nó */}
      <NodeEditPanel
        open={editPanelOpen}
        node={selectedNode}
        onClose={handleEditPanelClose}
        onSave={handleNodeSave}
      />

      {/* Diálogo de Confirmação de Conexão */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelConnection}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirmar Conexão</DialogTitle>
        <DialogContent>
          Deseja conectar o nó "{connectionToConfirm?.connection.source}" ao nó "
          {connectionToConfirm?.connection.target}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelConnection} disabled={savingEdge}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmConnection}
            variant="contained"
            color="primary"
            disabled={savingEdge}
          >
            {savingEdge ? <CircularProgress size={20} /> : 'Confirmar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DiagramViewer;
