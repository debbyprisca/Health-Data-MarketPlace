import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaDatabase, FaCheckCircle, FaStar, FaDownload, FaShoppingCart, 
  FaWallet, FaUser, FaCalendarAlt, FaFileAlt, FaChartBar
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useBlockchain } from '../contexts/BlockchainContext';

// Mock datasets for detailed view
const mockDatasets = [
  {
    id: 'dataset1',
    name: 'Diabetes Patient Records 2020-2023',
    description: 'Anonymized records of 500+ diabetes patients including blood glucose levels, medication history, and lifestyle factors. This comprehensive dataset provides researchers with valuable insights into diabetes management, medication efficacy, and correlation with lifestyle choices.',
    fullDescription: `This dataset contains anonymized health records from over 500 patients diagnosed with Type 1 and Type 2 diabetes between 2020 and 2023. The data has been collected with patient consent and has undergone rigorous anonymization to protect patient privacy while preserving clinical value.

Each patient record includes:
- Demographic information (age range, gender, general location by region)
- Blood glucose measurements (daily readings over time)
- HbA1c levels (quarterly measurements)
- Medication history and dosage changes
- Lifestyle factors (diet categorization, exercise frequency, sleep patterns)
- Comorbidities
- Anonymized clinical notes
- Treatment outcomes and complications

This dataset is particularly valuable for researchers studying:
- Long-term medication efficacy
- Correlation between lifestyle choices and glucose control
- Patterns of diabetes progression
- Comparative treatment outcomes
- Identification of risk factors for complications`,
    type: 'Medical Records',
    size: '12.8 MB',
    price: 0.05,
    seller: '0x1234567890abcdef1234567890abcdef12345678',
    sellerName: 'HealthDataProvider1',
    rating: 4.7,
    reviews: 24,
    samples: 500,
    verified: true,
    purchaseCount: 18,
    lastUpdated: '2023-12-10',
    created: '2023-05-15',
    tags: ['diabetes', 'chronic condition', 'medication', 'glucose', 'lifestyle', 'treatment outcomes', 'patient records'],
    dataPoints: ['Blood Glucose', 'Medication', 'Diet', 'Exercise', 'Weight', 'HbA1c', 'Comorbidities'],
    preview: [
      { name: 'Blood Glucose Readings (Anonymized)', type: 'chart', values: [120, 140, 115, 160, 130, 110, 125] },
      { name: 'Medication Distribution', type: 'pie', values: [45, 30, 25] },
      { name: 'Treatment Outcomes', type: 'bar', values: [65, 20, 15] }
    ],
    reviews: [
      { 
        id: 'rev1', 
        author: 'Researcher456', 
        rating: 5, 
        date: '2023-10-12', 
        text: 'Extremely valuable dataset with high-quality data. The anonymization was done expertly without compromising the research value.' 
      },
      { 
        id: 'rev2', 
        author: 'MedicalAnalyst22', 
        rating: 4, 
        date: '2023-09-05', 
        text: 'Very useful for our diabetes research project. Would have appreciated more details on diet categorization, but overall excellent.' 
      },
      { 
        id: 'rev3', 
        author: 'DataScientist88', 
        rating: 5, 
        date: '2023-08-17', 
        text: 'One of the most comprehensive diabetes datasets I\'ve worked with. Clean data with minimal missing values.' 
      }
    ]
  },
  // More dataset details would be here...
];

const DetailsContainer = styled.div`
  padding: 2rem 1.5rem;
`;

const DetailsContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const BreadcrumbNav = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const BreadcrumbLink = styled(Link)`
  color: ${props => props.theme.colors.textSecondary};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const BreadcrumbSeparator = styled.span`
  color: ${props => props.theme.colors.textTertiary};
`;

const DetailsFlex = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const MainContent = styled(motion.div)`
  flex: 1;
`;

const Sidebar = styled(motion.div)`
  width: 380px;
  
  @media (max-width: 992px) {
    width: 100%;
  }
`;

const DatasetHeader = styled.div`
  margin-bottom: 2rem;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const VerifiedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background-color: ${props => props.theme.colors.successLight};
  color: ${props => props.theme.colors.success};
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
`;

const DatasetType = styled.div`
  padding: 0.25rem 0.75rem;
  background-color: ${props => props.theme.colors.primaryLight};
  color: ${props => props.theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
`;

const DatasetTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const DatasetDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DatasetMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .icon {
    color: ${props => props.theme.colors.textTertiary};
  }
  
  .label {
    font-size: 0.875rem;
    color: ${props => props.theme.colors.textSecondary};
  }
  
  .value {
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }
`;

const DatasetTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const Tag = styled.div`
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  background-color: ${props => props.theme.colors.surfaceHover};
  border-radius: 9999px;
  color: ${props => props.theme.colors.textSecondary};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const DatasetDescription2 = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  
  p {
    margin-bottom: 1rem;
  }
  
  ul, ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const DataPointsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const DataPoint = styled.div`
  padding: 1rem;
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-md);
  border: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  .icon {
    color: ${props => props.theme.colors.primary};
  }
  
  .name {
    font-weight: 500;
  }
`;

const PreviewSection = styled.div`
  margin-bottom: 2.5rem;
`;

const ChartGrid = styled.div`
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

const ChartCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
`;

const ChartHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  font-weight: 500;
`;

const ChartBody = styled.div`
  padding: 1.5rem;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Simple chart visualization components
const LineChart = ({ values }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        {values.map((value, index) => (
          <div 
            key={index}
            style={{ 
              height: `${(value / Math.max(...values)) * 80}%`,
              width: '12%',
              backgroundColor: '#0A6EBD',
              position: 'relative'
            }}
          />
        ))}
      </div>
    </div>
  );
};

const BarChart = ({ values }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end', justifyContent: 'space-around' }}>
        {values.map((value, index) => (
          <div 
            key={index}
            style={{ 
              height: `${(value / Math.max(...values)) * 80}%`,
              width: '25%',
              backgroundColor: index === 0 ? '#0A6EBD' : index === 1 ? '#FF7F50' : '#17A2B8',
              borderRadius: '4px 4px 0 0'
            }}
          />
        ))}
      </div>
    </div>
  );
};

const PieChart = ({ values }) => {
  const total = values.reduce((acc, val) => acc + val, 0);
  const colors = ['#0A6EBD', '#FF7F50', '#17A2B8'];
  
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ 
        width: '150px', 
        height: '150px', 
        borderRadius: '50%', 
        background: `conic-gradient(
          ${colors[0]} 0% ${(values[0] / total) * 100}%, 
          ${colors[1]} ${(values[0] / total) * 100}% ${((values[0] + values[1]) / total) * 100}%,
          ${colors[2]} ${((values[0] + values[1]) / total) * 100}% 100%
        )`
      }} />
    </div>
  );
};

const ReviewsSection = styled.div`
  margin-bottom: 2.5rem;
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ReviewCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-md);
  border: 1px solid ${props => props.theme.colors.border};
  padding: 1.5rem;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ReviewAuthor = styled.div`
  font-weight: 500;
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.warning};
`;

const ReviewDate = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textTertiary};
`;

const ReviewText = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const PurchaseCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
  position: sticky;
  top: 2rem;
`;

const PurchaseHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const PurchasePrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const PurchaseSubinfo = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PurchaseBody = styled.div`
  padding: 1.5rem;
`;

const PurchaseButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.textTertiary};
    cursor: not-allowed;
  }
`;

const ConnectWalletButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: var(--border-radius-md);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;

const PurchaseInfo = styled.div`
  margin-bottom: 1.5rem;
`;

const PurchaseInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  
  .label {
    color: ${props => props.theme.colors.textSecondary};
  }
  
  .value {
    color: ${props => props.theme.colors.text};
    font-weight: 500;
  }
`;

const SellerCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  border: 1px solid ${props => props.theme.colors.border};
  padding: 1.5rem;
  margin-top: 1.5rem;
`;

const SellerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SellerAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primaryLight};
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const SellerInfo = styled.div``;

const SellerName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const SellerAddress = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textTertiary};
`;

const SellerStats = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  font-size: 0.875rem;
`;

const SellerStat = styled.div`
  flex: 1;
  text-align: center;
  
  .value {
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
  }
  
  .label {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

function DatasetDetails() {
  const { id } = useParams();
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPurchased, setIsPurchased] = useState(false);
  
  const navigate = useNavigate();
  const { currentUser, isResearcher } = useAuth();
  const { connectionStatus, purchaseDataset, connectWallet } = useBlockchain();
  
  // Fetch dataset details
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    // Find dataset by ID from mock data
    const foundDataset = mockDatasets.find(d => d.id === id);
    
    if (foundDataset) {
      setDataset(foundDataset);
      
      // Check if user has already purchased this dataset
      // In a real app, this would come from the blockchain or backend
      setIsPurchased(false);
    } else {
      // Dataset not found, redirect to marketplace
      navigate('/marketplace');
    }
    
    setLoading(false);
  }, [id, navigate]);
  
  // Format date
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Handle dataset purchase
  const handlePurchase = async () => {
    if (!currentUser) {
      // Redirect to login if not logged in
      navigate('/login');
      return;
    }
    
    if (connectionStatus !== 'connected') {
      // Connect wallet first
      await connectWallet();
      return;
    }
    
    const result = await purchaseDataset(dataset.id, dataset.price, dataset.seller);
    
    if (result.success) {
      setIsPurchased(true);
      alert(`Successfully purchased dataset: ${dataset.name}`);
    } else {
      alert(`Failed to purchase dataset: ${result.error}`);
    }
  };
  
  if (loading || !dataset) {
    return (
      <DetailsContainer>
        <DetailsContent>
          <div>Loading dataset details...</div>
        </DetailsContent>
      </DetailsContainer>
    );
  }

  return (
    <DetailsContainer>
      <DetailsContent>
        <BreadcrumbNav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <BreadcrumbLink to="/">Home</BreadcrumbLink>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbLink to="/marketplace">Marketplace</BreadcrumbLink>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <span>{dataset.name}</span>
        </BreadcrumbNav>
        
        <DetailsFlex>
          <MainContent
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DatasetHeader>
              <HeaderTop>
                {dataset.verified && (
                  <VerifiedBadge>
                    <FaCheckCircle /> Blockchain Verified
                  </VerifiedBadge>
                )}
                <DatasetType>{dataset.type}</DatasetType>
              </HeaderTop>
              
              <DatasetTitle>{dataset.name}</DatasetTitle>
              <DatasetDescription>{dataset.description}</DatasetDescription>
              
              <DatasetMeta>
                <MetaItem>
                  <FaFileAlt className="icon" />
                  <div>
                    <div className="label">Size</div>
                    <div className="value">{dataset.size}</div>
                  </div>
                </MetaItem>
                
                <MetaItem>
                  <FaUser className="icon" />
                  <div>
                    <div className="label">Samples</div>
                    <div className="value">{dataset.samples}</div>
                  </div>
                </MetaItem>
                
                <MetaItem>
                  <FaCalendarAlt className="icon" />
                  <div>
                    <div className="label">Last Updated</div>
                    <div className="value">{formatDate(dataset.lastUpdated)}</div>
                  </div>
                </MetaItem>
                
                <MetaItem>
                  <FaStar className="icon" style={{ color: 'var(--color-warning)' }} />
                  <div>
                    <div className="label">Rating</div>
                    <div className="value">{dataset.rating} ({dataset.reviews})</div>
                  </div>
                </MetaItem>
              </DatasetMeta>
              
              <DatasetTags>
                {dataset.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </DatasetTags>
            </DatasetHeader>
            
            <div>
              <SectionTitle>About This Dataset</SectionTitle>
              <DatasetDescription2>
                {dataset.fullDescription.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n');
                    return (
                      <ul key={index}>
                        {items.map((item, i) => (
                          <li key={i}>{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={index}>{paragraph}</p>;
                })}
              </DatasetDescription2>
              
              <SectionTitle>Data Points Included</SectionTitle>
              <DataPointsGrid>
                {dataset.dataPoints.map((point) => (
                  <DataPoint key={point}>
                    <FaChartBar className="icon" />
                    <span className="name">{point}</span>
                  </DataPoint>
                ))}
              </DataPointsGrid>
              
              <PreviewSection>
                <SectionTitle>Data Preview</SectionTitle>
                <ChartGrid>
                  {dataset.preview.map((preview, index) => (
                    <ChartCard key={index}>
                      <ChartHeader>{preview.name}</ChartHeader>
                      <ChartBody>
                        {preview.type === 'chart' && <LineChart values={preview.values} />}
                        {preview.type === 'bar' && <BarChart values={preview.values} />}
                        {preview.type === 'pie' && <PieChart values={preview.values} />}
                      </ChartBody>
                    </ChartCard>
                  ))}
                </ChartGrid>
              </PreviewSection>
              
              <ReviewsSection>
                <SectionTitle>Researcher Reviews</SectionTitle>
                <ReviewsList>
                  {dataset.reviews.map((review) => (
                    <ReviewCard key={review.id}>
                      <ReviewHeader>
                        <div>
                          <ReviewAuthor>{review.author}</ReviewAuthor>
                          <ReviewDate>{formatDate(review.date)}</ReviewDate>
                        </div>
                        <ReviewRating>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar key={i} style={{ opacity: i < review.rating ? 1 : 0.3 }} />
                          ))}
                        </ReviewRating>
                      </ReviewHeader>
                      <ReviewText>{review.text}</ReviewText>
                    </ReviewCard>
                  ))}
                </ReviewsList>
              </ReviewsSection>
            </div>
          </MainContent>
          
          <Sidebar
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PurchaseCard>
              <PurchaseHeader>
                <PurchasePrice>{dataset.price} ETH</PurchasePrice>
                <PurchaseSubinfo>
                  <FaDownload /> {dataset.purchaseCount} researchers purchased
                </PurchaseSubinfo>
              </PurchaseHeader>
              
              <PurchaseBody>
                {isPurchased ? (
                  <PurchaseButton>
                    <FaDownload /> Download Dataset
                  </PurchaseButton>
                ) : isResearcher ? (
                  connectionStatus === 'connected' ? (
                    <PurchaseButton onClick={handlePurchase}>
                      <FaShoppingCart /> Purchase Now
                    </PurchaseButton>
                  ) : (
                    <ConnectWalletButton onClick={connectWallet}>
                      <FaWallet /> Connect Wallet to Purchase
                    </ConnectWalletButton>
                  )
                ) : currentUser ? (
                  <PurchaseButton disabled>
                    Patient Account - Cannot Purchase
                  </PurchaseButton>
                ) : (
                  <PurchaseButton onClick={() => navigate('/login')}>
                    Sign In to Purchase
                  </PurchaseButton>
                )}
                
                <PurchaseInfo>
                  <PurchaseInfoItem>
                    <div className="label">Data Type</div>
                    <div className="value">{dataset.type}</div>
                  </PurchaseInfoItem>
                  <PurchaseInfoItem>
                    <div className="label">File Size</div>
                    <div className="value">{dataset.size}</div>
                  </PurchaseInfoItem>
                  <PurchaseInfoItem>
                    <div className="label">Total Samples</div>
                    <div className="value">{dataset.samples}</div>
                  </PurchaseInfoItem>
                  <PurchaseInfoItem>
                    <div className="label">Last Updated</div>
                    <div className="value">{formatDate(dataset.lastUpdated)}</div>
                  </PurchaseInfoItem>
                  <PurchaseInfoItem>
                    <div className="label">Created On</div>
                    <div className="value">{formatDate(dataset.created)}</div>
                  </PurchaseInfoItem>
                </PurchaseInfo>
                
                <div style={{ fontSize: '0.875rem', color: 'var(--color-textSecondary)' }}>
                  <p>Your purchase includes:</p>
                  <ul style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
                    <li>Full dataset access for 12 months</li>
                    <li>Verification of data integrity</li>
                    <li>Usage tracking via blockchain</li>
                    <li>Format: CSV, JSON</li>
                  </ul>
                </div>
              </PurchaseBody>
            </PurchaseCard>
            
            <SellerCard>
              <SellerHeader>
                <SellerAvatar>
                  <FaUser />
                </SellerAvatar>
                <SellerInfo>
                  <SellerName>{dataset.sellerName}</SellerName>
                  <SellerAddress>{`${dataset.seller.substring(0, 6)}...${dataset.seller.substring(38)}`}</SellerAddress>
                </SellerInfo>
              </SellerHeader>
              
              <SellerStats>
                <SellerStat>
                  <div className="value">24</div>
                  <div className="label">Datasets</div>
                </SellerStat>
                <SellerStat>
                  <div className="value">4.8</div>
                  <div className="label">Rating</div>
                </SellerStat>
                <SellerStat>
                  <div className="value">2y 3m</div>
                  <div className="label">Member</div>
                </SellerStat>
              </SellerStats>
            </SellerCard>
          </Sidebar>
        </DetailsFlex>
      </DetailsContent>
    </DetailsContainer>
  );
}

export default DatasetDetails;