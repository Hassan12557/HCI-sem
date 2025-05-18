import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { COLORS } from '../../theme';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSubmit = async (values: { email: string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      setLoginError(null);
      await login(values.email, values.password);
      navigate('/dashboard');
    } catch (error) {
      setLoginError('Invalid email or password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className={`font-medium text-[${COLORS.primary}] hover:text-blue-500`}>
              create a new account
            </Link>
          </p>
        </div>
        
        {loginError && (
          <div className={`p-4 rounded-md bg-red-50 border border-red-200 text-[${COLORS.error}]`}>
            {loginError}
          </div>
        )}
        
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
                <Input
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="your@email.com"
                  required
                />
                
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className={`font-medium text-[${COLORS.primary}] hover:text-blue-500`}>
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isSubmitting}
              >
                Sign in
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginScreen;