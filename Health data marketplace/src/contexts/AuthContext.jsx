import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Mock data for authentication
const usersMock = [
  { 
    id: '1', 
    email: 'patient@example.com', 
    password: 'password123', 
    role: 'patient',
    name: 'Jane Smith',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    consentPreferences: {
      allowAnonymizedData: true,
      allowContactForStudies: false,
      allowDataAnalytics: true
    }
  },
  { 
    id: '2', 
    email: 'researcher@example.com', 
    password: 'password123', 
    role: 'researcher',
    name: 'Dr. John Doe',
    institution: 'Medical Research Institute',
    walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    verificationStatus: 'verified'
  }
];

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    setError(null);
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return false;
    }
    
    // Find user
    const user = usersMock.find(
      (user) => user.email === email && user.password === password
    );
    
    if (user) {
      // Create a cleaned user object without sensitive data like password
      const cleanedUser = { ...user };
      delete cleanedUser.password;
      
      // Set user in state and localStorage
      setCurrentUser(cleanedUser);
      localStorage.setItem('currentUser', JSON.stringify(cleanedUser));
      return true;
    } else {
      setError('Invalid email or password');
      return false;
    }
  };

  const register = (userData) => {
    setError(null);
    
    // Basic validation
    if (!userData.email || !userData.password || !userData.role) {
      setError('Please fill in all required fields');
      return false;
    }
    
    // Check if user already exists
    const userExists = usersMock.some((user) => user.email === userData.email);
    
    if (userExists) {
      setError('Email already in use');
      return false;
    }
    
    // In a real app, we would save this user to a database
    // For our demo, we'll simulate a successful registration
    
    // Create a new user object
    const newUser = {
      id: String(usersMock.length + 1),
      ...userData,
      walletAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      consentPreferences: {
        allowAnonymizedData: true,
        allowContactForStudies: false,
        allowDataAnalytics: true
      }
    };
    
    // Create a cleaned user object without sensitive data
    const cleanedUser = { ...newUser };
    delete cleanedUser.password;
    
    // Set user in state and localStorage
    setCurrentUser(cleanedUser);
    localStorage.setItem('currentUser', JSON.stringify(cleanedUser));
    
    // In a real app, we would add the new user to our database
    // usersMock.push(newUser);
    
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (updates) => {
    if (!currentUser) return false;
    
    // Update current user with new data
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return true;
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isPatient: currentUser?.role === 'patient',
    isResearcher: currentUser?.role === 'researcher'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};