import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Baby } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ChildInfoSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Child\'s name is required'),
  grade: Yup.string()
    .required('Grade is required'),
  school: Yup.string()
    .required('School name is required'),
});

const ChildInfoScreen: React.FC = () => {
  const { setChildInfo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: { name: string; grade: string; school: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      setChildInfo({
        id: '1', // In a real app, this would come from the backend
        name: values.name,
        grade: values.grade,
        school: values.school,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving child info:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Baby className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Tell us about your child</h2>
          <p className="mt-2 text-sm text-gray-600">
            We need this information to personalize your experience
          </p>
        </div>
        
        <Formik
          initialValues={{ name: '', grade: '', school: '' }}
          validationSchema={ChildInfoSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
                <Input
                  name="name"
                  label="Child's Full Name"
                  placeholder="Alex Smith"
                  required
                />
                
                <Input
                  name="grade"
                  label="Grade Level"
                  placeholder="e.g., 8th Grade"
                  required
                />
                
                <Input
                  name="school"
                  label="School Name"
                  placeholder="Lincoln Middle School"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="consent" className="ml-2 block text-sm text-gray-900">
                  I consent to share my child's academic information through this platform
                </label>
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="secondary"
                  fullWidth
                  onClick={() => navigate('/dashboard')}
                >
                  Skip for now
                </Button>
                
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isSubmitting}
                >
                  Continue
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChildInfoScreen;