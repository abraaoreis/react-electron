import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import useAppStore from '../stores/appStore';

interface FormErrors {
  email?: string;
  password?: string;
}

interface UseLoginFormProps {
  onLogin?: (email: string, password: string) => void;
}

const loginSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória').regex(/^\d{8}$/, 'Senha deve conter exatamente 8 dígitos'),
});

export function useLoginForm({ onLogin }: UseLoginFormProps) {
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (): boolean => {
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === 'email' && !newErrors.email) {
          newErrors.email = issue.message;
        } else if (issue.path[0] === 'password' && !newErrors.password) {
          newErrors.password = issue.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    if (validateForm()) {
      setSuccessMessage('Login realizado com sucesso!');
      login(email);
      onLogin?.(email, password);

      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (errors.email) {
      setErrors({ ...errors, email: undefined });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 8) {
      setPassword(value);
      if (errors.password) {
        setErrors({ ...errors, password: undefined });
      }
    }
  };

  return {
    email,
    password,
    errors,
    successMessage,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
  };
}