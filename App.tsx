import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Leaderboard } from './components/Leaderboard';
import { TerminalForum } from './components/TerminalForum';
import { BadgeGallery } from './components/BadgeGallery';
import { GradingConsole } from './components/GradingConsole';
import { UserProfile } from './components/UserProfile';
import { SignIn } from './components/SignIn';
import { USERS } from './services/mockData';
import { NavView, User, UserRole } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<NavView>(NavView.LEADERBOARD);

  const handleSignIn = (user: User) => {
    setCurrentUser(user);
    // Reset view to leaderboard on login
    setCurrentView(NavView.LEADERBOARD);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setCurrentView(NavView.LEADERBOARD);
  };

  const renderView = () => {
    if (!currentUser) return null;

    switch (currentView) {
      case NavView.LEADERBOARD:
        return <Leaderboard users={USERS} />;
      case NavView.FORUM:
        return <TerminalForum />;
      case NavView.BADGES:
        return <BadgeGallery userBadges={currentUser.badges} />;
      case NavView.GRADING:
        // Access Control Check
        if (currentUser.role === UserRole.ADMIN || currentUser.role === UserRole.INSTRUCTOR) {
           return <GradingConsole />;
        } else {
           // Fallback if a student tries to access grading
           return (
             <div className="flex flex-col items-center justify-center h-[50vh] text-center animate-pulse">
                <div className="text-red-500 text-6xl mb-4">403</div>
                <h2 className="text-2xl font-bold text-white">ACCESS DENIED</h2>
                <p className="text-vulhub-muted mt-2">Your clearance level is insufficient for this area.</p>
             </div>
           );
        }
      case NavView.PROFILE:
        return <UserProfile user={currentUser} />;
      default:
        return <Leaderboard users={USERS} />;
    }
  };

  // If not signed in, show Sign In page
  if (!currentUser) {
    return <SignIn onSignIn={handleSignIn} />;
  }

  return (
    <Layout 
      currentView={currentView} 
      onNavigate={setCurrentView} 
      currentUser={currentUser}
      onSignOut={handleSignOut}
    >
      {renderView()}
    </Layout>
  );
}

export default App;