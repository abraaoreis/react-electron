import {
  Drawer,
  TextField,
  Button,
  Stack,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Divider,
} from '@mui/material';
import { Node } from '../types/database';
import { useNodeEditPanel } from '../hooks/useNodeEditPanel';

interface NodeEditPanelProps {
  open: boolean;
  node: Node | null;
  onClose: () => void;
  onSave: () => void;
}

export function NodeEditPanel({
  open,
  node,
  onClose,
  onSave,
}: NodeEditPanelProps) {
  const {
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
  } = useNodeEditPanel({ node, onClose, onSave });

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleCancel}
      PaperProps={{
        sx: {
          width: 350,
          padding: 2,
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Editar Nó
        </Typography>

        <Divider sx={{ marginBottom: 2 }} />

        {/* Conteúdo */}
        <Box sx={{ flex: 1, overflowY: 'auto', marginBottom: 2 }}>
          {/* Erro */}
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          {/* Sucesso */}
          {success && (
            <Alert severity="success" sx={{ marginBottom: 2 }}>
              Nó salvo com sucesso!
            </Alert>
          )}

          {/* Formulário */}
          {node && (
            <Stack spacing={2}>
              {/* ID do Nó (Readonly) */}
              <TextField
                label="ID do Nó"
                value={node.id}
                disabled
                fullWidth
                size="small"
              />

              {/* Label */}
              <TextField
                label="Label *"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                fullWidth
                size="small"
                disabled={loading}
                error={label.trim() === '' && label !== ''}
                helperText={label.trim() === '' && label !== '' ? 'Label é obrigatório' : ''}
              />

              {/* Título */}
              <TextField
                label="Título *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                size="small"
                disabled={loading}
                error={title.trim() === '' && title !== ''}
                helperText={title.trim() === '' && title !== '' ? 'Título é obrigatório' : ''}
              />

              {/* Imagem (URL) */}
              <TextField
                label="URL da Imagem"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                fullWidth
                size="small"
                disabled={loading}
                placeholder="https://exemplo.com/imagem.jpg"
              />

              {/* Preview da Imagem */}
              {image && (
                <Box
                  sx={{
                    marginTop: 1,
                    padding: 1,
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f5f5f5',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="caption" sx={{ marginBottom: 1, display: 'block' }}>
                    Preview:
                  </Typography>
                  <img
                    src={image}
                    alt="preview"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23ddd%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%23999%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImagem inválida%3C/text%3E%3C/svg%3E';
                    }}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '150px',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              )}
            </Stack>
          )}
        </Box>

        <Divider sx={{ marginBottom: 2 }} />

        {/* Botões */}
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading || !label.trim() || !title.trim()}
            fullWidth
          >
            {loading ? <CircularProgress size={20} /> : 'Salvar'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            disabled={loading}
            fullWidth
          >
            Cancelar
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}

export default NodeEditPanel;
