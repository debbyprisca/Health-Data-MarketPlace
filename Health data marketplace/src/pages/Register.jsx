import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaExclamationCircle, FaUserMd, FaHospitalUser } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const RegisterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 70px);
  padding: 2rem 1rem;
`;

const RegisterCard = styled(motion.div)`
  width: 100%;
  max-width: 580px;
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  box-shadow: ${props => props.theme.shadows.lg};
  overflow: hidden;
`;

const RegisterHeader = styled.div`
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
`;

const RegisterTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const RegisterSubtitle = styled.p`
  opacity: 0.9;
  font-size: 0.875rem;
`;

const RegisterForm = styled.form`
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
  margin-top: 1rem;

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.textTertiary};
    cursor: not-allowed;
  }
`;

const RegisterFooter = styled.div`
  padding: 1.5rem 2rem;
  text-align: center;
  border-top: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textSecondary};
`;

const LoginLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primaryHover};
  }
`;

const UserTypeSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const UserTypeOption = styled.div`
  flex: 1;
  border: 2px solid ${props => 
    props.selected ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: var(--border-radius-md);
  padding: 1.25rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => 
    props.selected ? props.theme.colors.primaryLight : 'transparent'};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const UserTypeIcon = styled.div`
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
  color: ${props => props.selected ? props.theme.colors.primary : props.theme.colors.textSecondary};
`;

const UserTypeTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: ${props => props.selected ? props.theme.colors.primary : props.theme.colors.text};
`;

const UserTypeDescription = styled.p`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const TermsCheckbox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const { register, error } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUserTypeSelect = (role) => {
    setFormData({
      ...formData,
      role,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (!formData.role) newErrors.role = 'Please select a user type';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const success = register(formData);
      
      if (success) {
        toast.success('Registration successful!');
        navigate('/dashboard');
      } else {
        toast.error(error || 'Registration failed');
      }
    } catch (err) {
      toast.error('An error occurred during registration');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <RegisterHeader>
          <RegisterTitle>Create Your Account</RegisterTitle>
          <RegisterSubtitle>Join the Health Data Revolution</RegisterSubtitle>
        </RegisterHeader>
        
        <RegisterForm onSubmit={handleSubmit}>
          <UserTypeSelector>
            <UserTypeOption 
              selected={formData.role === 'patient'}
              onClick={() => handleUserTypeSelect('patient')}
            >
              <UserTypeIcon selected={formData.role === 'patient'}>
                <FaHospitalUser />
              </UserTypeIcon>
              <UserTypeTitle selected={formData.role === 'patient'}>Patient</UserTypeTitle>
              <UserTypeDescription>
                Share and monetize your health data
              </UserTypeDescription>
            </UserTypeOption>
            
            <UserTypeOption 
              selected={formData.role === 'researcher'}
              onClick={() => handleUserTypeSelect('researcher')}
            >
              <UserTypeIcon selected={formData.role === 'researcher'}>
                <FaUserMd />
              </UserTypeIcon>
              <UserTypeTitle selected={formData.role === 'researcher'}>Researcher</UserTypeTitle>
              <UserTypeDescription>
                Access valuable health datasets
              </UserTypeDescription>
            </UserTypeOption>
          </UserTypeSelector>
          
          {errors.role && (
            <ErrorMessage>
              <FaExclamationCircle /> {errors.role}
            </ErrorMessage>
          )}
          
          <FormGroup>
            <Label htmlFor="name">Full Name</Label>
            <InputWrapper>
              <InputIcon>
                <FaUser />
              </InputIcon>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </InputWrapper>
            {errors.name && (
              <ErrorMessage>
                <FaExclamationCircle /> {errors.name}
              </ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <InputWrapper>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </InputWrapper>
            {errors.email && (
              <ErrorMessage>
                <FaExclamationCircle /> {errors.email}
              </ErrorMessage>
            )}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
              />
            </InputWrapper>
            {errors.password && (
              <ErrorMessage>
                <FaExclamationCircle /> {errors.password}
              </ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <InputWrapper>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </InputWrapper>
            {errors.confirmPassword && (
              <ErrorMessage>
                <FaExclamationCircle /> {errors.confirmPassword}
              </ErrorMessage>
            )}
          </FormGroup>
          
          <TermsCheckbox>
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <label htmlFor="agreeToTerms">
              I agree to the <Link to="#" style={{ color: '#0A6EBD' }}>Terms of Service</Link> and <Link to="#" style={{ color: '#0A6EBD' }}>Privacy Policy</Link>, including the collection and processing of my health data according to the guidelines.
            </label>
          </TermsCheckbox>
          {errors.agreeToTerms && (
            <ErrorMessage>
              <FaExclamationCircle /> {errors.agreeToTerms}
            </ErrorMessage>
          )}
          
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </SubmitButton>
        </RegisterForm>
        
        <RegisterFooter>
          Already have an account? <LoginLink to="/login">Sign in</LoginLink>
        </RegisterFooter>
      </RegisterCard>
    </RegisterContainer>
  );
}

export default Register;