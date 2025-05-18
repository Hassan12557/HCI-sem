import React, { useState } from 'react';
import { 
  BarChart3, 
  BookOpen, 
  Calendar, 
  ChevronDown, 
  Clock, 
  FileText, 
  GraduationCap
} from 'lucide-react';
import Card from '../../components/ui/Card';
import { COLORS } from '../../theme';

interface Subject {
  id: number;
  name: string;
  grade: string;
  percentage: number;
  teacher: string;
}

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: 'completed' | 'pending' | 'late';
  score?: string;
}

const PerformanceScreen: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState('Spring 2025');
  const [showTermDropdown, setShowTermDropdown] = useState(false);
  
  // Mock data
  const terms = ['Fall 2024', 'Winter 2024', 'Spring 2025'];
  
  const subjects: Subject[] = [
    { id: 1, name: 'Mathematics', grade: 'A', percentage: 94, teacher: 'Ms. Johnson' },
    { id: 2, name: 'Science', grade: 'A-', percentage: 91, teacher: 'Mr. Williams' },
    { id: 3, name: 'English', grade: 'B+', percentage: 88, teacher: 'Mrs. Davis' },
    { id: 4, name: 'History', grade: 'A', percentage: 95, teacher: 'Mr. Brown' },
    { id: 5, name: 'Art', grade: 'A+', percentage: 98, teacher: 'Ms. Miller' },
    { id: 6, name: 'Physical Education', grade: 'A', percentage: 93, teacher: 'Mr. Wilson' },
  ];
  
  const assignments: Assignment[] = [
    { 
      id: 1, 
      title: 'Quadratic Equations Quiz', 
      subject: 'Mathematics', 
      dueDate: '2025-06-10', 
      status: 'completed',
      score: '92%'
    },
    { 
      id: 2, 
      title: 'Lab Report: Photosynthesis', 
      subject: 'Science', 
      dueDate: '2025-06-18', 
      status: 'pending'
    },
    { 
      id: 3, 
      title: 'Essay: Character Analysis', 
      subject: 'English', 
      dueDate: '2025-06-20', 
      status: 'pending'
    },
    { 
      id: 4, 
      title: 'World War II Timeline', 
      subject: 'History', 
      dueDate: '2025-06-05', 
      status: 'completed',
      score: '95%'
    },
    { 
      id: 5, 
      title: 'Vocabulary Test', 
      subject: 'English', 
      dueDate: '2025-06-01', 
      status: 'completed',
      score: '88%'
    },
  ];
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'late':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusText = (status: Assignment['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'late':
        return 'Late';
      default:
        return status;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header with term selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-xl p-6 shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Academic Performance</h1>
          <p className="text-gray-600 mt-1">View grades, assignments, and progress</p>
        </div>
        
        <div className="mt-4 sm:mt-0 relative">
          <button
            className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setShowTermDropdown(!showTermDropdown)}
          >
            <Calendar size={18} />
            <span>{selectedTerm}</span>
            <ChevronDown size={18} />
          </button>
          
          {showTermDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <ul className="py-1">
                {terms.map((term) => (
                  <li key={term}>
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        term === selectedTerm ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        setSelectedTerm(term);
                        setShowTermDropdown(false);
                      }}
                    >
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* GPA Card */}
      <Card className="p-5">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
            <GraduationCap size={32} className="text-blue-600" />
          </div>
          
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-gray-800">3.8</h2>
            <p className="text-gray-500">Current GPA</p>
          </div>
          
          <div className="flex-1 mt-4 sm:mt-0 sm:ml-6">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-[${COLORS.primary}]`}
                style={{ width: '95%' }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0.0</span>
              <span>4.0</span>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Subjects */}
      <Card title="Subjects" className="p-5">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <BookOpen size={16} className="text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{subject.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-lg font-semibold text-gray-900">{subject.grade}</span>
                    <span className="ml-2 text-sm text-gray-500">({subject.percentage}%)</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                    {subject.teacher}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-[${COLORS.primary}]`}
                        style={{ width: `${subject.percentage}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Recent Assignments */}
      <Card title="Recent Assignments" className="p-5">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <FileText size={16} className="text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{assignment.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                    {assignment.subject}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center text-gray-700">
                      <Clock size={16} className="mr-1" />
                      <span>{formatDate(assignment.dueDate)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(assignment.status)}`}>
                      {getStatusText(assignment.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                    {assignment.score || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <button className={`mt-4 text-sm font-medium text-[${COLORS.primary}] hover:text-blue-700`}>
          View all assignments
        </button>
      </Card>
    </div>
  );
};

export default PerformanceScreen;