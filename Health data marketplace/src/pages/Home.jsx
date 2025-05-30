import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLock, FaExchangeAlt, FaUserShield, FaChartLine } from 'react-icons/fa';

const Hero = styled.section`
  padding: 4rem 1.5rem;
  min-height: 90vh;
  display: flex;
  align-items: center;
  background: ${props => props.theme.name === 'light' ? 
    'linear-gradient(135deg, var(--color-primary-100) 0%, var(--color-secondary-100) 100%)' : 
    'linear-gradient(135deg, var(--color-primary-800) 0%, var(--color-secondary-800) 100%)'
  };

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const HeroContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 768px;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HeroButton = styled(Link)`
  padding: 0.875rem 2rem;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  font-size: 1.125rem;
  transition: all 0.2s ease;
  box-shadow: ${props => props.theme.shadows.md};

  &.primary {
    background-color: ${props => props.theme.colors.primary};
    color: white;

    &:hover {
      background-color: ${props => props.theme.colors.primaryHover};
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.lg};
    }
  }

  &.secondary {
    background-color: transparent;
    color: ${props => props.theme.colors.text};
    border: 2px solid ${props => props.theme.colors.primary};

    &:hover {
      background-color: ${props => props.theme.colors.primaryLight};
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.lg};
    }
  }
`;

const HeroStats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1024px;
  margin-top: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background: ${props => props.theme.glass.background};
  backdrop-filter: ${props => props.theme.glass.backdropFilter};
  border: ${props => props.theme.glass.border};
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  text-align: center;
  box-shadow: ${props => props.theme.glass.boxShadow};
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const Features = styled.section`
  padding: 5rem 1.5rem;
  background-color: ${props => props.theme.colors.background};
`;

const FeaturesTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FeatureCards = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.card};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  font-size: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const HowItWorks = styled.section`
  padding: 5rem 1.5rem;
  background-color: ${props => 
    props.theme.name === 'light' ? 'var(--color-neutral-50)' : 'var(--color-neutral-900)'
  };
`;

const HowItWorksContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const HowItWorksTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const Step = styled(motion.div)`
  position: relative;
  text-align: center;
  padding: 1.5rem;
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const StepDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.6;
`;

const StepLine = styled.div`
  position: absolute;
  top: 25px;
  right: -50%;
  width: 100%;
  height: 2px;
  background-color: ${props => props.theme.colors.border};
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const CTA = styled.section`
  padding: 5rem 1.5rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  text-align: center;
`;

const CTAContent = styled.div`
  max-width: 768px;
  margin: 0 auto;
`;

const CTATitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTADescription = styled(motion.p)`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const CTAButton = styled(motion.div)`
  display: inline-block;
`;

function Home() {
  return (
    <>
      <Hero>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Revolutionizing Health Data Exchange
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A secure blockchain marketplace where patients can anonymize and monetize their health data while researchers gain access to valuable datasets for medical advancement.
          </HeroSubtitle>
          
          <HeroButtons
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HeroButton to="/marketplace" className="primary">
              Explore Marketplace
            </HeroButton>
            <HeroButton to="/register" className="secondary">
              Join Now
            </HeroButton>
          </HeroButtons>
          
          <HeroStats
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StatCard
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatValue>5,000+</StatValue>
              <StatLabel>Patients</StatLabel>
            </StatCard>
            <StatCard
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatValue>250+</StatValue>
              <StatLabel>Researchers</StatLabel>
            </StatCard>
            <StatCard
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatValue>3,800+</StatValue>
              <StatLabel>Datasets</StatLabel>
            </StatCard>
            <StatCard
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <StatValue>$1.2M</StatValue>
              <StatLabel>Transactions</StatLabel>
            </StatCard>
          </HeroStats>
        </HeroContent>
      </Hero>

      <Features>
        <FeaturesTitle>Why Choose Our Platform</FeaturesTitle>
        <FeatureCards>
          <FeatureCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <FeatureIcon>
              <FaLock />
            </FeatureIcon>
            <FeatureTitle>Blockchain Security</FeatureTitle>
            <FeatureDescription>
              All transactions and data exchanges are secured by blockchain technology, ensuring immutable records and trustless verification.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <FeatureIcon>
              <FaUserShield />
            </FeatureIcon>
            <FeatureTitle>Privacy Focused</FeatureTitle>
            <FeatureDescription>
              Advanced anonymization techniques protect patient identity while maintaining data utility for research purposes.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <FeatureIcon>
              <FaExchangeAlt />
            </FeatureIcon>
            <FeatureTitle>Fair Compensation</FeatureTitle>
            <FeatureDescription>
              Patients receive direct compensation for their data contributions through secure cryptocurrency transactions.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <FeatureIcon>
              <FaChartLine />
            </FeatureIcon>
            <FeatureTitle>Research Acceleration</FeatureTitle>
            <FeatureDescription>
              Access to diverse, high-quality datasets enables researchers to accelerate discoveries and medical breakthroughs.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <FeatureIcon>
              <FaUserShield />
            </FeatureIcon>
            <FeatureTitle>Consent Management</FeatureTitle>
            <FeatureDescription>
              Granular control over how your data is used, with the ability to revoke access or modify permissions at any time.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <FeatureIcon>
              <FaLock />
            </FeatureIcon>
            <FeatureTitle>Transparent Tracking</FeatureTitle>
            <FeatureDescription>
              Monitor how and where your data is being used with complete transparency through our blockchain ledger.
            </FeatureDescription>
          </FeatureCard>
        </FeatureCards>
      </Features>

      <HowItWorks>
        <HowItWorksContent>
          <HowItWorksTitle>How It Works</HowItWorksTitle>
          <Steps>
            <Step
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <StepNumber>1</StepNumber>
              <StepLine />
              <StepTitle>Register & Connect</StepTitle>
              <StepDescription>
                Create an account as a patient or researcher and connect your blockchain wallet.
              </StepDescription>
            </Step>
            
            <Step
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <StepNumber>2</StepNumber>
              <StepLine />
              <StepTitle>Upload & Anonymize</StepTitle>
              <StepDescription>
                Patients securely upload their health data, which is automatically anonymized and verified.
              </StepDescription>
            </Step>
            
            <Step
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <StepNumber>3</StepNumber>
              <StepLine />
              <StepTitle>Purchase & Access</StepTitle>
              <StepDescription>
                Researchers browse and purchase dataset access through secure cryptocurrency transactions.
              </StepDescription>
            </Step>
            
            <Step
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <StepNumber>4</StepNumber>
              <StepTitle>Track & Manage</StepTitle>
              <StepDescription>
                Both parties can track usage, manage consent, and view transaction history through the blockchain.
              </StepDescription>
            </Step>
          </Steps>
        </HowItWorksContent>
      </HowItWorks>

      <CTA>
        <CTAContent>
          <CTATitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Ready to Join the Health Data Revolution?
          </CTATitle>
          <CTADescription
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Whether you're a patient looking to monetize your health data or a researcher seeking valuable datasets, start your journey today.
          </CTADescription>
          <CTAButton
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Link to="/register" className="btn btn-lg" style={{
              backgroundColor: 'white',
              color: '#0A6EBD',
              fontWeight: 600,
            }}>
              Create Your Account
            </Link>
          </CTAButton>
        </CTAContent>
      </CTA>
    </>
  );
}

export default Home;