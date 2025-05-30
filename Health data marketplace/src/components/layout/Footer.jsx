import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaTwitter, FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.surface};
  padding: 3rem 1.5rem;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;

  span {
    background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const FooterDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const FooterHeading = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: ${props => props.theme.colors.text};
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.75rem;

  a {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.875rem;
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.25rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FooterBottom = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const FooterHeart = styled(FaHeart)`
  color: ${props => props.theme.colors.error};
  margin: 0 0.25rem;
  display: inline-block;
`;

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo to="/">
            Health<span>Data</span>Nexus
          </FooterLogo>
          <FooterDescription>
            A blockchain-powered marketplace for secure health data exchange between patients and researchers.
          </FooterDescription>
          <SocialLinks>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </SocialLink>
            <SocialLink href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Resources</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <Link to="#">Documentation</Link>
            </FooterLink>
            <FooterLink>
              <Link to="#">API</Link>
            </FooterLink>
            <FooterLink>
              <Link to="#">Blockchain Info</Link>
            </FooterLink>
            <FooterLink>
              <Link to="#">Data Standards</Link>
            </FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Company</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <Link to="#">About Us</Link>
            </FooterLink>
            <FooterLink>
              <Link to="#">Team</Link>
            </FooterLink>
            <FooterLink>
              <Link to="#">Partners</Link>
            </FooterLink>
            <FooterLink>
              <Link to="#">Careers</Link>
            </FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Legal</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <Link to="#">Privacy Policy</Link>
            </FooterLink>
            <FooterLink>
              <Link to="#">Terms of Service</Link>
            </FooterLink>
            <FooterLink>
              <Link to="#">Data Usage Policy</Link>
            </FooterLink>
            <FooterLink>
              <Link to="#">Cookie Policy</Link>
            </FooterLink>
          </FooterLinks>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <div>
          &copy; {currentYear} HealthData Nexus. All rights reserved.
        </div>
        <div>
          Made with <FooterHeart /> for secure health data exchange
        </div>
      </FooterBottom>
    </FooterContainer>
  );
}

export default Footer;