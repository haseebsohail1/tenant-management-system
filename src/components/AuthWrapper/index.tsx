import React from 'react'
import Sidebar from '../Sidebar';
import AuthNavbar from '../AuthNavbar';

interface WrapperProps {
    children: React.ReactNode;
  }
  
  const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <AuthNavbar />
          <div className="p-6">
              {children}
          </div>
        </div>
      </div>
    );
  };

export default Wrapper