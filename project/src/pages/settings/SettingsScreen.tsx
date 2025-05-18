import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Lock, 
  Bell, 
  ChevronRight, 
  LogOut,
  HelpCircle,
  FileText,
  Shield
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Toggle from '../../components/ui/Toggle';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS } from '../../theme';

const SettingsScreen: React.FC = () => {
  const { user, child, logout } = useAuth();
  
  // Mock notification settings
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [gradeAlerts, setGradeAlerts] = React.useState(true);
  const [attendanceAlerts, setAttendanceAlerts] = React.useState(true);
  const [messageAlerts, setMessageAlerts] = React.useState(true);
  
  const handleLogout = () => {
    logout();
    // Navigation is handled in the AuthContext
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and preferences</p>
      </div>
      
      {/* Profile section */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Profile</h2>
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-20 w-20 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
              <User size={32} className="text-blue-600" />
            </div>
          )}
          
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold text-gray-800">{user?.name || 'User'}</h3>
            <p className="text-gray-500">{user?.email || 'email@example.com'}</p>
            
            <div className="mt-3">
              <Link 
                to="/edit-profile" 
                className={`text-sm font-medium text-[${COLORS.primary}] hover:text-blue-700`}
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-md font-semibold text-gray-800 mb-3">Child Information</h3>
          
          <div className="flex items-center">
            {child?.avatar ? (
              <img 
                src={child.avatar} 
                alt={child.name} 
                className="h-12 w-12 rounded-full object-cover mr-4"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <User size={20} className="text-blue-600" />
              </div>
            )}
            
            <div>
              <p className="font-medium text-gray-800">{child?.name || 'Add your child'}</p>
              <p className="text-sm text-gray-500">
                {child ? `${child.grade} • ${child.school}` : 'No child information added yet'}
              </p>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Account settings */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h2>
        
        <div className="space-y-4">
          <Link to="/edit-profile" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <User size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Edit Profile</p>
                <p className="text-sm text-gray-500">Update your personal information</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </Link>
          
          <Link to="/change-password" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Lock size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Change Password</p>
                <p className="text-sm text-gray-500">Update your password</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </Link>
          
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Shield size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Privacy Settings</p>
                <p className="text-sm text-gray-500">Manage your data and privacy</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
      </Card>
      
      {/* Notification settings */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Bell size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
            </div>
            <Toggle isOn={emailNotifications} onChange={setEmailNotifications} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Bell size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Push Notifications</p>
                <p className="text-sm text-gray-500">Receive updates on your device</p>
              </div>
            </div>
            <Toggle isOn={pushNotifications} onChange={setPushNotifications} />
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-md font-semibold text-gray-800 mb-3">Alert Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-700">Grade Updates</p>
                <Toggle isOn={gradeAlerts} onChange={setGradeAlerts} />
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-gray-700">Attendance Alerts</p>
                <Toggle isOn={attendanceAlerts} onChange={setAttendanceAlerts} />
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-gray-700">New Messages</p>
                <Toggle isOn={messageAlerts} onChange={setMessageAlerts} />
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Help and support */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Help & Support</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <HelpCircle size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Help Center</p>
                <p className="text-sm text-gray-500">Get help with using the app</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Terms of Service</p>
                <p className="text-sm text-gray-500">Read our terms and conditions</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Privacy Policy</p>
                <p className="text-sm text-gray-500">Read our privacy policy</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
      </Card>
      
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className={`
          w-full flex items-center justify-center space-x-2 p-4 rounded-lg 
          border border-red-300 text-red-600 hover:bg-red-50 transition-colors
        `}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default SettingsScreen;