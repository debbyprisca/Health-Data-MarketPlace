import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaDatabase, FaExchangeAlt, FaWallet, FaChartLine, FaFileUpload, FaSearch } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useBlockchain } from '../contexts/BlockchainContext';
import PatientDashboard from '../components/dashboard/PatientDashboard';
import ResearcherDashboard from '../components/dashboard/ResearcherDashboard';

const DashboardContainer = styled.div`
  padding: 2rem 1.5rem;
`;

const DashboardContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
  margin-bottom: 2.5rem;
`;

const WelcomeMessage = styled(motion.h1)`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const DashboardDescription = styled(motion.p)`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
`;

const QuickStats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.card};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.primaryLight};
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const QuickActions = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ActionCard = styled(Link)`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.card};
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: ${props => props.theme.colors.text};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const ActionIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  font-size: 1.75rem;
`;

const ActionContent = styled.div`
  flex: 1;
`;

const ActionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ActionDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

function Dashboard() {
  const { currentUser, isPatient, isResearcher } = useAuth();
  const { walletBalance, transactions, connectionStatus } = useBlockchain();
  const [stats, setStats] = useState({
    datasets: 0,
    transactions: 0,
    earnings: 0,
    purchased: 0
  });

  useEffect(() => {
    // Set stats based on user role
    if (isPatient) {
      setStats({
        datasets: 5,
        transactions: transactions.length,
        earnings: parseFloat(walletBalance.eth) || 0,
        purchased: 0
      });
    } else if (isResearcher) {
      setStats({
        datasets: 0,
        transactions: transactions.length,
        balance: parseFloat(walletBalance.eth) || 0,
        purchased: 12
      });
    }
  }, [isPatient, isResearcher, transactions.length, walletBalance.eth]);

  return (
    <DashboardContainer>
      <DashboardContent>
        <DashboardHeader>
          <WelcomeMessage
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome, {currentUser?.name}
          </WelcomeMessage>
          <DashboardDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {isPatient 
              ? 'Manage your health data and track your transactions.' 
              : 'Discover and purchase health datasets for your research.'}
          </DashboardDescription>
          
          <QuickStats
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatCard
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatIcon>
                <FaDatabase />
              </StatIcon>
              <StatContent>
                <StatValue>{isPatient ? stats.datasets : stats.purchased}</StatValue>
                <StatLabel>{isPatient ? 'Your Datasets' : 'Purchased Datasets'}</StatLabel>
              </StatContent>
            </StatCard>
            
            <StatCard
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatIcon>
                <FaExchangeAlt />
              </StatIcon>
              <StatContent>
                <StatValue>{stats.transactions}</StatValue>
                <StatLabel>Transactions</StatLabel>
              </StatContent>
            </StatCard>
            
            <StatCard
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatIcon>
                <FaWallet />
              </StatIcon>
              <StatContent>
                <StatValue>{walletBalance.eth} ETH</StatValue>
                <StatLabel>Wallet Balance</StatLabel>
              </StatContent>
            </StatCard>
            
            <StatCard
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatIcon>
                <FaChartLine />
              </StatIcon>
              <StatContent>
                <StatValue>${walletBalance.usd}</StatValue>
                <StatLabel>USD Value</StatLabel>
              </StatContent>
            </StatCard>
          </QuickStats>
          
          <QuickActions
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {isPatient ? (
              <>
                <ActionCard to="/upload">
                  <ActionIcon>
                    <FaFileUpload />
                  </ActionIcon>
                  <ActionContent>
                    <ActionTitle>Upload Health Data</ActionTitle>
                    <ActionDescription>
                      Securely upload and monetize your anonymized health data
                    </ActionDescription>
                  </ActionContent>
                </ActionCard>
                
                <ActionCard to="/profile">
                  <ActionIcon>
                    <FaWallet />
                  </ActionIcon>
                  <ActionContent>
                    <ActionTitle>Manage Wallet</ActionTitle>
                    <ActionDescription>
                      Connect your wallet and track your earnings
                    </ActionDescription>
                  </ActionContent>
                </ActionCard>
              </>
            ) : (
              <>
                <ActionCard to="/marketplace">
                  <ActionIcon>
                    <FaSearch />
                  </ActionIcon>
                  <ActionContent>
                    <ActionTitle>Explore Datasets</ActionTitle>
                    <ActionDescription>
                      Browse available health datasets for your research
                    </ActionDescription>
                  </ActionContent>
                </ActionCard>
                
                <ActionCard to="/profile">
                  <ActionIcon>
                    <FaWallet />
                  </ActionIcon>
                  <ActionContent>
                    <ActionTitle>Manage Wallet</ActionTitle>
                    <ActionDescription>
                      {connectionStatus === 'connected' 
                        ? 'View your wallet balance and transaction history' 
                        : 'Connect your wallet to purchase datasets'}
                    </ActionDescription>
                  </ActionContent>
                </ActionCard>
              </>
            )}
          </QuickActions>
        </DashboardHeader>
        
        {isPatient ? (
          <PatientDashboard />
        ) : (
          <ResearcherDashboard />
        )}
      </DashboardContent>
    </DashboardContainer>
  );
}

export default Dashboard;