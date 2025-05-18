import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  LineChart, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS, BREAKPOINTS } from '../../theme';

const MainLayout: React.FC = () => {
  const { user, child, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/performance', label: 'Performance', icon: <LineChart size={20} /> },
    { path: '/messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0
        `}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-5 border-b">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User size={20} className="text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold">{user?.name || 'Parent'}</h2>
                <p className="text-xs text-gray-500">{child?.name || 'Add your child'}</p>
              </div>
            </div>
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={closeSidebar}
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center px-4 py-3 rounded-lg transition-colors
                      ${isActive 
                        ? `bg-blue-50 text-[${COLORS.primary}]` 
                        : 'text-gray-700 hover:bg-gray-100'}
                    `}
                    onClick={closeSidebar}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Logout button */}
          <div className="border-t p-4">
            <button
              className="flex w-full items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              className="text-gray-500 hover:text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <h1 className="text-xl font-semibold text-gray-800 lg:ml-0 ml-4">Parent Portal</h1>
            
            <div className="flex items-center space-x-4">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User size={16} className="text-blue-600" />
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
        
        {/* Mobile bottom navigation */}
        <nav className="lg:hidden bg-white border-t flex items-center justify-around py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center py-2 px-3 rounded-md
                ${isActive 
                  ? `text-[${COLORS.primary}]` 
                  : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MainLayout;