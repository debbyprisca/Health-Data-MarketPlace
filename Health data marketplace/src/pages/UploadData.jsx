import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaUpload, FaCloudUploadAlt, FaTrash, FaLock, FaShieldAlt, 
  FaMoneyBillWave, FaTags, FaChartLine, FaExclamationCircle,
  FaCircle
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const UploadContainer = styled.div`
  padding: 2rem 1.5rem;
`;

const UploadContent = styled.div`
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

const Description = styled(motion.p)`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.125rem;
  max-width: 800px;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StepsContainer = styled(motion.div)`
  display: flex;
  margin-bottom: 2.5rem;
  border-radius: var(--border-radius-lg);
  background-color: ${props => props.theme.colors.surface};
  box-shadow: ${props => props.theme.shadows.card};
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Step = styled.div`
  flex: 1;
  padding: 1.25rem 1rem;
  text-align: center;
  background-color: ${props => 
    props.active ? props.theme.colors.primaryLight : 
    props.completed ? props.theme.colors.successLight : 
    'transparent'
  };
  color: ${props => 
    props.active ? props.theme.colors.primary : 
    props.completed ? props.theme.colors.success : 
    props.theme.colors.textSecondary
  };
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid ${props => 
      props.active ? props.theme.colors.primaryLight : 
      props.completed ? props.theme.colors.successLight : 
      props.theme.colors.surface
    };
    
    @media (max-width: 768px) {
      top: auto;
      right: 50%;
      bottom: 0;
      transform: translateX(50%) rotate(90deg);
    }
  }
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => 
    props.active ? props.theme.colors.primary : 
    props.completed ? props.theme.colors.success : 
    props.theme.colors.surfaceHover
  };
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
`;

const StepTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const StepDescription = styled.div`
  font-size: 0.75rem;
  opacity: 0.8;
`;

const FormContainer = styled(motion.div)`
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.card};
  margin-bottom: 2rem;
  
  @media (max-width: 576px) {
    padding: 1.5rem;
  }
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const UploadBox = styled.div`
  border: 2px dashed ${props => props.theme.colors.border};
  border-radius: var(--border-radius-lg);
  padding: 2.5rem;
  text-align: center;
  background-color: ${props => props.dragging ? props.theme.colors.primaryLight : 'transparent'};
  transition: background-color 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primaryLight};
  }
  
  input {
    display: none;
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const UploadText = styled.div`
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const UploadSubtext = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
`;

const UploadButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
`;

const FilesList = styled.div`
  margin-top: 1.5rem;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius-md);
  background-color: ${props => props.theme.colors.surfaceHover};
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const FileIcon = styled.div`
  color: ${props => props.theme.colors.primary};
`;

const FileName = styled.div`
  font-weight: 500;
`;

const FileSize = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const FileActions = styled.div``;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.error};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  
  &:hover {
    background-color: ${props => props.theme.colors.errorLight};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: var(--border-radius-md);
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLight};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: var(--border-radius-md);
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLight};
  }
`;

const TagsInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: var(--border-radius-md);
  background-color: ${props => props.theme.colors.surface};
  min-height: 3.5rem;
  align-items: center;
  
  &:focus-within {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLight};
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background-color: ${props => props.theme.colors.primaryLight};
  color: ${props => props.theme.colors.primary};
  border-radius: 9999px;
  font-size: 0.875rem;
  
  button {
    background: none;
    border: none;
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
  }
`;

const TagInput = styled.input`
  flex: 1;
  min-width: 100px;
  padding: 0.25rem;
  border: none;
  background: transparent;
  color: ${props => props.theme.colors.text};
  
  &:focus {
    outline: none;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 2px solid ${props => 
    props.checked ? props.theme.colors.primary : props.theme.colors.border
  };
  border-radius: var(--border-radius-md);
  background-color: ${props => 
    props.checked ? props.theme.colors.primaryLight : props.theme.colors.surface
  };
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const RadioButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${props => 
    props.checked ? props.theme.colors.primary : props.theme.colors.textTertiary
  };
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => 
      props.checked ? props.theme.colors.primary : 'transparent'
    };
  }
`;

const RadioText = styled.div`
  font-weight: 500;
`;

const HelpText = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 0.5rem;
`;

const PriceInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    max-width: 200px;
  }
  
  span {
    font-weight: 500;
    color: ${props => props.theme.colors.primary};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  
  input {
    margin-top: 0.25rem;
  }
  
  span {
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: 1px solid ${props => props.theme.colors.border};
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.surfaceHover};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NextButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.textTertiary};
    cursor: not-allowed;
  }
`;

const SuccessContainer = styled(motion.div)`
  text-align: center;
  padding: 3rem 2rem;
  background-color: ${props => props.theme.colors.surface};
  border-radius: var(--border-radius-lg);
  box-shadow: ${props => props.theme.shadows.card};
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.successLight};
  color: ${props => props.theme.colors.success};
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
`;

const SuccessTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const SuccessDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const SuccessButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SuccessButton = styled.button`
  background-color: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.primary};
  border: ${props => props.primary ? 'none' : `1px solid ${props.theme.colors.primary}`};
  padding: 0.75rem 2rem;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.primary ? props.theme.colors.primaryHover : props.theme.colors.primaryLight};
  }
`;

function UploadData() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    tags: [],
    price: '',
    anonymizationLevel: 'high',
    consentOptions: {
      research: true,
      commercial: false,
      timeLimit: true,
      revoke: true
    },
    agreeToTerms: false
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});
  const [completed, setCompleted] = useState(false);
  
  const { currentUser, isPatient } = useAuth();
  const navigate = useNavigate();
  
  // If not a patient, redirect to dashboard
  useEffect(() => {
    if (currentUser && !isPatient) {
      navigate('/dashboard');
    }
  }, [currentUser, isPatient, navigate]);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  
  const handleDragLeave = () => {
    setDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    if (validateFiles(droppedFiles)) {
      addFiles(droppedFiles);
    }
  };
  
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    if (validateFiles(selectedFiles)) {
      addFiles(selectedFiles);
    }
  };
  
  const validateFiles = (filesToValidate) => {
    // Check file types (allow only csv, json, xlsx)
    const allowedTypes = ['text/csv', 'application/json', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const invalidFiles = filesToValidate.filter(file => !allowedTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      toast.error('Only CSV, JSON, and XLSX files are allowed');
      return false;
    }
    
    // Check file size (max 50MB per file)
    const maxSize = 50 * 1024 * 1024; // 50MB
    const oversizedFiles = filesToValidate.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      toast.error('Files must be smaller than 50MB');
      return false;
    }
    
    return true;
  };
  
  const addFiles = (newFiles) => {
    // Add new files to the list
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      
      newFiles.forEach(file => {
        // Check if file already exists
        const exists = updatedFiles.some(f => 
          f.name === file.name && f.size === file.size
        );
        
        if (!exists) {
          updatedFiles.push(file);
        }
      });
      
      return updatedFiles;
    });
  };
  
  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };
  
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    else return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };
  
  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects (e.g. consentOptions.research)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle tag input
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput.trim());
    }
  };
  
  const addTag = (tag) => {
    if (formData.tags.includes(tag)) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, tag]
    }));
    setTagInput('');
  };
  
  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  // Validate current step
  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (files.length === 0) {
        newErrors.files = 'Please upload at least one file';
      }
    } else if (step === 2) {
      if (!formData.name.trim()) {
        newErrors.name = 'Dataset name is required';
      }
      
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      }
      
      if (!formData.category) {
        newErrors.category = 'Please select a category';
      }
      
      if (formData.tags.length === 0) {
        newErrors.tags = 'Please add at least one tag';
      }
    } else if (step === 3) {
      if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
        newErrors.price = 'Please enter a valid price';
      }
      
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Move to next step
  const nextStep = () => {
    if (validateStep()) {
      if (step < 3) {
        setStep(step + 1);
        window.scrollTo(0, 0);
      } else {
        // Submit form
        handleSubmit();
      }
    }
  };
  
  // Move to previous step
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // Simulate form submission
    setCompleted(true);
    
    // In a real app, we would upload the files and form data to the server/blockchain
    console.log('Files:', files);
    console.log('Form data:', formData);
    
    toast.success('Your dataset has been uploaded successfully!');
  };
  
  // Go to dashboard
  const goToDashboard = () => {
    navigate('/dashboard');
  };
  
  // Upload another dataset
  const uploadAnother = () => {
    // Reset form
    setStep(1);
    setFiles([]);
    setFormData({
      name: '',
      description: '',
      category: '',
      tags: [],
      price: '',
      anonymizationLevel: 'high',
      consentOptions: {
        research: true,
        commercial: false,
        timeLimit: true,
        revoke: true
      },
      agreeToTerms: false
    });
    setCompleted(false);
    window.scrollTo(0, 0);
  };

  // If not showing the completed screen
  if (!completed) {
    return (
      <UploadContainer>
        <UploadContent>
          <PageHeader>
            <Title
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Upload Health Data
            </Title>
            <Description
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Share your health data securely while maintaining privacy. You control how your data is used and earn cryptocurrency for valuable research contributions.
            </Description>
            
            <StepsContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Step active={step === 1} completed={step > 1}>
                <StepNumber active={step === 1} completed={step > 1}>
                  {step > 1 ? <FaCheckCircle /> : 1}
                </StepNumber>
                <StepTitle>Upload Files</StepTitle>
                <StepDescription>Add your health data files</StepDescription>
              </Step>
              
              <Step active={step === 2} completed={step > 2}>
                <StepNumber active={step === 2} completed={step > 2}>
                  {step > 2 ? <FaCheckCircle /> : 2}
                </StepNumber>
                <StepTitle>Dataset Details</StepTitle>
                <StepDescription>Describe your data</StepDescription>
              </Step>
              
              <Step active={step === 3}>
                <StepNumber active={step === 3}>3</StepNumber>
                <StepTitle>Pricing & Consent</StepTitle>
                <StepDescription>Set terms & pricing</StepDescription>
              </Step>
            </StepsContainer>
          </PageHeader>
          
          {step === 1 && (
            <FormContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FormSection>
                <SectionTitle>
                  <FaCloudUploadAlt /> Upload Your Health Data Files
                </SectionTitle>
                
                <UploadBox
                  dragging={dragging}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept=".csv,.json,.xlsx"
                  />
                  <UploadIcon>
                    <FaUpload />
                  </UploadIcon>
                  <UploadText>Drag and drop your files here, or click to browse</UploadText>
                  <UploadSubtext>Supported formats: CSV, JSON, XLSX (Max 50MB per file)</UploadSubtext>
                  <UploadButton>
                    <FaUpload /> Select Files
                  </UploadButton>
                </UploadBox>
                
                {errors.files && (
                  <ErrorMessage>
                    <FaExclamationCircle /> {errors.files}
                  </ErrorMessage>
                )}
                
                {files.length > 0 && (
                  <FilesList>
                    {files.map((file, index) => (
                      <FileItem key={index}>
                        <FileInfo>
                          <FileIcon>
                            <FaFileAlt />
                          </FileIcon>
                          <div>
                            <FileName>{file.name}</FileName>
                            <FileSize>{formatFileSize(file.size)}</FileSize>
                          </div>
                        </FileInfo>
                        <FileActions>
                          <DeleteButton onClick={() => removeFile(index)}>
                            <FaTrash />
                          </DeleteButton>
                        </FileActions>
                      </FileItem>
                    ))}
                  </FilesList>
                )}
              </FormSection>
              
              <NavigationButtons>
                <div></div> {/* Empty div for flex alignment */}
                <NextButton onClick={nextStep}>
                  Next: Dataset Details
                </NextButton>
              </NavigationButtons>
            </FormContainer>
          )}
          
          {step === 2 && (
            <FormContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FormSection>
                <SectionTitle>
                  <FaChartLine /> Dataset Information
                </SectionTitle>
                
                <FormGroup>
                  <Label htmlFor="name">Dataset Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter a descriptive name for your dataset"
                  />
                  {errors.name && (
                    <ErrorMessage>
                      <FaExclamationCircle /> {errors.name}
                    </ErrorMessage>
                  )}
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe what type of health data is included and its potential research value..."
                  />
                  {errors.description && (
                    <ErrorMessage>
                      <FaExclamationCircle /> {errors.description}
                    </ErrorMessage>
                  )}
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a category</option>
                    <option value="Medical Records">Medical Records</option>
                    <option value="Wearable Data">Wearable Data</option>
                    <option value="Lab Results">Lab Results</option>
                    <option value="Clinical Data">Clinical Data</option>
                    <option value="Genomic Data">Genomic Data</option>
                    <option value="Dietary Data">Dietary Data</option>
                    <option value="Psychological Data">Psychological Data</option>
                  </Select>
                  {errors.category && (
                    <ErrorMessage>
                      <FaExclamationCircle /> {errors.category}
                    </ErrorMessage>
                  )}
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="tags">Tags</Label>
                  <TagsInput>
                    {formData.tags.map((tag) => (
                      <Tag key={tag}>
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)}>×</button>
                      </Tag>
                    ))}
                    <TagInput
                      type="text"
                      placeholder="Add tags and press Enter"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                    />
                  </TagsInput>
                  <HelpText>
                    Add relevant keywords to help researchers discover your dataset (e.g., diabetes, heart rate, medication).
                  </HelpText>
                  {errors.tags && (
                    <ErrorMessage>
                      <FaExclamationCircle /> {errors.tags}
                    </ErrorMessage>
                  )}
                </FormGroup>
              </FormSection>
              
              <NavigationButtons>
                <BackButton onClick={prevStep}>
                  Back: Upload Files
                </BackButton>
                <NextButton onClick={nextStep}>
                  Next: Pricing & Consent
                </NextButton>
              </NavigationButtons>
            </FormContainer>
          )}
          
          {step === 3 && (
            <FormContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FormSection>
                <SectionTitle>
                  <FaMoneyBillWave /> Pricing
                </SectionTitle>
                
                <FormGroup>
                  <Label htmlFor="price">Dataset Price</Label>
                  <PriceInput>
                    <Input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0.01"
                      placeholder="0.05"
                    />
                    <span>ETH</span>
                  </PriceInput>
                  <HelpText>
                    Set a competitive price for your dataset. Most health datasets range from 0.01 to 0.1 ETH.
                  </HelpText>
                  {errors.price && (
                    <ErrorMessage>
                      <FaExclamationCircle /> {errors.price}
                    </ErrorMessage>
                  )}
                </FormGroup>
              </FormSection>
              
              <FormSection>
                <SectionTitle>
                  <FaLock /> Anonymization Level
                </SectionTitle>
                
                <RadioGroup>
                  <RadioLabel 
                    checked={formData.anonymizationLevel === 'high'}
                    onClick={() => handleInputChange({ target: { name: 'anonymizationLevel', value: 'high' } })}
                  >
                    <RadioButton checked={formData.anonymizationLevel === 'high'}>
                      <FaCircle />
                    </RadioButton>
                    <RadioText>High Anonymization</RadioText>
                  </RadioLabel>
                  
                  <RadioLabel 
                    checked={formData.anonymizationLevel === 'medium'}
                    onClick={() => handleInputChange({ target: { name: 'anonymizationLevel', value: 'medium' } })}
                  >
                    <RadioButton checked={formData.anonymizationLevel === 'medium'}>
                      <FaCircle />
                    </RadioButton>
                    <RadioText>Medium Anonymization</RadioText>
                  </RadioLabel>
                  
                  <RadioLabel 
                    checked={formData.anonymizationLevel === 'custom'}
                    onClick={() => handleInputChange({ target: { name: 'anonymizationLevel', value: 'custom' } })}
                  >
                    <RadioButton checked={formData.anonymizationLevel === 'custom'}>
                      <FaCircle />
                    </RadioButton>
                    <RadioText>Custom Settings</RadioText>
                  </RadioLabel>
                </RadioGroup>
                
                <HelpText>
                  <strong>High:</strong> All direct identifiers removed, dates shifted, locations generalized to region level.<br />
                  <strong>Medium:</strong> Direct identifiers removed, dates preserved, locations generalized to city level.<br />
                  <strong>Custom:</strong> Configure specific anonymization parameters for your dataset.
                </HelpText>
              </FormSection>
              
              <FormSection>
                <SectionTitle>
                  <FaShieldAlt /> Consent Options
                </SectionTitle>
                
                <FormGroup>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      name="consentOptions.research"
                      checked={formData.consentOptions.research}
                      onChange={handleInputChange}
                    />
                    <span>Allow use for academic and medical research purposes</span>
                  </CheckboxLabel>
                </FormGroup>
                
                <FormGroup>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      name="consentOptions.commercial"
                      checked={formData.consentOptions.commercial}
                      onChange={handleInputChange}
                    />
                    <span>Allow use for commercial research and product development</span>
                  </CheckboxLabel>
                </FormGroup>
                
                <FormGroup>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      name="consentOptions.timeLimit"
                      checked={formData.consentOptions.timeLimit}
                      onChange={handleInputChange}
                    />
                    <span>Set a 12-month time limit on data usage after purchase</span>
                  </CheckboxLabel>
                </FormGroup>
                
                <FormGroup>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      name="consentOptions.revoke"
                      checked={formData.consentOptions.revoke}
                      onChange={handleInputChange}
                    />
                    <span>Retain the right to revoke access in the future (with blockchain record)</span>
                  </CheckboxLabel>
                </FormGroup>
              </FormSection>
              
              <FormSection>
                <FormGroup>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                    />
                    <span>
                      I confirm that I have the right to share this health data, it has been properly anonymized according to the selected level, and I agree to the <Link to="#" style={{ color: 'var(--color-primary)' }}>Terms of Service</Link> and <Link to="#" style={{ color: 'var(--color-primary)' }}>Data Contributor Agreement</Link>.
                    </span>
                  </CheckboxLabel>
                  {errors.agreeToTerms && (
                    <ErrorMessage>
                      <FaExclamationCircle /> {errors.agreeToTerms}
                    </ErrorMessage>
                  )}
                </FormGroup>
              </FormSection>
              
              <NavigationButtons>
                <BackButton onClick={prevStep}>
                  Back: Dataset Details
                </BackButton>
                <NextButton onClick={nextStep}>
                  Upload Dataset
                </NextButton>
              </NavigationButtons>
            </FormContainer>
          )}
        </UploadContent>
      </UploadContainer>
    );
  }
  
  // Show the completed screen
  return (
    <UploadContainer>
      <UploadContent>
        <SuccessContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SuccessIcon>
            <FaCheckCircle />
          </SuccessIcon>
          <SuccessTitle>Dataset Successfully Uploaded!</SuccessTitle>
          <SuccessDescription>
            Your dataset "{formData.name}" has been uploaded to the blockchain and is now being processed. Once verification is complete, it will be available in the marketplace for researchers to discover and purchase.
          </SuccessDescription>
          <SuccessButtons>
            <SuccessButton primary onClick={goToDashboard}>
              Go to Dashboard
            </SuccessButton>
            <SuccessButton onClick={uploadAnother}>
              Upload Another Dataset
            </SuccessButton>
          </SuccessButtons>
        </SuccessContainer>
      </UploadContent>
    </UploadContainer>
  );
}

export default UploadData;