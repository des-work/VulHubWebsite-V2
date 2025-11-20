import React from 'react';
import { NavView, User, UserRole } from '../types';
import { Trophy, Terminal, Medal, ShieldAlert, User as UserIcon, LogOut } from 'lucide-react';

interface NavigationProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  currentUser: User;
  onSignOut: () => void;
}

// Custom Coyote Icon for Navigation
const CoyoteLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20,80 L40,60 L60,80 L50,90 L30,90 Z" fill="#000" />
    <path d="M30,90 L20,80 L20,50 L40,30 L60,10 L80,30 L80,60 L60,80 L50,90 L30,90" fill="#00b5e2" />
    <path d="M60,10 L65,25 L55,25 Z" fill="#fff" />
    <path d="M45,40 L55,40 L50,50 Z" fill="#000" opacity="0.5" />
    <circle cx="65" cy="35" r="3" fill="#fff" />
  </svg>
);

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, currentUser, onSignOut }) => {
  const navItems = [
    { view: NavView.LEADERBOARD, icon: <Trophy className="w-5 h-5" />, label: 'Leaderboard' },
    { view: NavView.FORUM, icon: <Terminal className="w-5 h-5" />, label: 'Forum' },
    { view: NavView.BADGES, icon: <Medal className="w-5 h-5" />, label: 'Badges' },
    // Only show grading to admins/instructors
    ...((currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.INSTRUCTOR) ? [
      { view: NavView.GRADING, icon: <ShieldAlert className="w-5 h-5" />, label: 'Grading' }
    ] : []),
    { view: NavView.PROFILE, icon: <UserIcon className="w-5 h-5" />, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto z-50 bg-vulhub-card/95 backdrop-blur-xl border-t md:border-t-0 md:border-b border-vulhub-border shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Brand Section - Visible on Mobile now */}
          <div className="flex items-center gap-3 md:gap-4">
             <div className="bg-gradient-to-br from-vulhub-secondary to-vulhub-primary p-0.5 rounded-xl shadow-[0_0_15px_rgba(0,181,226,0.3)] flex items-center justify-center w-10 h-10 md:w-12 md:h-12 overflow-hidden shrink-0">
                <div className="bg-black w-full h-full rounded-[10px] flex items-center justify-center p-1">
                  <CoyoteLogo />
                </div>
             </div>
             <div className="flex flex-col justify-center">
                <span className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-vulhub-primary to-white font-cyber tracking-wide leading-none mb-1">
                  VulHub
                </span>
                <span className="text-[9px] md:text-[10px] text-vulhub-muted leading-none tracking-[0.2em] uppercase font-bold">CSUSB COYOTES</span>
             </div>
          </div>
          
          {/* Navigation Items */}
          <div className="flex justify-end items-center w-auto gap-1 md:gap-2">
            <div className="flex bg-black/20 p-1 rounded-lg border border-white/5 backdrop-blur-sm">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => onNavigate(item.view)}
                  className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 rounded-md transition-all duration-200 ${
                    currentView === item.view
                      ? 'text-vulhub-primary bg-vulhub-primary/10 shadow-[0_0_10px_rgba(0,181,226,0.1)] border border-vulhub-primary/20'
                      : 'text-vulhub-muted hover:text-vulhub-text hover:bg-white/5'
                  }`}
                  title={item.label}
                >
                  {item.icon}
                  <span className="text-[10px] md:text-sm font-bold md:font-medium hidden md:block">{item.label}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={onSignOut}
              className="flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-md text-vulhub-muted hover:text-red-400 hover:bg-red-900/10 transition-all duration-200 ml-1 md:ml-4 border-l border-vulhub-border pl-2 md:pl-6"
              title="Sign Out"
            >
               <LogOut className="w-5 h-5" />
               <span className="text-xs md:text-sm font-medium hidden md:block">Exit</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};