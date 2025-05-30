import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaDatabase, FaDownload, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useBlockchain } from '../../contexts/BlockchainContext';

// Mock data for researcher's purchased datasets
const mockPurchasedDatasets = [
  {
    id: 'dataset1',
    name: 'Diabetes Patient Records 2020-2023',
    type: 'Medical Records',
    size: '12.8 MB',
    date: '2023-09-15',
    price: 0.05,
    seller: '0x1234567890abcdef1234567890abcdef12345678',
    accessUntil: '2024-09-15'
  },
  {
    id: 'dataset2',
    name: 'Heart Rate Monitoring - Elderly Patients',
    type: 'Wearable Data',
    size: '8.7 MB',
    date: '2023-10-22',
    price: 0.03,
    seller: '0x1234567890abcdef1234567890abcdef12345678',
    accessUntil: '2024-10-22'
  },
  {
    id: 'dataset3',
    name: 'Covid-19 Recovery Patterns',
    type: 'Clinical Data',
    size: '15.2 MB',
    date: '2023-11-10',
    price: 0.08,
    seller: '0x7654321fedcba0987654321fedcba0987654321',
    accessUntil: '2024-11-10'
  },
  {
    id: 'dataset4',
    name: 'Sleep Patterns - Insomnia Patients',
    type: 'Wearable Data',
    size: '5.1 MB',
    date: '2023-12-05',
    price: 0.02,
    seller: '0x2468135790abcdef1234567890abcdef13579246',
    accessUntil: '2024-12-05'
  },
  {
    id: 'dataset5',
    name: 'Pregnancy Health Metrics',
    type: 'Medical Records',
    size: '9.8 MB',
    date: '2024-01-18',
    price: 0.06,
    seller: '0x1357924680abcdef1234567890abcdef24681357',
    accessUntil: '2025-01-18'
  }
];

// Mock recommended datasets
const mockRecommendedDatasets = [
  {
    id: 'rec1',
    name: 'Cancer Treatment Outcomes 2018-2023',
    type: 'Clinical Data',
    size: '18.3 MB',
    price: 0.09,
    seller: '0x9876543210fedcba9876543210fedcba98765432',
    rating: 4.8,
    reviews: 26
  },
  {
    id: 'rec2',
    name: 'Mental Health Therapy Responses',
    type: 'Psychological Data',
    size: '7.2 MB',
    price: 0.04,
    seller: '0x5432109876fedcba5432109876fedcba54321098',
    rating: 4.5,
    reviews: 18
  },
  {
    id: 'rec3',
    name: 'Nutritional Impact on Blood Pressure',
    type: 'Dietary Data',
    size: '5.9 MB',
    price: 0.03,
    seller: '0x3210987654fedcba3210987654fedcba32109876',
    rating: 4.7,
    reviews: 22
  }
];

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const DatasetTable = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  box-shadow: ${props => props.theme.shadows.card};
  overflow: hidden;
  width: 100%;
  margin-bottom: 2rem;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: 1rem 1.5rem;
  background-color: ${props => props.theme.colors.surfaceHover};
  font-weight: 600;
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const DatasetRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 992px) {
    display: block;
    padding: 1.5rem;
  }
`;

const DatasetName = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  
  @media (max-width: 992px) {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }
`;

const DatasetType = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  
  @media (max-width: 992px) {
    display: inline-block;
    margin-right: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const DatasetPrice = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  
  @media (max-width: 992px) {
    display: inline-block;
    margin-right: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const AccessUntil = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  
  @media (max-width: 992px) {
    display: block;
    margin-bottom: 0.5rem;
  }
`;

const DatasetActions = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 992px) {
    margin-top: 0.5rem;
  }
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.textSecondary};
  border: ${props => props.primary ? 'none' : `1px solid ${props.theme.colors.border}`};
  padding: ${props => props.primary ? '0.5rem 1rem' : '0.5rem'};
  border-radius: ${props => props.primary ? 'var(--border-radius-md)' : 'var(--border-radius-sm)'};
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.primary ? props.theme.colors.primaryHover : props.theme.colors.surfaceHover};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const MobileLabel = styled.span`
  display: none;
  font-weight: 500;
  margin-right: 0.5rem;
  
  @media (max-width: 992px) {
    display: inline;
  }
`;

const RecommendationsSection = styled.div`
  margin-top: 3rem;
`;

const RecommendedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const RecommendedCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  box-shadow: ${props => props.theme.shadows.card};
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.primaryLight};
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled(Link)`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  display: block;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const CardType = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const CardMeta = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
`;

const MetaItem = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  
  span {
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }
`;

const CardFooter = styled.div`
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardPrice = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const CardButton = styled(Link)`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
`;

const CardRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  
  span {
    color: ${props => props.theme.colors.warning};
    font-weight: 600;
  }
`;

const TransactionsSection = styled.div`
  margin-top: 3rem;
`;

const TransactionCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  box-shadow: ${props => props.theme.shadows.card};
  padding: 1.5rem;
  margin-bottom: 1rem;
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

const TransactionDataset = styled(Link)`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  display: block;
  margin-bottom: 0.25rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const TransactionDate = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const TransactionAmount = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.error};
  
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

const TransactionSeller = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

function ResearcherDashboard() {
  const [purchasedDatasets] = useState(mockPurchasedDatasets);
  const [recommendedDatasets] = useState(mockRecommendedDatasets);
  const { transactions } = useBlockchain();
  
  // Format date
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <div>
        <SectionTitle>Your Purchased Datasets</SectionTitle>
        
        {purchasedDatasets.length > 0 ? (
          <DatasetTable>
            <TableHeader>
              <div>Dataset</div>
              <div>Type</div>
              <div>Price Paid</div>
              <div>Access Until</div>
              <div>Actions</div>
            </TableHeader>
            
            {purchasedDatasets.map((dataset) => (
              <DatasetRow
                key={dataset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DatasetName>{dataset.name}</DatasetName>
                <DatasetType>
                  <MobileLabel>Type:</MobileLabel>
                  {dataset.type}
                </DatasetType>
                <DatasetPrice>
                  <MobileLabel>Price Paid:</MobileLabel>
                  {dataset.price} ETH
                </DatasetPrice>
                <AccessUntil>
                  <MobileLabel>Access Until:</MobileLabel>
                  {formatDate(dataset.accessUntil)}
                </AccessUntil>
                <DatasetActions>
                  <ActionButton primary>
                    <FaDownload /> Download
                  </ActionButton>
                  <ActionButton>
                    <FaExternalLinkAlt /> View
                  </ActionButton>
                </DatasetActions>
              </DatasetRow>
            ))}
          </DatasetTable>
        ) : (
          <EmptyState>
            <div>You haven't purchased any datasets yet.</div>
            <Link to="/marketplace" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Browse Marketplace
            </Link>
          </EmptyState>
        )}
      </div>
      
      <TransactionsSection>
        <SectionTitle>Recent Transactions</SectionTitle>
        
        {transactions.length > 0 ? (
          <div>
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TransactionDetails>
                  <TransactionId>ID: {transaction.hash.substring(0, 10)}...</TransactionId>
                  <TransactionDataset to={`/dataset/${transaction.datasetId}`}>
                    {purchasedDatasets.find(d => d.id === transaction.datasetId)?.name || 'Dataset Purchase'}
                  </TransactionDataset>
                  <TransactionDate>{formatDate(transaction.timestamp)}</TransactionDate>
                </TransactionDetails>
                
                <TransactionAmount>-{transaction.amount} ETH</TransactionAmount>
                
                <TransactionStatus status={transaction.status}>
                  {transaction.status === 'confirmed' ? (
                    <>
                      <FaCheckCircle style={{ marginRight: '0.25rem' }} /> {transaction.status}
                    </>
                  ) : (
                    transaction.status
                  )}
                </TransactionStatus>
                
                <TransactionSeller>
                  <MobileLabel>Seller:</MobileLabel>
                  Patient {transaction.to.substring(0, 6)}...
                </TransactionSeller>
              </TransactionCard>
            ))}
          </div>
        ) : (
          <EmptyState>
            <div>No transactions yet. When you purchase datasets, they will appear here.</div>
          </EmptyState>
        )}
      </TransactionsSection>
      
      <RecommendationsSection>
        <SectionTitle>Recommended for You</SectionTitle>
        
        <RecommendedGrid>
          {recommendedDatasets.map((dataset) => (
            <RecommendedCard
              key={dataset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardHeader>
                <CardIcon>
                  <FaDatabase />
                </CardIcon>
                <CardTitle to={`/dataset/${dataset.id}`}>{dataset.name}</CardTitle>
                <CardType>{dataset.type}</CardType>
                <CardRating>
                  <span>{dataset.rating}</span> ({dataset.reviews} reviews)
                </CardRating>
              </CardHeader>
              
              <CardMeta>
                <MetaItem>Size: <span>{dataset.size}</span></MetaItem>
                <MetaItem>Seller: <span>{dataset.seller.substring(0, 6)}...</span></MetaItem>
              </CardMeta>
              
              <CardFooter>
                <CardPrice>{dataset.price} ETH</CardPrice>
                <CardButton to={`/dataset/${dataset.id}`}>View Details</CardButton>
              </CardFooter>
            </RecommendedCard>
          ))}
        </RecommendedGrid>
      </RecommendationsSection>
    </>
  );
}

export default ResearcherDashboard;