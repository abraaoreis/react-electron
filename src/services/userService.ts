import { useQuery } from '@tanstack/react-query'

export interface User {
  id: number
  name: string
  email: string
}

// Simulated API call
const fetchUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'João Silva', email: 'joao@example.com' },
        { id: 2, name: 'Maria Santos', email: 'maria@example.com' },
        { id: 3, name: 'Pedro Oliveira', email: 'pedro@example.com' },
      ])
    }, 1000)
  })
}

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}

export default fetchUsers
