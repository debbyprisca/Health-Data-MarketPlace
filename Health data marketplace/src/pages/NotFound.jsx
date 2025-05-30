import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHome, FaSearch, FaExclamationTriangle } from 'react-icons/fa';

const NotFoundContainer = styled.div`
  padding: 4rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 300px);
`;

const ErrorIcon = styled(motion.div)`
  font-size: 4rem;
  color: ${props => props.theme.colors.warning};
  margin-bottom: 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &.primary {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    
    &:hover {
      background-color: ${props => props.theme.colors.primaryHover};
    }
  }
  
  &.secondary {
    background-color: transparent;
    color: ${props => props.theme.colors.text};
    border: 1px solid ${props => props.theme.colors.border};
    
    &:hover {
      background-color: ${props => props.theme.colors.surfaceHover};
    }
  }
`;

function NotFound() {
  return (
    <NotFoundContainer>
      <ErrorIcon
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      >
        <FaExclamationTriangle />
      </ErrorIcon>
      
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        404 - Page Not Found
      </Title>
      
      <Subtitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        The page you are looking for doesn't exist or has been moved.
        Please check the URL or navigate back to the homepage.
      </Subtitle>
      
      <ButtonsContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button to="/" className="primary">
          <FaHome /> Go to Homepage
        </Button>
        <Button to="/marketplace" className="secondary">
          <FaSearch /> Browse Marketplace
        </Button>
      </ButtonsContainer>
    </NotFoundContainer>
  );
}

export default NotFound;