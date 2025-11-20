import React from 'react';
import { Navigation } from './Navigation';
import { NavView, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  currentUser: User;
  onSignOut: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, currentUser, onSignOut }) => {
  return (
    <div className="min-h-screen bg-vulhub-black text-vulhub-text font-sans selection:bg-vulhub-primary/30 selection:text-vulhub-primary">
      <Navigation 
        currentView={currentView} 
        onNavigate={onNavigate} 
        currentUser={currentUser}
        onSignOut={onSignOut} 
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 md:pt-28 md:pb-12">
        {children}
      </main>
    </div>
  );
};