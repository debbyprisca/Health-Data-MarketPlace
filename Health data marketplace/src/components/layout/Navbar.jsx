import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useBlockchain } from '../../contexts/BlockchainContext';
import { FaSun, FaMoon, FaUserCircle, FaBars, FaTimes, FaWallet } from 'react-icons/fa';

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0.75rem 1.5rem;
  background: ${props => props.scrolled ? props.theme.colors.surface : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.scrolled ? props.theme.shadows.sm : 'none'};
  transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
`;

const NavbarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.2s ease;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    transition: width 0.3s ease;
  }

  &:hover, &.active {
    color: ${props => props.theme.colors.primary};
    &:after {
      width: 100%;
    }
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.surfaceHover};
  }
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius-md);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.surfaceHover};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${props => props.theme.colors.background};
  z-index: 1001;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MobileMenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const MobileNavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  font-size: 1.25rem;
  padding: 0.5rem 0;
`;

const WalletButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => 
    props.connected ? props.theme.colors.success : props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => 
      props.connected ? props.theme.colors.successHover : props.theme.colors.primaryHover};
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-top: 1.5rem;
  }
`;

function Navbar({ toggleTheme, theme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { connectionStatus, connectWallet } = useBlockchain();
  const location = useLocation();
  const navigate = useNavigate();

  // Track scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleWalletConnect = async () => {
    if (connectionStatus !== 'connected') {
      await connectWallet();
    }
  };

  return (
    <>
      <NavbarContainer
        scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavbarContent>
          <Logo to="/">
            Health<span>Data</span>Nexus
          </Logo>

          <NavLinks>
            <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </NavLink>
            <NavLink 
              to="/marketplace" 
              className={location.pathname === '/marketplace' ? 'active' : ''}
            >
              Marketplace
            </NavLink>
            {currentUser && (
              <NavLink 
                to="/dashboard" 
                className={location.pathname === '/dashboard' ? 'active' : ''}
              >
                Dashboard
              </NavLink>
            )}
          </NavLinks>

          <NavActions>
            <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
            </ThemeToggle>

            {currentUser ? (
              <>
                <WalletButton 
                  connected={connectionStatus === 'connected'}
                  onClick={handleWalletConnect}
                >
                  <FaWallet />
                  {connectionStatus === 'connected' ? 'Connected' : 'Connect Wallet'}
                </WalletButton>
                <ProfileButton onClick={() => navigate('/profile')}>
                  <FaUserCircle size={20} />
                  {currentUser.name}
                </ProfileButton>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">
                Sign In
              </Link>
            )}

            <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
              <FaBars />
            </MobileMenuButton>
          </NavActions>
        </NavbarContent>
      </NavbarContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <MobileMenuHeader>
              <Logo to="/">
                Health<span>Data</span>Nexus
              </Logo>
              <MobileMenuButton onClick={() => setMobileMenuOpen(false)}>
                <FaTimes />
              </MobileMenuButton>
            </MobileMenuHeader>

            <MobileMenuLinks>
              <MobileNavLink to="/">Home</MobileNavLink>
              <MobileNavLink to="/marketplace">Marketplace</MobileNavLink>
              {currentUser && (
                <MobileNavLink to="/dashboard">Dashboard</MobileNavLink>
              )}
              {currentUser ? (
                <>
                  <MobileNavLink to="/profile">Profile</MobileNavLink>
                  <MobileNavLink as="button" onClick={handleLogout}>
                    Logout
                  </MobileNavLink>
                </>
              ) : (
                <MobileNavLink to="/login">Sign In</MobileNavLink>
              )}
            </MobileMenuLinks>

            {currentUser && (
              <WalletButton 
                connected={connectionStatus === 'connected'}
                onClick={handleWalletConnect}
              >
                <FaWallet />
                {connectionStatus === 'connected' ? 'Wallet Connected' : 'Connect Wallet'}
              </WalletButton>
            )}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}

Navbar.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
};

export default Navbar;