import React from 'react';
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  Award, 
  Smile, 
  Meh, 
  Frown,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import Card from '../../components/ui/Card';
import { Sparkline } from '../../components/ui/ProgressIndicators';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS } from '../../theme';

const DashboardScreen: React.FC = () => {
  const { child } = useAuth();
  
  // Mock data
  const attendanceData = [95, 100, 100, 90, 100, 95, 100];
  const gradeData = [85, 88, 92, 90, 94, 91, 95];
  const upcomingAssignments = [
    { id: 1, subject: 'Math', title: 'Quadratic Equations', dueDate: '2025-06-15' },
    { id: 2, subject: 'Science', title: 'Lab Report: Photosynthesis', dueDate: '2025-06-18' },
    { id: 3, subject: 'English', title: 'Essay: Character Analysis', dueDate: '2025-06-20' },
  ];
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's how {child?.name || 'your child'} is doing this week
        </p>
      </div>
      
      {/* Performance summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <Award size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Current GPA</p>
            <p className="text-2xl font-bold text-gray-800">3.8</p>
            <div className="flex items-center text-green-600 text-xs mt-1">
              <TrendingUp size={14} className="mr-1" />
              <span>+0.2 from last term</span>
            </div>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
            <Calendar size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Attendance</p>
            <p className="text-2xl font-bold text-gray-800">97%</p>
            <div className="mt-1">
              <Sparkline data={attendanceData} color={COLORS.success} />
            </div>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
            <BookOpen size={24} className="text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Average Grade</p>
            <p className="text-2xl font-bold text-gray-800">91%</p>
            <div className="mt-1">
              <Sparkline data={gradeData} color={COLORS.primary} />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Mood tracker */}
      <Card title="Today's Mood Check-in" className="p-5">
        <p className="text-gray-600 mb-4">How is your child feeling today?</p>
        <div className="flex justify-around">
          <button className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <Smile size={24} className="text-green-600" />
            </div>
            <span className="text-sm">Great</span>
          </button>
          
          <button className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
              <Meh size={24} className="text-yellow-600" />
            </div>
            <span className="text-sm">Okay</span>
          </button>
          
          <button className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
              <Frown size={24} className="text-red-600" />
            </div>
            <span className="text-sm">Not Good</span>
          </button>
        </div>
      </Card>
      
      {/* Upcoming assignments */}
      <Card title="Upcoming Assignments" className="p-5">
        <div className="divide-y">
          {upcomingAssignments.map((assignment) => (
            <div key={assignment.id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">{assignment.title}</p>
                <p className="text-sm text-gray-500">{assignment.subject}</p>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">Due {formatDate(assignment.dueDate)}</span>
              </div>
            </div>
          ))}
        </div>
        <button className={`mt-4 text-sm font-medium text-[${COLORS.primary}] hover:text-blue-700`}>
          View all assignments
        </button>
      </Card>
    </div>
  );
};

export default DashboardScreen;