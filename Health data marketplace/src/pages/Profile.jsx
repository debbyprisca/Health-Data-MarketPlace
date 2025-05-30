import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaWallet, FaExchangeAlt, FaShieldAlt, FaUserCircle, 
  FaKey, FaLock, FaInfoCircle, FaCheckCircle, FaExclamationTriangle
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useBlockchain } from '../contexts/BlockchainContext';
import { toast } from 'react-toastify';

const ProfileContainer = styled.div`
  padding: 2rem 1.5rem;
`;

const ProfileContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 2.5rem;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProfileTabs = styled(motion.div)`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 2rem;
  overflow-x: auto;
  
  @media (max-width: 576px) {
    gap: 0.5rem;
  }
`;

const TabButton = styled.button`
  padding: 1rem 2rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => 
    props.active ? props.theme.colors.primary : 'transparent'
  };
  color: ${props => 
    props.active ? props.theme.colors.primary : props.theme.colors.textSecondary
  };
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: 576px) {
    padding: 1rem 1rem;
  }
`;

const ProfileSection = styled(motion.div)`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const WalletCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.card};
  margin-bottom: 2rem;
`;

const WalletHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const WalletInfo = styled.div``;

const WalletLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.25rem;
`;

const WalletAddress = styled.div`
  font-size: 1.125rem;
  font-weight: 500;
  font-family: monospace;
`;

const WalletStatus = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: ${props => 
    props.connected ? props.theme.colors.successLight : props.theme.colors.warningLight
  };
  color: ${props => 
    props.connected ? props.theme.colors.success : props.theme.colors.warning
  };
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  gap: 0.5rem;
`;

const WalletBalances = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const BalanceCard = styled.div`
  background: ${props => props.theme.glass.background};
  backdrop-filter: ${props => props.theme.glass.backdropFilter};
  border: ${props => props.theme.glass.border};
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  box-shadow: ${props => props.theme.glass.boxShadow};
`;

const BalanceAmount = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const BalanceLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileForm = styled.form`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.card};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: var(--border-radius-md);
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLight};
  }
`;

const SubmitButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
`;

const ConsentCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.card};
`;

const ConsentOption = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ConsentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ConsentTitle = styled.div`
  font-weight: 500;
`;

const ConsentToggle = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => 
      props.checked ? props.theme.colors.primary : props.theme.colors.textTertiary
    };
    transition: 0.2s;
    border-radius: 24px;
    
    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.2s;
      border-radius: 50%;
      transform: ${props => props.checked ? 'translateX(24px)' : 'translateX(0)'};
    }
  }
`;

const ConsentDescription = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TransactionCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.card};
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const TransactionDetails = styled.div``;

const TransactionId = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textTertiary};
  margin-bottom: 0.5rem;
`;

const TransactionName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const TransactionDate = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const TransactionAmount = styled.div`
  font-weight: 600;
  color: ${props => 
    props.type === 'in' ? props.theme.colors.success : props.theme.colors.error
  };
  
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const TransactionStatus = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => 
    props.status === 'confirmed' ? props.theme.colors.successLight :
    props.status === 'pending' ? props.theme.colors.warningLight :
    props.theme.colors.errorLight
  };
  color: ${props => 
    props.status === 'confirmed' ? props.theme.colors.success :
    props.status === 'pending' ? props.theme.colors.warning :
    props.theme.colors.error
  };
  
  @media (max-width: 768px) {
    display: inline-flex;
    margin-top: 1rem;
  }
`;

const TransactionParty = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const ConnectionButton = styled.button`
  background-color: ${props => 
    props.connected ? props.theme.colors.success : props.theme.colors.primary
  };
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  cursor: ${props => props.connected ? 'default' : 'pointer'};
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => 
      props.connected ? props.theme.colors.success : props.theme.colors.primaryHover
    };
  }
`;

const SecurityCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.card};
  margin-bottom: 2rem;
`;

const SecurityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SecurityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => 
    props.status === 'good' ? props.theme.colors.successLight :
    props.status === 'warning' ? props.theme.colors.warningLight :
    props.theme.colors.errorLight
  };
  color: ${props => 
    props.status === 'good' ? props.theme.colors.success :
    props.status === 'warning' ? props.theme.colors.warning :
    props.theme.colors.error
  };
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const SecurityContent = styled.div`
  flex: 1;
`;

const SecurityTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const SecurityDescription = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const NoTransactionsMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  color: ${props => props.theme.colors.textSecondary};
  box-shadow: ${props => props.theme.shadows.card};
`;

function Profile() {
  const [activeTab, setActiveTab] = useState('wallet');
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [consentOptions, setConsentOptions] = useState({
    allowAnonymizedData: true,
    allowContactForStudies: false,
    allowDataAnalytics: true
  });
  
  const { currentUser, updateProfile } = useAuth();
  const { connectionStatus, connectWallet, transactions, walletBalance } = useBlockchain();
  
  // Initialize form with current user data
  useState(() => {
    if (currentUser) {
      setProfileForm(prev => ({
        ...prev,
        name: currentUser.name || '',
        email: currentUser.email || '',
      }));
      
      if (currentUser.consentPreferences) {
        setConsentOptions(currentUser.consentPreferences);
      }
    }
  }, [currentUser]);
  
  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!profileForm.name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    if (!profileForm.email.trim() || !/\S+@\S+\.\S+/.test(profileForm.email)) {
      toast.error('Valid email is required');
      return;
    }
    
    // If changing password, validate it
    if (profileForm.newPassword) {
      if (!profileForm.currentPassword) {
        toast.error('Current password is required');
        return;
      }
      
      if (profileForm.newPassword.length < 6) {
        toast.error('New password must be at least 6 characters');
        return;
      }
      
      if (profileForm.newPassword !== profileForm.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
    }
    
    // Update profile
    const success = updateProfile({
      name: profileForm.name,
      email: profileForm.email
    });
    
    if (success) {
      toast.success('Profile updated successfully');
      
      // Clear password fields
      setProfileForm(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } else {
      toast.error('Failed to update profile');
    }
  };
  
  // Handle consent toggle
  const handleConsentToggle = (option) => {
    setConsentOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
    
    // Update preferences in user profile
    updateProfile({
      consentPreferences: {
        ...consentOptions,
        [option]: !consentOptions[option]
      }
    });
    
    toast.success('Consent preferences updated');
  };
  
  // Format date from timestamp
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Truncate wallet address
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Handle wallet connection
  const handleConnectWallet = async () => {
    if (connectionStatus !== 'connected') {
      const success = await connectWallet();
      
      if (success) {
        toast.success('Wallet connected successfully');
      } else {
        toast.error('Failed to connect wallet');
      }
    }
  };

  return (
    <ProfileContainer>
      <ProfileContent>
        <PageHeader>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Profile
          </Title>
          
          <ProfileTabs
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TabButton 
              active={activeTab === 'wallet'} 
              onClick={() => setActiveTab('wallet')}
            >
              <FaWallet style={{ marginRight: '0.5rem' }} /> Wallet
            </TabButton>
            <TabButton 
              active={activeTab === 'transactions'} 
              onClick={() => setActiveTab('transactions')}
            >
              <FaExchangeAlt style={{ marginRight: '0.5rem' }} /> Transactions
            </TabButton>
            <TabButton 
              active={activeTab === 'consent'} 
              onClick={() => setActiveTab('consent')}
            >
              <FaShieldAlt style={{ marginRight: '0.5rem' }} /> Data Consent
            </TabButton>
            <TabButton 
              active={activeTab === 'account'} 
              onClick={() => setActiveTab('account')}
            >
              <FaUserCircle style={{ marginRight: '0.5rem' }} /> Account
            </TabButton>
          </ProfileTabs>
        </PageHeader>
        
        {activeTab === 'wallet' && (
          <ProfileSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionTitle>
              <FaWallet /> Blockchain Wallet
            </SectionTitle>
            
            <WalletCard>
              <WalletHeader>
                <WalletInfo>
                  <WalletLabel>Your wallet address</WalletLabel>
                  <WalletAddress>{truncateAddress(currentUser?.walletAddress)}</WalletAddress>
                </WalletInfo>
                
                <WalletStatus connected={connectionStatus === 'connected'}>
                  {connectionStatus === 'connected' ? (
                    <>
                      <FaCheckCircle /> Connected
                    </>
                  ) : (
                    <>
                      <FaExclamationTriangle /> Not Connected
                    </>
                  )}
                </WalletStatus>
              </WalletHeader>
              
              {connectionStatus === 'connected' ? (
                <WalletBalances>
                  <BalanceCard>
                    <BalanceAmount>{walletBalance.eth} ETH</BalanceAmount>
                    <BalanceLabel>Current Balance</BalanceLabel>
                  </BalanceCard>
                  
                  <BalanceCard>
                    <BalanceAmount>${walletBalance.usd}</BalanceAmount>
                    <BalanceLabel>USD Value</BalanceLabel>
                  </BalanceCard>
                </WalletBalances>
              ) : (
                <ConnectionButton 
                  connected={connectionStatus === 'connected'}
                  onClick={handleConnectWallet}
                >
                  <FaWallet /> Connect Wallet
                </ConnectionButton>
              )}
            </WalletCard>
            
            <SectionTitle>
              <FaKey /> Wallet Security
            </SectionTitle>
            
            <SecurityCard>
              <SecurityItem>
                <SecurityIcon status="good">
                  <FaCheckCircle />
                </SecurityIcon>
                <SecurityContent>
                  <SecurityTitle>Blockchain Verification</SecurityTitle>
                  <SecurityDescription>
                    Your wallet is verified on the blockchain and all transactions are securely recorded.
                  </SecurityDescription>
                </SecurityContent>
              </SecurityItem>
              
              <SecurityItem>
                <SecurityIcon status="warning">
                  <FaExclamationTriangle />
                </SecurityIcon>
                <SecurityContent>
                  <SecurityTitle>Two-Factor Authentication</SecurityTitle>
                  <SecurityDescription>
                    Add an extra layer of security by enabling two-factor authentication for wallet operations.
                  </SecurityDescription>
                </SecurityContent>
              </SecurityItem>
              
              <SecurityItem>
                <SecurityIcon status="good">
                  <FaLock />
                </SecurityIcon>
                <SecurityContent>
                  <SecurityTitle>Transaction Signing</SecurityTitle>
                  <SecurityDescription>
                    All your transactions are securely signed with your private key and verified on the blockchain.
                  </SecurityDescription>
                </SecurityContent>
              </SecurityItem>
            </SecurityCard>
          </ProfileSection>
        )}
        
        {activeTab === 'transactions' && (
          <ProfileSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionTitle>
              <FaExchangeAlt /> Transaction History
            </SectionTitle>
            
            {transactions.length > 0 ? (
              <TransactionList>
                {transactions.map((transaction) => (
                  <TransactionCard key={transaction.id}>
                    <TransactionDetails>
                      <TransactionId>ID: {transaction.hash.substring(0, 10)}...</TransactionId>
                      <TransactionName>
                        {currentUser?.role === 'patient' ? 'Dataset Purchase' : 'Dataset Sale'}
                      </TransactionName>
                      <TransactionDate>{formatDate(transaction.timestamp)}</TransactionDate>
                    </TransactionDetails>
                    
                    <TransactionAmount type={transaction.to === currentUser?.walletAddress ? 'in' : 'out'}>
                      {transaction.to === currentUser?.walletAddress ? '+' : '-'}{transaction.amount} ETH
                    </TransactionAmount>
                    
                    <TransactionStatus status={transaction.status}>
                      {transaction.status === 'confirmed' ? (
                        <>
                          <FaCheckCircle style={{ marginRight: '0.25rem' }} /> {transaction.status}
                        </>
                      ) : (
                        transaction.status
                      )}
                    </TransactionStatus>
                    
                    <TransactionParty>
                      {transaction.to === currentUser?.walletAddress ? 
                        `From: ${transaction.from.substring(0, 6)}...` : 
                        `To: ${transaction.to.substring(0, 6)}...`
                      }
                    </TransactionParty>
                  </TransactionCard>
                ))}
              </TransactionList>
            ) : (
              <NoTransactionsMessage>
                <FaInfoCircle style={{ fontSize: '2rem', marginBottom: '1rem' }} />
                <h3>No transactions yet</h3>
                <p>Your blockchain transactions will appear here once you buy or sell datasets.</p>
              </NoTransactionsMessage>
            )}
          </ProfileSection>
        )}
        
        {activeTab === 'consent' && (
          <ProfileSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionTitle>
              <FaShieldAlt /> Data Consent Preferences
            </SectionTitle>
            
            <ConsentCard>
              <ConsentOption>
                <ConsentHeader>
                  <ConsentTitle>Allow Anonymized Data Usage</ConsentTitle>
                  <ConsentToggle checked={consentOptions.allowAnonymizedData}>
                    <input 
                      type="checkbox" 
                      checked={consentOptions.allowAnonymizedData}
                      onChange={() => handleConsentToggle('allowAnonymizedData')}
                    />
                    <span></span>
                  </ConsentToggle>
                </ConsentHeader>
                <ConsentDescription>
                  Your health data will be anonymized before being made available to researchers.
                  All direct identifiers are removed, and personal details are obscured.
                </ConsentDescription>
              </ConsentOption>
              
              <ConsentOption>
                <ConsentHeader>
                  <ConsentTitle>Contact for Research Studies</ConsentTitle>
                  <ConsentToggle checked={consentOptions.allowContactForStudies}>
                    <input 
                      type="checkbox" 
                      checked={consentOptions.allowContactForStudies}
                      onChange={() => handleConsentToggle('allowContactForStudies')}
                    />
                    <span></span>
                  </ConsentToggle>
                </ConsentHeader>
                <ConsentDescription>
                  Researchers may contact you through our secure messaging system
                  to invite you to participate in relevant clinical studies.
                </ConsentDescription>
              </ConsentOption>
              
              <ConsentOption>
                <ConsentHeader>
                  <ConsentTitle>Allow Data Analytics</ConsentTitle>
                  <ConsentToggle checked={consentOptions.allowDataAnalytics}>
                    <input 
                      type="checkbox" 
                      checked={consentOptions.allowDataAnalytics}
                      onChange={() => handleConsentToggle('allowDataAnalytics')}
                    />
                    <span></span>
                  </ConsentToggle>
                </ConsentHeader>
                <ConsentDescription>
                  We may analyze usage patterns to improve our service and matching algorithms.
                  This helps connect your data with the most relevant research projects.
                </ConsentDescription>
              </ConsentOption>
            </ConsentCard>
          </ProfileSection>
        )}
        
        {activeTab === 'account' && (
          <ProfileSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionTitle>
              <FaUserCircle /> Account Information
            </SectionTitle>
            
            <ProfileGrid>
              <ProfileForm onSubmit={handleProfileUpdate}>
                <FormGroup>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="userType">Account Type</Label>
                  <Input
                    type="text"
                    id="userType"
                    value={currentUser?.role === 'patient' ? 'Patient' : 'Researcher'}
                    disabled
                  />
                </FormGroup>
                
                <SubmitButton type="submit">Update Profile</SubmitButton>
              </ProfileForm>
              
              <ProfileForm onSubmit={handleProfileUpdate}>
                <SectionTitle>
                  <FaLock /> Change Password
                </SectionTitle>
                
                <FormGroup>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={profileForm.currentPassword}
                    onChange={handleProfileChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={profileForm.newPassword}
                    onChange={handleProfileChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={profileForm.confirmPassword}
                    onChange={handleProfileChange}
                  />
                </FormGroup>
                
                <SubmitButton type="submit">Change Password</SubmitButton>
              </ProfileForm>
            </ProfileGrid>
          </ProfileSection>
        )}
      </ProfileContent>
    </ProfileContainer>
  );
}

export default Profile;