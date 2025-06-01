import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter,FaDatabase, FaStar, FaEye, FaShoppingCart, FaWallet, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useBlockchain } from '../contexts/BlockchainContext';

// Mock datasets for marketplace
const mockDatasets = [
  {
    id: 'dataset1',
    name: 'Diabetes Patient Records 2020-2023',
    description: 'Anonymized records of 500+ diabetes patients including blood glucose levels, medication history, and lifestyle factors.',
    type: 'Medical Records',
    size: '12.8 MB',
    price: 0.05,
    seller: '0x1234567890abcdef1234567890abcdef12345678',
    rating: 4.7,
    reviews: 24,
    samples: 500,
    verified: true,
    purchaseCount: 18,
    tags: ['diabetes', 'chronic condition', 'medication', 'glucose'],
    dataPoints: ['Blood Glucose', 'Medication', 'Diet', 'Exercise', 'Weight']
  },
  {
    id: 'dataset2',
    name: 'Heart Rate Monitoring - Elderly Patients',
    description: 'Continuous heart rate data from wearable devices worn by 200+ elderly patients (65+) over 30 days.',
    type: 'Wearable Data',
    size: '8.7 MB',
    price: 0.03,
    seller: '0x2345678901abcdef2345678901abcdef23456789',
    rating: 4.5,
    reviews: 16,
    samples: 200,
    verified: true,
    purchaseCount: 12,
    tags: ['cardiology', 'elderly', 'wearable', 'monitoring'],
    dataPoints: ['Heart Rate', 'Activity Level', 'Sleep Quality', 'Resting Rate']
  },
  {
    id: 'dataset3',
    name: 'Covid-19 Recovery Patterns',
    description: 'Detailed recovery data from 300+ Covid-19 patients of various demographics, includes symptoms timeline and treatment responses.',
    type: 'Clinical Data',
    size: '15.2 MB',
    price: 0.08,
    seller: '0x3456789012abcdef3456789012abcdef34567890',
    rating: 4.9,
    reviews: 31,
    samples: 300,
    verified: true,
    purchaseCount: 25,
    tags: ['covid-19', 'infectious disease', 'recovery', 'treatment'],
    dataPoints: ['Symptoms', 'Treatment', 'Duration', 'Vaccination Status', 'Comorbidities']
  },
  {
    id: 'dataset4',
    name: 'Sleep Patterns - Insomnia Patients',
    description: 'Sleep tracking data from patients diagnosed with insomnia, including REM cycles, disturbances, and medication correlations.',
    type: 'Wearable Data',
    size: '5.1 MB',
    price: 0.02,
    seller: '0x4567890123abcdef4567890123abcdef45678901',
    rating: 4.2,
    reviews: 9,
    samples: 150,
    verified: true,
    purchaseCount: 7,
    tags: ['sleep', 'insomnia', 'neurology', 'wearable'],
    dataPoints: ['Sleep Duration', 'REM Cycles', 'Disturbances', 'Medication']
  },
  {
    id: 'dataset5',
    name: 'Pregnancy Health Metrics',
    description: 'Comprehensive health data from 250+ pregnancies, tracking vital signs, nutrition, activity, and outcomes.',
    type: 'Medical Records',
    size: '9.8 MB',
    price: 0.06,
    seller: '0x5678901234abcdef5678901234abcdef56789012',
    rating: 4.8,
    reviews: 22,
    samples: 250,
    verified: true,
    purchaseCount: 14,
    tags: ['pregnancy', 'maternal health', 'gynecology', 'obstetrics'],
    dataPoints: ['Vital Signs', 'Weight Changes', 'Ultrasound Data', 'Nutrition', 'Complications']
  },
  {
    id: 'dataset6',
    name: 'Mental Health Therapy Responses',
    description: 'Anonymized data tracking responses to various therapy approaches for depression and anxiety disorders.',
    type: 'Psychological Data',
    size: '7.2 MB',
    price: 0.04,
    seller: '0x6789012345abcdef6789012345abcdef67890123',
    rating: 4.5,
    reviews: 18,
    samples: 175,
    verified: true,
    purchaseCount: 10,
    tags: ['mental health', 'depression', 'anxiety', 'therapy'],
    dataPoints: ['Therapy Type', 'Duration', 'Symptoms', 'Progress Metrics', 'Medication']
  },
  {
    id: 'dataset7',
    name: 'Cancer Treatment Outcomes 2018-2023',
    description: 'Comprehensive dataset on treatment outcomes for various cancer types across different demographic groups.',
    type: 'Clinical Data',
    size: '18.3 MB',
    price: 0.09,
    seller: '0x7890123456abcdef7890123456abcdef78901234',
    rating: 4.8,
    reviews: 26,
    samples: 450,
    verified: true,
    purchaseCount: 20,
    tags: ['cancer', 'oncology', 'treatment', 'survival rates'],
    dataPoints: ['Cancer Type', 'Treatment', 'Response', 'Side Effects', 'Survival Rate']
  },
  {
    id: 'dataset8',
    name: 'Nutritional Impact on Blood Pressure',
    description: 'Data tracking the impact of different diets and nutritional interventions on hypertension management.',
    type: 'Dietary Data',
    size: '5.9 MB',
    price: 0.03,
    seller: '0x8901234567abcdef8901234567abcdef89012345',
    rating: 4.7,
    reviews: 22,
    samples: 220,
    verified: true,
    purchaseCount: 15,
    tags: ['nutrition', 'hypertension', 'diet', 'cardiovascular'],
    dataPoints: ['Blood Pressure', 'Dietary Intake', 'Sodium Levels', 'Weight', 'Exercise']
  }
];

const MarketplaceContainer = styled.div`
  padding: 2rem 1.5rem;
`;

const MarketplaceContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const MarketplaceHeader = styled.div`
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

const Description = styled(motion.p)`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.125rem;
  max-width: 800px;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SearchFilterBar = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
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

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textTertiary};
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: ${props => props.active ? props.theme.colors.primaryLight : props.theme.colors.surface};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FilterPanel = styled(motion.div)`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.card};
  margin-bottom: 2rem;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const FilterTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
`;

const FilterClear = styled.button`
  color: ${props => props.theme.colors.primary};
  background: none;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FilterGroups = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div``;

const FilterGroupTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const CheckboxFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CheckboxOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  
  input {
    cursor: pointer;
  }
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

const RangeFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const RangeSlider = styled.input`
  width: 100%;
  accent-color: ${props => props.theme.colors.primary};
`;

const RangeValues = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textTertiary};
`;

const DatasetGrid = styled(motion.div)`
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

const DatasetCard = styled(motion.div)`
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

const VerifiedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background-color: ${props => props.theme.colors.successLight};
  color: ${props => props.theme.colors.success};
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  margin-bottom: 0.75rem;
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

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardType = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
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

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.div`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: ${props => props.theme.colors.surfaceHover};
  border-radius: 9999px;
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

const CardActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const CardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${props => props.primary ? '0.5rem 1rem' : '0.5rem'};
  background-color: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.textSecondary};
  border: ${props => props.primary ? 'none' : `1px solid ${props.theme.colors.border}`};
  border-radius: var(--border-radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.primary ? props.theme.colors.primaryHover : props.theme.colors.surfaceHover};
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.textTertiary};
    cursor: not-allowed;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3rem;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: ${props => props.active ? 'none' : `1px solid ${props.theme.colors.border}`};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.surfaceHover};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function Marketplace() {
  const [datasets, setDatasets] = useState([]);
  const [filteredDatasets, setFilteredDatasets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    types: [],
    priceRange: 0.1,
    minRating: 0,
    verifiedOnly: false
  });
  const [currentPage, setCurrentPage] = useState(1);
  const datasetsPerPage = 6;
  
  const { currentUser, isResearcher } = useAuth();
  const { connectionStatus, purchaseDataset } = useBlockchain();
  
  // Initialize datasets
  useEffect(() => {
    setDatasets(mockDatasets);
    setFilteredDatasets(mockDatasets);
  }, []);
  
  // Handle search and filters
  useEffect(() => {
    let results = [...datasets];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(dataset => 
        dataset.name.toLowerCase().includes(query) || 
        dataset.description.toLowerCase().includes(query) ||
        dataset.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply type filters
    if (filters.types.length > 0) {
      results = results.filter(dataset => filters.types.includes(dataset.type));
    }
    
    // Apply price filter
    results = results.filter(dataset => dataset.price <= filters.priceRange);
    
    // Apply rating filter
    results = results.filter(dataset => dataset.rating >= filters.minRating);
    
    // Apply verified filter
    if (filters.verifiedOnly) {
      results = results.filter(dataset => dataset.verified);
    }
    
    setFilteredDatasets(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, filters, datasets]);
  
  // Get current page datasets
  const indexOfLastDataset = currentPage * datasetsPerPage;
  const indexOfFirstDataset = indexOfLastDataset - datasetsPerPage;
  const currentDatasets = filteredDatasets.slice(indexOfFirstDataset, indexOfLastDataset);
  const totalPages = Math.ceil(filteredDatasets.length / datasetsPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    if (filterType === 'types') {
      // Toggle type filter
      setFilters(prev => {
        const types = prev.types.includes(value) 
          ? prev.types.filter(type => type !== value)
          : [...prev.types, value];
        
        return { ...prev, types };
      });
    } else {
      // Set other filters directly
      setFilters(prev => ({ ...prev, [filterType]: value }));
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      types: [],
      priceRange: 0.1,
      minRating: 0,
      verifiedOnly: false
    });
    setSearchQuery('');
  };
  
  // Get all unique dataset types
  const datasetTypes = [...new Set(datasets.map(dataset => dataset.type))];
  
  // Handle dataset purchase
  const handlePurchase = async (dataset) => {
    if (!currentUser) {
      // Redirect to login if not logged in
      window.location.href = '/login';
      return;
    }
    
    if (connectionStatus !== 'connected') {
      alert('Please connect your wallet to make a purchase.');
      return;
    }
    
    const result = await purchaseDataset(dataset.id, dataset.price, dataset.seller);
    
    if (result.success) {
      alert(`Successfully purchased dataset: ${dataset.name}`);
    } else {
      alert(`Failed to purchase dataset: ${result.error}`);
    }
  };

  return (
    <MarketplaceContainer>
      <MarketplaceContent>
        <MarketplaceHeader>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Health Data Marketplace
          </Title>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore and purchase anonymized health datasets from verified sources. 
            All data is secured with blockchain technology to ensure integrity and traceability.
          </Description>
          
          <SearchFilterBar
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SearchContainer>
              <SearchIcon>
                <FaSearch />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search datasets by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>
            
            <FilterButton 
              active={showFilters}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> Filters
            </FilterButton>
          </SearchFilterBar>
          
          {showFilters && (
            <FilterPanel
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FilterHeader>
                <FilterTitle>Refine Results</FilterTitle>
                <FilterClear onClick={clearFilters}>Clear all filters</FilterClear>
              </FilterHeader>
              
              <FilterGroups>
                <FilterGroup>
                  <FilterGroupTitle>Data Types</FilterGroupTitle>
                  <CheckboxFilter>
                    {datasetTypes.map((type) => (
                      <CheckboxOption key={type}>
                        <input 
                          type="checkbox" 
                          checked={filters.types.includes(type)}
                          onChange={() => handleFilterChange('types', type)}
                        />
                        {type}
                      </CheckboxOption>
                    ))}
                  </CheckboxFilter>
                </FilterGroup>
                
                <FilterGroup>
                  <FilterGroupTitle>Maximum Price (ETH)</FilterGroupTitle>
                  <RangeFilter>
                    <RangeSlider 
                      type="range" 
                      min="0.01" 
                      max="0.1" 
                      step="0.01"
                      value={filters.priceRange}
                      onChange={(e) => handleFilterChange('priceRange', parseFloat(e.target.value))}
                    />
                    <RangeValues>
                      <span>0.01 ETH</span>
                      <span>{filters.priceRange} ETH</span>
                      <span>0.1 ETH</span>
                    </RangeValues>
                  </RangeFilter>
                </FilterGroup>
                
                <FilterGroup>
                  <FilterGroupTitle>Minimum Rating</FilterGroupTitle>
                  <RangeFilter>
                    <RangeSlider 
                      type="range" 
                      min="0" 
                      max="5" 
                      step="0.5"
                      value={filters.minRating}
                      onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                    />
                    <RangeValues>
                      <span>Any</span>
                      <span>{filters.minRating} ★</span>
                      <span>5 ★</span>
                    </RangeValues>
                  </RangeFilter>
                </FilterGroup>
                
                <FilterGroup>
                  <FilterGroupTitle>Verification</FilterGroupTitle>
                  <CheckboxFilter>
                    <CheckboxOption>
                      <input 
                        type="checkbox" 
                        checked={filters.verifiedOnly}
                        onChange={() => handleFilterChange('verifiedOnly', !filters.verifiedOnly)}
                      />
                      Verified datasets only
                    </CheckboxOption>
                  </CheckboxFilter>
                </FilterGroup>
              </FilterGroups>
            </FilterPanel>
          )}
        </MarketplaceHeader>
        
        <DatasetGrid
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {currentDatasets.map((dataset) => (
            <DatasetCard
              key={dataset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardHeader>
                {dataset.verified && (
                  <VerifiedBadge>
                    <FaCheckCircle /> Blockchain Verified
                  </VerifiedBadge>
                )}
                <CardIcon>
                  <FaDatabase />
                </CardIcon>
                <CardTitle to={`/dataset/${dataset.id}`}>{dataset.name}</CardTitle>
                <CardDescription>{dataset.description}</CardDescription>
                <CardType>{dataset.type}</CardType>
                <CardRating>
                  <FaStar style={{ color: 'var(--color-warning)' }} />
                  <span>{dataset.rating}</span> ({dataset.reviews} reviews)
                </CardRating>
                <Tags>
                  {dataset.tags.slice(0, 4).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Tags>
              </CardHeader>
              
              <CardMeta>
                <MetaItem>Size: <span>{dataset.size}</span></MetaItem>
                <MetaItem>Samples: <span>{dataset.samples}</span></MetaItem>
              </CardMeta>
              
              <CardFooter>
                <CardPrice>{dataset.price} ETH</CardPrice>
                <CardActions>
                  <CardButton as={Link} to={`/dataset/${dataset.id}`}>
                    <FaEye />
                  </CardButton>
                  {isResearcher && (
                    <CardButton 
                      primary 
                      onClick={() => handlePurchase(dataset)}
                      disabled={connectionStatus !== 'connected'}
                    >
                      {connectionStatus === 'connected' ? <FaShoppingCart /> : <FaWallet />}
                      {connectionStatus === 'connected' ? 'Purchase' : 'Connect Wallet'}
                    </CardButton>
                  )}
                </CardActions>
              </CardFooter>
            </DatasetCard>
          ))}
        </DatasetGrid>
        
        {totalPages > 1 && (
          <Pagination>
            <PageButton 
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </PageButton>
            
            {Array.from({ length: totalPages }).map((_, index) => (
              <PageButton
                key={index}
                active={currentPage === index + 1}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </PageButton>
            ))}
            
            <PageButton
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </PageButton>
          </Pagination>
        )}
      </MarketplaceContent>
    </MarketplaceContainer>
  );
}

export default Marketplace;