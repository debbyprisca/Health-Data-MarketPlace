import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';

// Mock blockchain services
const mockTransactions = [
  {
    id: 'tx1',
    from: '0x1234567890abcdef1234567890abcdef12345678',
    to: '0xabcdef1234567890abcdef1234567890abcdef12',
    amount: '0.05',
    currency: 'ETH',
    timestamp: new Date('2023-09-15').getTime(),
    status: 'confirmed',
    datasetId: 'dataset1',
    hash: '0x3a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b'
  },
  {
    id: 'tx2',
    from: '0xabcdef1234567890abcdef1234567890abcdef12',
    to: '0x1234567890abcdef1234567890abcdef12345678',
    amount: '0.03',
    currency: 'ETH',
    timestamp: new Date('2023-10-05').getTime(),
    status: 'confirmed',
    datasetId: 'dataset2',
    hash: '0x4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5'
  }
];

const BlockchainContext = createContext();

export function useBlockchain() {
  return useContext(BlockchainContext);
}

export function BlockchainProvider({ children }) {
  const { currentUser } = useAuth();
  const [walletBalance, setWalletBalance] = useState({
    eth: '0.00',
    usd: '0.00'
  });
  const [transactions, setTransactions] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [ethPrice, setEthPrice] = useState(3000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser?.walletAddress) {
      // Simulate connecting to blockchain
      setConnectionStatus('connecting');
      setTimeout(() => {
        setConnectionStatus('connected');
        // Set mock balance based on user role
        if (currentUser.role === 'patient') {
          setWalletBalance({
            eth: '0.15',
            usd: (0.15 * ethPrice).toFixed(2)
          });
        } else {
          setWalletBalance({
            eth: '1.25',
            usd: (1.25 * ethPrice).toFixed(2)
          });
        }
        
        // Filter transactions for current user
        const userTransactions = mockTransactions.filter(
          tx => tx.from === currentUser.walletAddress || tx.to === currentUser.walletAddress
        );
        setTransactions(userTransactions);
        
        setLoading(false);
      }, 1500);
    } else {
      setConnectionStatus('disconnected');
      setLoading(false);
    }
  }, [currentUser, ethPrice]);

  // Mock function to simulate purchasing a dataset
  const purchaseDataset = async (datasetId, price, sellerAddress) => {
    if (!currentUser?.walletAddress) {
      setError('Wallet not connected');
      return { success: false, error: 'Wallet not connected' };
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulate transaction processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new transaction record
      const newTransaction = {
        id: `tx${Math.random().toString(16).substring(2, 10)}`,
        from: currentUser.walletAddress,
        to: sellerAddress,
        amount: price.toString(),
        currency: 'ETH',
        timestamp: Date.now(),
        status: 'confirmed',
        datasetId,
        hash: `0x${Math.random().toString(16).substring(2, 64)}`
      };
      
      // Update transactions list
      setTransactions(prev => [newTransaction, ...prev]);
      
      // Update wallet balance
      const newBalance = parseFloat(walletBalance.eth) - parseFloat(price);
      setWalletBalance({
        eth: newBalance.toFixed(2),
        usd: (newBalance * ethPrice).toFixed(2)
      });
      
      setLoading(false);
      return { 
        success: true, 
        transaction: newTransaction,
        message: 'Transaction completed successfully'
      };
    } catch (err) {
      setError('Transaction failed');
      setLoading(false);
      return { success: false, error: 'Transaction failed' };
    }
  };

  // Connect wallet function
  const connectWallet = async () => {
    if (!currentUser) {
      setError('User not logged in');
      return false;
    }
    
    setConnectionStatus('connecting');
    
    try {
      // Simulate connecting to wallet
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would connect to MetaMask or another wallet here
      setConnectionStatus('connected');
      return true;
    } catch (err) {
      setError('Failed to connect wallet');
      setConnectionStatus('disconnected');
      return false;
    }
  };

  // Verify data integrity using blockchain
  const verifyDataIntegrity = async (dataHash) => {
    setLoading(true);
    
    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock verification (randomly return true or false for demo)
      const isVerified = Math.random() > 0.2;
      
      setLoading(false);
      return { 
        verified: isVerified,
        timestamp: isVerified ? new Date().toISOString() : null,
        message: isVerified ? 'Data integrity verified' : 'Data integrity could not be verified'
      };
    } catch (err) {
      setLoading(false);
      return { 
        verified: false,
        error: 'Verification failed',
        message: 'An error occurred during verification'
      };
    }
  };

  const value = {
    walletBalance,
    transactions,
    connectionStatus,
    loading,
    error,
    purchaseDataset,
    connectWallet,
    verifyDataIntegrity,
    ethPrice
  };

  return <BlockchainContext.Provider value={value}>{children}</BlockchainContext.Provider>;
}

BlockchainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};