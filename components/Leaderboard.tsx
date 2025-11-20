import React from 'react';
import { User } from '../types';
import { Flame, Trophy, Medal, Crown, TrendingUp, PawPrint, Star, Zap, Shield } from 'lucide-react';

interface LeaderboardProps {
  users: User[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  const topThree = sortedUsers.slice(0, 3);
  const rest = sortedUsers.slice(3);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="font-mono text-vulhub-muted">#{rank}</span>;
  };

  // Helper to render the complex styled cards for Top 3
  const renderPodiumCard = (user: User, rank: 1 | 2 | 3) => {
    const isFirst = rank === 1;
    const isSecond = rank === 2;
    const isThird = rank === 3;

    // Configuration for each Rank Tier
    const config = {
      1: {
        border: 'border-yellow-500/50',
        bg: 'bg-gradient-to-b from-yellow-900/40 via-black to-black',
        shadow: 'shadow-[0_0_50px_rgba(234,179,8,0.3)]',
        textGradient: 'bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600',
        icon: <Crown className="w-8 h-8 text-yellow-400 fill-yellow-400/20 animate-bounce" />,
        accent: 'text-yellow-400',
        ring: 'border-yellow-400',
        height: 'h-[420px]',
        order: 'order-1 md:order-2',
        transform: 'md:-translate-y-8 scale-110 z-20',
        label: 'ALPHA COYOTE',
        glowColor: 'rgba(234,179,8,0.5)',
      },
      2: {
        border: 'border-slate-400/50',
        bg: 'bg-gradient-to-b from-slate-800/40 via-black to-black',
        shadow: 'shadow-[0_0_30px_rgba(148,163,184,0.2)]',
        textGradient: 'bg-gradient-to-b from-white via-slate-300 to-slate-500',
        icon: <Shield className="w-6 h-6 text-slate-300 fill-slate-300/20" />,
        accent: 'text-slate-300',
        ring: 'border-slate-300',
        height: 'h-[360px]',
        order: 'order-2 md:order-1',
        transform: 'z-10',
        label: 'BETA',
        glowColor: 'rgba(203,213,225,0.5)',
      },
      3: {
        border: 'border-orange-700/50',
        bg: 'bg-gradient-to-b from-orange-900/40 via-black to-black',
        shadow: 'shadow-[0_0_30px_rgba(194,65,12,0.2)]',
        textGradient: 'bg-gradient-to-b from-orange-200 via-orange-500 to-orange-800',
        icon: <Shield className="w-6 h-6 text-orange-500 fill-orange-500/20" />,
        accent: 'text-orange-500',
        ring: 'border-orange-600',
        height: 'h-[340px]',
        order: 'order-3',
        transform: 'z-10',
        label: 'GAMMA',
        glowColor: 'rgba(249,115,22,0.5)',
      }
    }[rank];

    return (
      <div className={`${config.order} ${config.transform} relative group perspective-1000`}>
        {/* Ambient Glow Behind */}
        <div className="absolute inset-0 blur-3xl opacity-20 rounded-full pointer-events-none" style={{ backgroundColor: config.accent.split('-')[1] }}></div>
        
        {/* Main Card */}
        <div className={`
          relative flex flex-col items-center justify-end ${config.height} w-full 
          rounded-2xl border ${config.border} ${config.bg} ${config.shadow}
          backdrop-blur-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_${config.glowColor}]
        `}>
            
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_0%,currentColor,transparent_70%)] text-white pointer-events-none"></div>
            {isFirst && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-yellow-400/5 to-transparent animate-pulse"></div>}
            
            {/* Rank Badge (Top Corner) */}
            <div className="absolute top-4 right-4 font-cyber text-4xl font-bold opacity-10 select-none">#{rank}</div>

            {/* Avatar Section */}
            <div className="relative mb-6">
                {/* Rank Icon Floating */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
                    {config.icon}
                </div>

                {/* Avatar Image with Ring */}
                <div className={`relative p-1 rounded-full border-2 border-dashed ${config.ring} ${isFirst ? 'animate-spin-slow' : ''}`}>
                    <img 
                        src={user.avatarUrl} 
                        alt={user.username} 
                        className={`rounded-full object-cover ${isFirst ? 'w-28 h-28' : 'w-20 h-20'} border-4 border-black shadow-2xl`}
                    />
                    {/* Level Tag */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black border border-vulhub-border px-3 py-0.5 rounded-full whitespace-nowrap">
                        <span className={`text-[10px] font-bold tracking-wider uppercase ${config.accent}`}>
                           Lvl. {user.level}
                        </span>
                    </div>
                </div>
            </div>

            {/* User Info */}
            <div className="text-center w-full pb-8 px-4 relative z-10">
                
                {/* Username with Special Effects */}
                <h3 className={`
                    font-cyber font-black tracking-wide mb-1 drop-shadow-lg
                    ${isFirst ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}
                `}>
                    <span className={`bg-clip-text text-transparent ${config.textGradient}`}>
                        {user.username}
                    </span>
                </h3>

                {/* Rank Label */}
                <p className={`text-[10px] font-bold tracking-[0.4em] uppercase mb-4 ${config.accent} opacity-80`}>
                    {config.label}
                </p>

                {/* Points Display */}
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className={`h-px w-8 bg-gradient-to-r from-transparent to-${config.accent.split('-')[1]}-500`}></div>
                    <p className={`font-mono font-bold ${isFirst ? 'text-2xl' : 'text-xl'} text-white`}>
                        {user.points.toLocaleString()}
                    </p>
                    <div className={`h-px w-8 bg-gradient-to-l from-transparent to-${config.accent.split('-')[1]}-500`}></div>
                </div>

                {/* Streak */}
                {user.streak > 0 && (
                    <div className="flex items-center justify-center gap-1.5">
                        <Flame className={`w-3 h-3 ${isFirst ? 'text-orange-500 animate-pulse' : 'text-vulhub-muted'}`} fill="currentColor" />
                        <span className="text-xs font-mono text-vulhub-muted">{user.streak} Day Streak</span>
                    </div>
                )}
            </div>

            {/* Bottom Shine Line */}
            <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${config.accent.split('-')[1]}-500 to-transparent opacity-50`}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-20 md:pb-0 animate-matrix-fade">
      <div className="text-center mb-12 relative">
         {/* Decorative Background Lines */}
         <div className="absolute top-1/2 w-full h-px bg-gradient-to-r from-transparent via-vulhub-border to-transparent -z-10"></div>
         
         <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-4 bg-[#0a0a0a] inline-flex px-8">
           <PawPrint className="w-8 h-8 text-vulhub-primary animate-pulse" />
           <span className="font-cyber tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-vulhub-primary to-white">
              LEADERBOARD
           </span>
           <PawPrint className="w-8 h-8 text-vulhub-primary animate-pulse transform scale-x-[-1]" />
        </h2>
        <p className="text-vulhub-muted font-mono text-xs tracking-[0.2em] uppercase">
           Elite Operatives & Top Contributors
        </p>
      </div>

      {/* --- TOP 3 PODIUM --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-16 items-end max-w-5xl mx-auto px-4">
        {topThree[1] && renderPodiumCard(topThree[1], 2)}
        {topThree[0] && renderPodiumCard(topThree[0], 1)}
        {topThree[2] && renderPodiumCard(topThree[2], 3)}
      </div>

      {/* --- LIST VIEW (Rank 4+) --- */}
      <div className="bg-vulhub-card border border-vulhub-border rounded-2xl overflow-hidden shadow-2xl max-w-6xl mx-auto">
        <div className="grid grid-cols-12 gap-4 p-4 bg-black/40 border-b border-vulhub-border text-vulhub-muted text-xs uppercase tracking-wider font-bold">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5 md:col-span-4">Operative</div>
          <div className="col-span-3 md:col-span-2 text-center">Streak</div>
          <div className="col-span-3 md:col-span-2 text-right">Score</div>
          <div className="hidden md:block col-span-3">Trajectory</div>
        </div>
        
        <div className="divide-y divide-vulhub-border/50">
          {rest.map((user, index) => (
            <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors group">
              <div className="col-span-1 flex justify-center">
                <span className="font-mono text-gray-500 group-hover:text-white transition-colors">{user.rank}</span>
              </div>
              
              <div className="col-span-5 md:col-span-4 flex items-center gap-4">
                <div className="relative">
                    <img src={user.avatarUrl} alt={user.username} className="w-10 h-10 rounded-full border border-vulhub-border group-hover:border-vulhub-primary transition-colors" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-black rounded-full flex items-center justify-center border border-vulhub-border">
                         <div className={`w-2 h-2 rounded-full ${user.streak > 3 ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-300 group-hover:text-white transition-colors">{user.username}</span>
                  <span className="text-[10px] text-vulhub-muted uppercase tracking-wider">{user.level}</span>
                </div>
              </div>
              
              <div className="col-span-3 md:col-span-2 flex justify-center items-center gap-1">
                {user.streak > 0 ? (
                  <>
                    <Zap className={`w-3 h-3 ${user.streak > 5 ? 'text-yellow-500 fill-current' : 'text-gray-600'}`} />
                    <span className={`font-mono ${user.streak > 5 ? 'text-yellow-500' : 'text-gray-600'}`}>{user.streak}</span>
                  </>
                ) : (
                  <span className="text-vulhub-muted">-</span>
                )}
              </div>
              
              <div className="col-span-3 md:col-span-2 text-right font-mono text-vulhub-primary font-bold">
                {user.points.toLocaleString()}
              </div>
              
              <div className="hidden md:block col-span-3">
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-black rounded-full overflow-hidden border border-white/10">
                        <div 
                            className="h-full bg-gradient-to-r from-vulhub-secondary to-vulhub-primary rounded-full relative"
                            style={{ width: `${(user.points / topThree[0].points) * 100}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20"></div>
                        </div>
                    </div>
                    {/* Random trend indicator for visual flair */}
                    <TrendingUp className={`w-3 h-3 ${index % 3 === 0 ? 'text-green-500' : 'text-gray-600'}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};