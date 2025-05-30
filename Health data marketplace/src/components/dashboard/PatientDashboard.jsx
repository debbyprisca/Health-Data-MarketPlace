import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEye, FaDownload, FaTrash, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useBlockchain } from '../../contexts/BlockchainContext';

// Mock data for patient's datasets
const mockDatasets = [
  {
    id: 'dataset1',
    name: 'Medical History 2023',
    type: 'Medical Records',
    size: '2.4 MB',
    date: '2023-05-15',
    price: 0.05,
    status: 'active',
    verified: true,
    purchases: 3
  },
  {
    id: 'dataset2',
    name: 'Heart Rate Monitoring',
    type: 'Wearable Data',
    size: '8.7 MB',
    date: '2023-08-22',
    price: 0.03,
    status: 'active',
    verified: true,
    purchases: 2
  },
  {
    id: 'dataset3',
    name: 'Blood Test Results',
    type: 'Lab Results',
    size: '1.2 MB',
    date: '2023-09-10',
    price: 0.04,
    status: 'pending',
    verified: false,
    purchases: 0
  },
  {
    id: 'dataset4',
    name: 'Sleep Patterns',
    type: 'Wearable Data',
    size: '5.1 MB',
    date: '2023-10-05',
    price: 0.02,
    status: 'active',
    verified: true,
    purchases: 1
  },
  {
    id: 'dataset5',
    name: 'Annual Physical Results',
    type: 'Medical Records',
    size: '3.8 MB',
    date: '2023-11-18',
    price: 0.06,
    status: 'active',
    verified: true,
    purchases: 0
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
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  padding: 1rem 1.5rem;
  background-color: ${props => props.theme.colors.surfaceHover};
  font-weight: 600;
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const DatasetRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
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

const DatasetStatus = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => 
    props.status === 'active' ? props.theme.colors.successLight :
    props.status === 'pending' ? props.theme.colors.warningLight :
    props.theme.colors.errorLight
  };
  color: ${props => 
    props.status === 'active' ? props.theme.colors.success :
    props.status === 'pending' ? props.theme.colors.warning :
    props.theme.colors.error
  };
  
  @media (max-width: 992px) {
    margin-bottom: 0.5rem;
  }
`;

const DatasetPurchases = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  
  @media (max-width: 992px) {
    display: inline-block;
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
  background-color: transparent;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.surfaceHover};
    color: ${props => 
      props.action === 'view' ? props.theme.colors.primary :
      props.action === 'download' ? props.theme.colors.secondary :
      props.theme.colors.error
    };
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

const Verification = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.verified ? props.theme.colors.success : props.theme.colors.warning};
  font-size: 0.875rem;
  
  @media (max-width: 992px) {
    margin-bottom: 0.75rem;
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
  color: ${props => props.theme.colors.success};
  
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

const TransactionBuyer = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

function PatientDashboard() {
  const [datasets] = useState(mockDatasets);
  const { transactions } = useBlockchain();
  
  // Format date from timestamp
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <div>
        <SectionTitle>Your Datasets</SectionTitle>
        
        {datasets.length > 0 ? (
          <DatasetTable>
            <TableHeader>
              <div>Dataset</div>
              <div>Type</div>
              <div>Price</div>
              <div>Status</div>
              <div>Purchases</div>
              <div>Actions</div>
            </TableHeader>
            
            {datasets.map((dataset) => (
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
                  <MobileLabel>Price:</MobileLabel>
                  {dataset.price} ETH
                </DatasetPrice>
                <div>
                  <Verification verified={dataset.verified}>
                    {dataset.verified ? (
                      <>
                        <FaCheckCircle /> Verified
                      </>
                    ) : (
                      <>
                        <FaExclamationTriangle /> Pending verification
                      </>
                    )}
                  </Verification>
                  <DatasetStatus status={dataset.status}>
                    {dataset.status === 'active' ? 'Active' : 
                     dataset.status === 'pending' ? 'Pending' : 'Inactive'}
                  </DatasetStatus>
                </div>
                <DatasetPurchases>
                  <MobileLabel>Purchases:</MobileLabel>
                  {dataset.purchases}
                </DatasetPurchases>
                <DatasetActions>
                  <ActionButton action="view" title="View dataset">
                    <FaEye />
                  </ActionButton>
                  <ActionButton action="download" title="Download data">
                    <FaDownload />
                  </ActionButton>
                  <ActionButton action="delete" title="Delete dataset">
                    <FaTrash />
                  </ActionButton>
                </DatasetActions>
              </DatasetRow>
            ))}
          </DatasetTable>
        ) : (
          <EmptyState>
            <div>You haven't uploaded any datasets yet.</div>
            <Link to="/upload" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Upload Your First Dataset
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
                    {datasets.find(d => d.id === transaction.datasetId)?.name || 'Unknown Dataset'}
                  </TransactionDataset>
                  <TransactionDate>{formatDate(transaction.timestamp)}</TransactionDate>
                </TransactionDetails>
                
                <TransactionAmount>+{transaction.amount} ETH</TransactionAmount>
                
                <TransactionStatus status={transaction.status}>
                  {transaction.status}
                </TransactionStatus>
                
                <TransactionBuyer>
                  <MobileLabel>Buyer:</MobileLabel>
                  Researcher {transaction.to.substring(0, 6)}...
                </TransactionBuyer>
              </TransactionCard>
            ))}
          </div>
        ) : (
          <EmptyState>
            <div>No transactions yet. When your datasets are purchased, they will appear here.</div>
          </EmptyState>
        )}
      </TransactionsSection>
    </>
  );
}

export default PatientDashboard;