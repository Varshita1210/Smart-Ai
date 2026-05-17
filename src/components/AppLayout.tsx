import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Page } from '../types';

interface AppLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: Page) => void;
}

export default function AppLayout({ children, currentPage, onNavigate }: AppLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={onNavigate} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />
      <div className="flex-1 overflow-hidden relative flex flex-col">
        {children}
      </div>
    </div>
  );
}
