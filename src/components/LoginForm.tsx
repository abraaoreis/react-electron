import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Stack,
  Alert,
} from '@mui/material';
import { useLoginForm } from '../hooks/useLoginForm';

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const {
    email,
    password,
    errors,
    successMessage,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
  } = useLoginForm({ onLogin });

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(90, 91, 99)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: '#ffffff',
          borderRadius: 2,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              color: '#ffffff',
              backgroundColor: 'rgb(90, 91, 99)',
              padding: 2,
              marginLeft: -4,
              marginRight: -4,
              marginTop: -4,
              marginBottom: 3,
              textAlign: 'center',
              fontWeight: 600,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              {successMessage && (
                <Alert severity="success">{successMessage}</Alert>
              )}

              <TextField
                fullWidth
                type="email"
                label="Email"
                value={email}
                onChange={handleEmailChange}
                error={!!errors.email}
                helperText={errors.email}
                placeholder="seu.email@exemplo.com"
                variant="outlined"
                InputLabelProps={{
                  sx: {
                    color: '#666666',
                    '&.Mui-focused': {
                      color: '#333333',
                    },
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#999999',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                type="password"
                label="Senha"
                value={password}
                onChange={handlePasswordChange}
                error={!!errors.password}
                helperText={errors.password || `${password.length}/8 dígitos`}
                placeholder="12345678"
                variant="outlined"
                InputLabelProps={{
                  sx: {
                    color: '#666666',
                    '&.Mui-focused': {
                      color: '#333333',
                    },
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#999999',
                    },
                  },
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#db052c',
                  color: '#ffffff',
                  padding: '10px 0',
                  fontWeight: 600,
                  fontSize: '1rem',
                  marginTop: 1,
                  '&:hover': {
                    backgroundColor: '#c70424',
                  },
                  '&:active': {
                    backgroundColor: '#b70320',
                  },
                }}
              >
                Entrar
              </Button>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 2,
                  paddingTop: 2,
                  borderTop: '1px solid #e0e0e0',
                }}
              >
                <Link
                  href="#"
                  sx={{
                    fontSize: '0.875rem',
                    color: '#666666',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#db052c',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Esqueci minha senha
                </Link>
                <Link
                  href="#"
                  sx={{
                    fontSize: '0.875rem',
                    color: '#666666',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#db052c',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Criar usuário
                </Link>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
