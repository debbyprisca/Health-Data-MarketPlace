import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Buttons */
  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius-md);
    font-weight: 500;
    text-align: center;
    transition: all var(--transition-fast) ease-in-out;
    cursor: pointer;
    border: none;
    font-size: 1rem;
    line-height: 1.5;
  }

  .btn-primary {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }

  .btn-primary:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }

  .btn-secondary {
    background-color: ${props => props.theme.colors.secondary};
    color: white;
  }

  .btn-secondary:hover {
    background-color: ${props => props.theme.colors.secondaryHover};
  }

  .btn-accent {
    background-color: ${props => props.theme.colors.accent};
    color: white;
  }

  .btn-accent:hover {
    background-color: ${props => props.theme.colors.accentHover};
  }

  .btn-outline {
    background-color: transparent;
    border: 2px solid ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }

  .btn-outline:hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }

  .btn-ghost {
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
  }

  .btn-ghost:hover {
    background-color: ${props => props.theme.colors.surfaceHover};
  }

  .btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .btn-lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }

  /* Container */
  .container {
    width: 100%;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /* Card */
  .card {
    background-color: ${props => props.theme.colors.surface};
    border-radius: var(--border-radius-lg);
    box-shadow: ${props => props.theme.shadows.card};
    overflow: hidden;
    transition: transform var(--transition-fast) ease-in-out, 
                box-shadow var(--transition-fast) ease-in-out;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  .card-body {
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  .card-text {
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 1rem;
  }

  /* Glass effect */
  .glass {
    background: ${props => props.theme.glass.background};
    border: ${props => props.theme.glass.border};
    box-shadow: ${props => props.theme.glass.boxShadow};
    backdrop-filter: ${props => props.theme.glass.backdropFilter};
    -webkit-backdrop-filter: ${props => props.theme.glass.backdropFilter};
    border-radius: var(--border-radius-lg);
  }

  /* Forms */
  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: ${props => props.theme.colors.textSecondary};
  }

  .form-control {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.surface};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: var(--border-radius-md);
    transition: border-color var(--transition-fast) ease-in-out,
                box-shadow var(--transition-fast) ease-in-out;
  }

  .form-control:focus {
    border-color: ${props => props.theme.colors.borderFocus};
    outline: 0;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLight};
  }

  /* Helper Classes */
  .text-primary { color: ${props => props.theme.colors.primary}; }
  .text-secondary { color: ${props => props.theme.colors.secondary}; }
  .text-accent { color: ${props => props.theme.colors.accent}; }
  .text-success { color: ${props => props.theme.colors.success}; }
  .text-warning { color: ${props => props.theme.colors.warning}; }
  .text-error { color: ${props => props.theme.colors.error}; }
  
  .bg-primary { background-color: ${props => props.theme.colors.primary}; }
  .bg-secondary { background-color: ${props => props.theme.colors.secondary}; }
  .bg-accent { background-color: ${props => props.theme.colors.accent}; }
  .bg-success { background-color: ${props => props.theme.colors.success}; }
  .bg-warning { background-color: ${props => props.theme.colors.warning}; }
  .bg-error { background-color: ${props => props.theme.colors.error}; }

  /* Responsive utilities */
  .d-none { display: none !important; }
  .d-block { display: block !important; }
  .d-flex { display: flex !important; }
  .d-inline-flex { display: inline-flex !important; }

  @media (min-width: 576px) {
    .d-sm-none { display: none !important; }
    .d-sm-block { display: block !important; }
    .d-sm-flex { display: flex !important; }
    .d-sm-inline-flex { display: inline-flex !important; }
  }

  @media (min-width: 768px) {
    .d-md-none { display: none !important; }
    .d-md-block { display: block !important; }
    .d-md-flex { display: flex !important; }
    .d-md-inline-flex { display: inline-flex !important; }
  }

  @media (min-width: 992px) {
    .d-lg-none { display: none !important; }
    .d-lg-block { display: block !important; }
    .d-lg-flex { display: flex !important; }
    .d-lg-inline-flex { display: inline-flex !important; }
  }

  @media (min-width: 1200px) {
    .d-xl-none { display: none !important; }
    .d-xl-block { display: block !important; }
    .d-xl-flex { display: flex !important; }
    .d-xl-inline-flex { display: inline-flex !important; }
  }
`;