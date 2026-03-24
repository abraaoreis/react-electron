import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLoginForm } from './useLoginForm'

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}))

// Mock the app store
const mockLogin = vi.fn()
vi.mock('../stores/appStore', () => ({
  default: vi.fn((selector) => selector({ login: mockLogin })),
}))

describe('useLoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should validate email correctly', () => {
    const { result } = renderHook(() => useLoginForm({}))

    act(() => {
      result.current.handleEmailChange({ target: { value: '' } } as any)
    })

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as any)
    })

    expect(result.current.errors.email).toBe('Email é obrigatório')

    act(() => {
      result.current.handleEmailChange({ target: { value: 'invalid' } } as any)
    })

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as any)
    })

    expect(result.current.errors.email).toBe('Email inválido')

    act(() => {
      result.current.handleEmailChange({ target: { value: 'test@example.com' } } as any)
    })

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as any)
    })

    expect(result.current.errors.email).toBeUndefined()
  })

  it('should validate password correctly', () => {
    const { result } = renderHook(() => useLoginForm({}))

    act(() => {
      result.current.handlePasswordChange({ target: { value: '' } } as any)
    })

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as any)
    })

    expect(result.current.errors.password).toBe('Senha é obrigatória')

    act(() => {
      result.current.handlePasswordChange({ target: { value: '123' } } as any)
    })

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as any)
    })

    expect(result.current.errors.password).toBe('Senha deve conter exatamente 8 dígitos')

    act(() => {
      result.current.handlePasswordChange({ target: { value: '12345678' } } as any)
    })

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as any)
    })

    expect(result.current.errors.password).toBeUndefined()
  })

  it('should submit form when valid', () => {
    const mockOnLogin = vi.fn()
    const { result } = renderHook(() => useLoginForm({ onLogin: mockOnLogin }))

    act(() => {
      result.current.handleEmailChange({ target: { value: 'test@example.com' } } as any)
      result.current.handlePasswordChange({ target: { value: '12345678' } } as any)
    })

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as any)
    })

    expect(result.current.successMessage).toBe('Login realizado com sucesso!')
    expect(mockOnLogin).toHaveBeenCalledWith('test@example.com', '12345678')
  })
})