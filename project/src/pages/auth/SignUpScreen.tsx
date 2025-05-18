import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { PasswordStrengthMeter } from '../../components/ui/ProgressIndicators';
import { COLORS } from '../../theme';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

const SignUpScreen: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState<string | null>(null);
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

  const handleSubmit = async (values: { name: string; email: string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      setSignupError(null);
      await signup(values.email, values.password, values.name);
      navigate('/child-info');
    } catch (error) {
      setSignupError('An error occurred during signup. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className={`font-medium text-[${COLORS.primary}] hover:text-blue-500`}>
              Sign in
            </Link>
          </p>
        </div>
        
        {signupError && (
          <div className={`p-4 rounded-md bg-red-50 border border-red-200 text-[${COLORS.error}]`}>
            {signupError}
          </div>
        )}
        
        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
                <Input
                  name="name"
                  label="Full Name"
                  placeholder="John Doe"
                  required
                />
                
                <Input
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="your@email.com"
                  required
                />
                
                <div>
                  <Input
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    required
                    onChange={handlePasswordChange}
                  />
                  <PasswordStrengthMeter strength={passwordStrength} className="mt-2" />
                </div>
                
                <Input
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{' '}
                  <a href="#" className={`font-medium text-[${COLORS.primary}] hover:text-blue-500`}>
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className={`font-medium text-[${COLORS.primary}] hover:text-blue-500`}>
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isSubmitting}
              >
                Create Account
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpScreen;