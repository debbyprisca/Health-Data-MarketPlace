import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaExclamationCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 70px);
  padding: 2rem 1rem;
`;

const LoginCard = styled(motion.div)`
  width: 100%;
  max-width: 480px;
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  box-shadow: ${props => props.theme.shadows.lg};
  overflow: hidden;
`;

const LoginHeader = styled.div`
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
`;

const LoginTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const LoginSubtitle = styled.p`
  opacity: 0.9;
  font-size: 0.875rem;
`;

const LoginForm = styled.form`
  padding: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${props => props.theme.colors.textSecondary};
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: var(--border-radius-md);
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLight};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textTertiary};
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 0.5rem;

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.textTertiary};
    cursor: not-allowed;
  }
`;

const LoginFooter = styled.div`
  padding: 1.5rem 2rem;
  text-align: center;
  border-top: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textSecondary};
`;

const RegisterLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primaryHover};
  }
`;

const LoginOptions = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ForgotPassword = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primaryHover};
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = login(email, password);
      
      if (success) {
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error(error || 'Invalid email or password');
      }
    } catch (err) {
      toast.error('An error occurred during login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // For demo purposes, prefill with test accounts
  const fillDemoAccount = (userType) => {
    if (userType === 'patient') {
      setEmail('patient@example.com');
      setPassword('password123');
    } else if (userType === 'researcher') {
      setEmail('researcher@example.com');
      setPassword('password123');
    }
  };

  return (
    <LoginContainer>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LoginHeader>
          <LoginTitle>Welcome Back</LoginTitle>
          <LoginSubtitle>Sign in to access your account</LoginSubtitle>
        </LoginHeader>
        
        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <InputWrapper>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </InputWrapper>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <InputWrapper>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </InputWrapper>
          </FormGroup>
          
          {error && (
            <ErrorMessage>
              <FaExclamationCircle /> {error}
            </ErrorMessage>
          )}
          
          <LoginOptions>
            <RememberMe>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember">Remember me</label>
            </RememberMe>
            <ForgotPassword to="#">Forgot password?</ForgotPassword>
          </LoginOptions>
          
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </SubmitButton>
          
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
              For demo purposes:
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => fillDemoAccount('patient')}
                style={{
                  padding: '0.5rem',
                  fontSize: '0.75rem',
                  background: '#f0f0f0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Use Patient Account
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('researcher')}
                style={{
                  padding: '0.5rem',
                  fontSize: '0.75rem',
                  background: '#f0f0f0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Use Researcher Account
              </button>
            </div>
          </div>
        </LoginForm>
        
        <LoginFooter>
          Don't have an account? <RegisterLink to="/register">Register now</RegisterLink>
        </LoginFooter>
      </LoginCard>
    </LoginContainer>
  );
}

export default Login;