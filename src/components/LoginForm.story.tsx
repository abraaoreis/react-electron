// @ts-ignore
import { Meta, Story } from 'vitebook'
import LoginForm from './LoginForm'

export const meta: Meta = {
  title: 'Components/LoginForm',
  component: LoginForm,
}

export const Default: Story = () => {
  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', { email, password })
  }

  return <LoginForm onLogin={handleLogin} />
}

Default.title = 'Login Form'

export const WithPrefilledEmail: Story = () => {
  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', { email, password })
  }

  return <LoginForm onLogin={handleLogin} />
}

WithPrefilledEmail.title = 'Login Form com Email Pré-preenchido'

export const Validation: Story = () => {
  const handleLogin = (email: string, password: string) => {
    console.log('Login successfully with:', { email, password })
  }

  return (
    <div>
      <h2>Comportamento de Validação:</h2>
      <ul>
        <li>Email deve ser um endereço de email válido</li>
        <li>Senha deve conter exatamente 8 dígitos numéricos</li>
        <li>Campos obrigatórios</li>
      </ul>
      <LoginForm onLogin={handleLogin} />
    </div>
  )
}

Validation.title = 'Validações'

export const Design: Story = () => {
  return (
    <div>
      <h2>Especificações de Design:</h2>
      <ul>
        <li>Fundo: rgb(90, 91, 99)</li>
        <li>Card: Branco (background: #ffffff)</li>
        <li>Título "Login": Texto branco no fundo cinza</li>
        <li>Labels dos inputs: Cinza (#666666)</li>
        <li>Botão: Vermelho (#db052c) com texto branco</li>
        <li>Links: "Esqueci minha senha" e "Criar usuário"</li>
      </ul>
      <LoginForm />
    </div>
  )
}

Design.title = 'Especificações de Design'
