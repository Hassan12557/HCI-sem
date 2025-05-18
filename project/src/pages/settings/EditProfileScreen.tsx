import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Upload } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
});

const EditProfileScreen: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSubmit = async (values: { name: string; email: string; phone: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      setIsSaving(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Profile updated successfully!');
      setSubmitting(false);
      setIsSaving(false);
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
      setSubmitting(false);
      setIsSaving(false);
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
            <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
            <p className="text-gray-600 mt-1">Update your personal information</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex flex-col items-center mb-6">
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-24 w-24 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <User size={36} className="text-blue-600" />
            </div>
          )}
          
          <button className="flex items-center text-blue-600 hover:text-blue-700">
            <Upload size={16} className="mr-1" />
            <span>Change Photo</span>
          </button>
        </div>
        
        <Formik
          initialValues={{ 
            name: user?.name || '', 
            email: user?.email || '',
            phone: '',
          }}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, dirty }) => (
            <Form>
              <div className="space-y-4">
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
                
                <Input
                  name="phone"
                  label="Phone Number"
                  placeholder="1234567890"
                  helperText="Used for important notifications only"
                />
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
                  isLoading={isSubmitting || isSaving}
                  disabled={!dirty}
                >
                  Save Changes
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfileScreen;