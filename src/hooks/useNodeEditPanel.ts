import { useState, useEffect } from 'react';
import { Node } from '../types/database';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke: (channel: string, args?: any) => Promise<any>;
      };
    };
  }
}

interface UseNodeEditPanelProps {
  node: Node | null;
  onClose: () => void;
  onSave: () => void;
}

export function useNodeEditPanel({ node, onClose, onSave }: UseNodeEditPanelProps) {
  const [label, setLabel] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Atualizar campos quando nó mudar
  useEffect(() => {
    if (node) {
      setLabel(node.data.label || '');
      setTitle(node.data.title || '');
      setImage(node.data.image || '');
      setError(null);
      setSuccess(false);
    }
  }, [node]);

  const handleSave = async () => {
    if (!node) return;

    // Validação básica
    if (!label.trim() || !title.trim()) {
      setError('Label e Título são obrigatórios');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Preparar dados do nó atualizado
      const updatedNode: Node = {
        ...node,
        data: {
          id: node.data.id,
          label: label.trim(),
          title: title.trim(),
          image: image.trim() || undefined,
        },
      };

      // Salvar via IPC
      await window.electron.ipcRenderer.invoke('db:updateNode', updatedNode);

      setSuccess(true);

      // Callback para refetch dos dados no componente pai
      onSave();

      // Fechar drawer após um pequeno delay para mostrar sucesso
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao salvar nó';
      setError(errorMessage);
      console.error('Erro ao salvar nó:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setError(null);
    setSuccess(false);
    onClose();
  };

  return {
    label,
    setLabel,
    title,
    setTitle,
    image,
    setImage,
    loading,
    error,
    success,
    handleSave,
    handleCancel,
  };
}