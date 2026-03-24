import Database from 'better-sqlite3';
import * as path from 'path';
import { app } from 'electron';

// Tipo para datos del nodo
export interface NodeData {
  id: string;
  label: string;
  image?: string;
  title: string;
}

// Tipo para nodo completo
export interface Node {
  id: string;
  data: NodeData;
  position: {
    x: number;
    y: number;
  };
}

// Tipo para arista (edge)
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

let db: Database.Database;

function initializeDatabase() {
  try {
    const dbPath = path.join(app.getPath('userData'), 'diagram.db');
    console.log('[Base de Datos] Ruta:', dbPath);
    db = new Database(dbPath);
    console.log('[Base de Datos] Instancia creada con éxito');
  } catch (error) {
    console.error('[Base de Datos] Error al inicializar:', error);
    throw error;
  }

  // Crear tabla de nodos
  db.exec(`
    CREATE TABLE IF NOT EXISTS nodes (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      image TEXT,
      title TEXT NOT NULL,
      position_x REAL NOT NULL,
      position_y REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Crear tabla de aristas (edges)
  db.exec(`
    CREATE TABLE IF NOT EXISTS edges (
      id TEXT PRIMARY KEY,
      type TEXT,
      source TEXT NOT NULL,
      target TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (source) REFERENCES nodes(id) ON DELETE CASCADE,
      FOREIGN KEY (target) REFERENCES nodes(id) ON DELETE CASCADE
    )
  `);
}

export function getDatabase(): Database.Database {
  if (!db) {
    initializeDatabase();
  }
  return db;
}

// Funciones para CRUD de Nodos
export function addNode(node: Node): void {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO nodes (id, label, image, title, position_x, position_y)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    node.id,
    node.data.label,
    node.data.image || null,
    node.data.title,
    node.position.x,
    node.position.y
  );
}

export function getNode(id: string): Node | undefined {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT id, label, image, title, position_x, position_y
    FROM nodes WHERE id = ?
  `);
  const row = stmt.get(id) as any;
  if (!row) return undefined;

  return {
    id: row.id,
    data: {
      id: row.id,
      label: row.label,
      image: row.image,
      title: row.title,
    },
    position: {
      x: row.position_x,
      y: row.position_y,
    },
  };
}

export function getAllNodes(): Node[] {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT id, label, image, title, position_x, position_y
    FROM nodes
  `);
  const rows = stmt.all() as any[];

  return rows.map(row => ({
    id: row.id,
    data: {
      id: row.id,
      label: row.label,
      image: row.image,
      title: row.title,
    },
    position: {
      x: row.position_x,
      y: row.position_y,
    },
  }));
}

export function updateNode(node: Node): void {
  const db = getDatabase();
  const stmt = db.prepare(`
    UPDATE nodes
    SET label = ?, image = ?, title = ?, position_x = ?, position_y = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  stmt.run(
    node.data.label,
    node.data.image || null,
    node.data.title,
    node.position.x,
    node.position.y,
    node.id
  );
}

export function deleteNode(id: string): void {
  const db = getDatabase();
  const stmt = db.prepare('DELETE FROM nodes WHERE id = ?');
  stmt.run(id);
}

// Funciones para CRUD de Aristas (Edges)
export function addEdge(edge: Edge): void {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO edges (id, type, source, target)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(edge.id, edge.type || null, edge.source, edge.target);
}

export function getEdge(id: string): Edge | undefined {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT id, type, source, target FROM edges WHERE id = ?
  `);
  const row = stmt.get(id) as any;
  if (!row) return undefined;

  return {
    id: row.id,
    type: row.type,
    source: row.source,
    target: row.target,
  };
}

export function getAllEdges(): Edge[] {
  const db = getDatabase();
  const stmt = db.prepare(`
    SELECT id, type, source, target FROM edges
  `);
  const rows = stmt.all() as any[];

  return rows.map(row => ({
    id: row.id,
    type: row.type,
    source: row.source,
    target: row.target,
  }));
}

export function deleteEdge(id: string): void {
  const db = getDatabase();
  const stmt = db.prepare('DELETE FROM edges WHERE id = ?');
  stmt.run(id);
}

// Función para obtener el diagrama completo
export function getDiagramData(): DiagramData {
  return {
    nodes: getAllNodes(),
    edges: getAllEdges(),
  };
}

// Función para limpiar la base de datos (útil para pruebas/reinicio)
export function clearDatabase(): void {
  const db = getDatabase();
  db.exec('DELETE FROM edges');
  db.exec('DELETE FROM nodes');
}

// Función para cerrar la conexión con la base de datos
export function closeDatabase(): void {
  if (db) {
    db.close();
  }
}
