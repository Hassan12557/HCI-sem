import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { PasswordStrengthMeter } from '../../components/ui/ProgressIndicators';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
});

const PasswordScreen: React.FC = () => {
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState<'none' | 'weak' | 'medium' | 'strong'>('none');
  
  const calculatePasswordStrength = (password: string) => {
    if (!password) return 'none';
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Character variety check
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    
    if (strength < 3) return 'weak';
    if (strength < 5) return 'medium';
    return 'strong';
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordStrength(calculatePasswordStrength(password));
  };
  
  const handleSubmit = async (values: { currentPassword: string; newPassword: string }, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void, resetForm: () => void }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Password updated successfully!');
      setSubmitting(false);
      resetForm();
      setPasswordStrength('none');
      
      // Navigate back after a short delay
      setTimeout(() => {
        navigate('/settings');
      }, 2000);
    } catch (error) {
      toast.error('Failed to update password. Please try again.');
      setSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="bg-white rounded-xl p-6 shadow-md mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Change Password</h1>
            <p className="text-gray-600 mt-1">Update your account password</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Lock size={32} className="text-blue-600" />
          </div>
        </div>
        
        <Formik
          initialValues={{ 
            currentPassword: '', 
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={PasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="space-y-4">
                <Input
                  name="currentPassword"
                  type="password"
                  label="Current Password"
                  placeholder="••••••••"
                  required
                />
                
                <div>
                  <Input
                    name="newPassword"
                    type="password"
                    label="New Password"
                    placeholder="••••••••"
                    required
                    onChange={handlePasswordChange}
                  />
                  <PasswordStrengthMeter strength={passwordStrength} className="mt-2" />
                </div>
                
                <Input
                  name="confirmPassword"
                  type="password"
                  label="Confirm New Password"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="mt-6 space-y-4">
                <p className="text-sm text-gray-600">
                  Your password should:
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>Be at least 8 characters long</li>
                  <li>Include at least one uppercase letter</li>
                  <li>Include at least one lowercase letter</li>
                  <li>Include at least one number</li>
                </ul>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  Update Password
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PasswordScreen;