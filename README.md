# Meu Projeto

Este é um projeto Electron com React, TypeScript e Vite.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd meu-projeto
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Executando o Projeto

### Desenvolvimento

Para executar o projeto em modo de desenvolvimento (com hot reload):
```bash
npm run electron-dev
```

Isso iniciará o servidor Vite e o Electron simultaneamente.

### Apenas o Frontend

Para executar apenas o frontend React:
```bash
npm run dev
```

### Construção

Para construir o projeto para produção:
```bash
npm run build
```

### Executar Electron com Build

Para executar o Electron com o build de produção:
```bash
npm run electron
```

### Executar Testes

Para executar os testes unitários:
```bash
npm test
```

Para executar os testes uma vez (modo CI):
```bash
npm test -- --run
```

## Estrutura do Projeto

- `src/`: Código fonte React/TypeScript
- `electron/`: Código do processo principal do Electron
- `public/`: Assets estáticos
- `dist/`: Build de produção

## Tecnologias Utilizadas

- React
- TypeScript
- Electron
- Vite
- Material-UI
- Zustand
- React Flow
- Better SQLite3