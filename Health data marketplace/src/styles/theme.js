// Theme configuration for light and dark modes

export const lightTheme = {
  name: 'light',
  colors: {
    background: '#FFFFFF',
    surface: '#F9FAFB',
    surfaceHover: '#F3F4F6',
    surfaceActive: '#E5E7EB',
    text: '#111827',
    textSecondary: '#4B5563',
    textTertiary: '#6B7280',
    border: '#E5E7EB',
    borderFocus: '#90D0FC',
    
    primary: '#0A6EBD',
    primaryHover: '#0956A6',
    primaryActive: '#084280',
    primaryLight: '#E4F3FF',
    
    secondary: '#17A2B8',
    secondaryHover: '#138496',
    secondaryActive: '#0F6674',
    secondaryLight: '#E5F8FA',
    
    accent: '#FF7F50',
    accentHover: '#FF5A1F',
    accentActive: '#E63900',
    accentLight: '#FFF2ED',
    
    success: '#28A745',
    successHover: '#20913C',
    successActive: '#188030',
    successLight: '#E6F7ED',
    
    warning: '#FFC107',
    warningHover: '#D9A406',
    warningActive: '#B38705',
    warningLight: '#FFF8E6',
    
    error: '#DC3545',
    errorHover: '#C82333',
    errorActive: '#A71D2A',
    errorLight: '#FAE6E6',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    card: '0 2px 8px rgba(0, 0, 0, 0.08)',
    dropdown: '0 4px 12px rgba(0, 0, 0, 0.15)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
  },
  glass: {
    background: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.125)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
    backdropFilter: 'blur(10px)'
  },
  charts: {
    background: '#FFFFFF',
    gridLines: '#E5E7EB',
    tooltipBackground: '#FFFFFF'
  }
};

export const darkTheme = {
  name: 'dark',
  colors: {
    background: '#111827',
    surface: '#1F2937',
    surfaceHover: '#374151',
    surfaceActive: '#4B5563',
    text: '#F9FAFB',
    textSecondary: '#E5E7EB',
    textTertiary: '#D1D5DB',
    border: '#374151',
    borderFocus: '#61B5F9',
    
    primary: '#61B5F9',
    primaryHover: '#90D0FC',
    primaryActive: '#BCE5FF',
    primaryLight: '#0A6EBD',
    
    secondary: '#8BDBE6',
    secondaryHover: '#C3EEF3',
    secondaryActive: '#E5F8FA',
    secondaryLight: '#0F6674',
    
    accent: '#FFA885',
    accentHover: '#FFC5AE',
    accentActive: '#FFDECF',
    accentLight: '#E63900',
    
    success: '#8FDBB5',
    successHover: '#C3ECD7',
    successActive: '#E6F7ED',
    successLight: '#188030',
    
    warning: '#FFDB80',
    warningHover: '#FFEDBF',
    warningActive: '#FFF8E6',
    warningLight: '#B38705',
    
    error: '#EB8080',
    errorHover: '#F5BFBF',
    errorActive: '#FAE6E6',
    errorLight: '#A71D2A',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
    card: '0 2px 8px rgba(0, 0, 0, 0.3)',
    dropdown: '0 4px 12px rgba(0, 0, 0, 0.4)',
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
  },
  glass: {
    background: 'rgba(31, 41, 55, 0.7)',
    border: '1px solid rgba(55, 65, 81, 0.3)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)'
  },
  charts: {
    background: '#1F2937',
    gridLines: '#374151',
    tooltipBackground: '#111827'
  }
};