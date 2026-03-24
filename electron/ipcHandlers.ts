import { ipcMain } from 'electron';
import {
  addNode,
  getAllNodes,
  getNode,
  updateNode,
  deleteNode,
  addEdge,
  getAllEdges,
  getEdge,
  deleteEdge,
  getDiagramData,
  Node,
  Edge,
  DiagramData,
} from '../src/services/database';
import { seedDiagramDatabase } from '../src/services/seedDatabase';

export function setupIpcHandlers() {
  console.log('[IPC] Configurando manejadores...');
  // Semilla (seed) de la base de datos
  ipcMain.handle('db:seed', async () => {
    try {
      return seedDiagramDatabase();
    } catch (error) {
      console.error('Error al ejecutar el seed (semilla):', error);
      throw error;
    }
  });

  // Operaciones con Nodos
  ipcMain.handle('db:addNode', async (event, node: Node) => {
    try {
      addNode(node);
      return { success: true };
    } catch (error) {
      console.error('Error al agregar nodo:', error);
      throw error;
    }
  });

  ipcMain.handle('db:getAllNodes', async () => {
    try {
      return getAllNodes();
    } catch (error) {
      console.error('Error al obtener nodos:', error);
      throw error;
    }
  });

  ipcMain.handle('db:getNode', async (event, id: string) => {
    try {
      return getNode(id);
    } catch (error) {
      console.error('Error al obtener nodo:', error);
      throw error;
    }
  });

  ipcMain.handle('db:updateNode', async (event, node: Node) => {
    try {
      updateNode(node);
      return { success: true };
    } catch (error) {
      console.error('Error al actualizar nodo:', error);
      throw error;
    }
  });

  ipcMain.handle('db:deleteNode', async (event, id: string) => {
    try {
      deleteNode(id);
      return { success: true };
    } catch (error) {
      console.error('Error al eliminar nodo:', error);
      throw error;
    }
  });

  // Operaciones con Aristas (Edges)
  ipcMain.handle('db:addEdge', async (event, edge: Edge) => {
    try {
      addEdge(edge);
      return { success: true };
    } catch (error) {
      console.error('Error al agregar arista (edge):', error);
      throw error;
    }
  });

  ipcMain.handle('db:getAllEdges', async () => {
    try {
      return getAllEdges();
    } catch (error) {
      console.error('Error al obtener aristas (edges):', error);
      throw error;
    }
  });

  ipcMain.handle('db:getEdge', async (event, id: string) => {
    try {
      return getEdge(id);
    } catch (error) {
      console.error('Error al obtener arista (edge):', error);
      throw error;
    }
  });

  ipcMain.handle('db:deleteEdge', async (event, id: string) => {
    try {
      deleteEdge(id);
      return { success: true };
    } catch (error) {
      console.error('Error al eliminar arista (edge):', error);
      throw error;
    }
  });

  // Diagrama completo
  ipcMain.handle('db:getDiagramData', async (): Promise<DiagramData> => {
    try {
      return getDiagramData();
    } catch (error) {
      console.error('Error al obtener datos del diagrama:', error);
      throw error;
    }
  });
}
