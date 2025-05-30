import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LayoutContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled(motion.main)`
  flex: 1;
  padding-top: 70px; /* To account for fixed navbar */
`;

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

function Layout({ toggleTheme, theme }) {
  return (
    <LayoutContainer
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </LayoutContainer>
  );
}

Layout.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
};

export default Layout;