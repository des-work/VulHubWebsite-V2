import React from 'react';
import { Badge, BadgeTier } from '../types';
import { Lock, Shield, Star, Zap, Disc, Hexagon } from 'lucide-react';
import { BADGES } from '../services/mockData';

interface BadgeGalleryProps {
  userBadges: Badge[];
}

export const BadgeGallery: React.FC<BadgeGalleryProps> = ({ userBadges }) => {
  const userBadgeIds = new Set(userBadges.map(b => b.id));

  // --- SVG PATTERNS ---
  
  const BronzePattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-20" width="100%" height="100%">
      <defs>
        <pattern id="bronze-gears" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 0L25 5L20 10L15 5Z" fill="currentColor" />
          <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M20 12L20 28M12 20L28 20" stroke="currentColor" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bronze-gears)" />
    </svg>
  );

  const SilverPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-10" width="100%" height="100%">
      <defs>
        <pattern id="silver-circuit" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M0 25H15L20 15L30 35L35 25H50" stroke="currentColor" strokeWidth="1" fill="none" />
          <rect x="18" y="13" width="4" height="4" fill="currentColor" />
          <rect x="28" y="33" width="4" height="4" fill="currentColor" />
          <circle cx="0" cy="0" r="2" fill="currentColor" />
          <circle cx="50" cy="50" r="2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#silver-circuit)" />
    </svg>
  );

  const GoldPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-15" width="100%" height="100%">
      <defs>
        <pattern id="gold-deco" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
           <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="currentColor" strokeWidth="1" />
           <circle cx="30" cy="30" r="10" stroke="currentColor" strokeWidth="1" fill="none"/>
           <path d="M30 10 L30 5 M30 55 L30 50 M10 30 L5 30 M55 30 L50 30" stroke="currentColor" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gold-deco)" />
    </svg>
  );

  const PlatinumPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-20" width="100%" height="100%">
      <defs>
        <pattern id="plat-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
           <path d="M20 0 L0 20" stroke="currentColor" strokeWidth="0.5" />
           <rect x="0" y="0" width="2" height="2" fill="currentColor" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#plat-grid)" />
      <path d="M0 0L100 100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" className="animate-shine" />
    </svg>
  );

  // --- CONFIGURATION ---

  const getTierConfig = (tier: BadgeTier) => {
    switch (tier) {
      case BadgeTier.BRONZE:
        return {
          bg: 'bg-[#1a0f0a]',
          border: 'border-[#8B4513]',
          accent: 'text-[#cd7f32]',
          gradient: 'from-[#5c3a21] to-[#2b170e]',
          shadow: 'shadow-[#cd7f32]/20',
          label: 'OPERATIVE',
          icon: <Hexagon className="w-4 h-4" />,
          Pattern: BronzePattern,
          ringColor: 'border-[#8B4513]',
          textColor: 'text-orange-200',
          shine: 'bg-orange-500/10'
        };
      case BadgeTier.SILVER:
        return {
          bg: 'bg-[#0f172a]',
          border: 'border-[#64748b]',
          accent: 'text-[#e2e8f0]',
          gradient: 'from-[#334155] to-[#0f172a]',
          shadow: 'shadow-[#94a3b8]/20',
          label: 'SPECIALIST',
          icon: <Shield className="w-4 h-4" />,
          Pattern: SilverPattern,
          ringColor: 'border-[#cbd5e1]',
          textColor: 'text-slate-200',
          shine: 'bg-white/10'
        };
      case BadgeTier.GOLD:
        return {
          bg: 'bg-[#2a1a05]',
          border: 'border-[#b45309]',
          accent: 'text-[#facc15]',
          gradient: 'from-[#854d0e] to-[#422006]',
          shadow: 'shadow-[#eab308]/30',
          label: 'MASTER',
          icon: <Star className="w-4 h-4" />,
          Pattern: GoldPattern,
          ringColor: 'border-[#facc15]',
          textColor: 'text-yellow-100',
          shine: 'bg-yellow-400/20'
        };
      case BadgeTier.PLATINUM:
        return {
          bg: 'bg-[#020617]',
          border: 'border-[#00b5e2]',
          accent: 'text-[#00b5e2]',
          gradient: 'from-[#0e7490] to-[#082f49]',
          shadow: 'shadow-[#00b5e2]/40',
          label: 'LEGEND',
          icon: <Zap className="w-4 h-4" />,
          Pattern: PlatinumPattern,
          ringColor: 'border-[#00b5e2]',
          textColor: 'text-cyan-100',
          shine: 'bg-cyan-400/20'
        };
      default: return null; // Should not happen
    }
  };

  return (
    <div className="space-y-12 pb-20 animate-matrix-fade">
      {/* Header */}
      <div className="text-center relative px-4">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-vulhub-border to-transparent -z-10"></div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-2 font-cyber tracking-wider bg-[#0a0a0a] inline-block px-8 py-2 border-y-2 border-vulhub-dark shadow-2xl">
          BADGE ARMORY
        </h2>
        <p className="text-vulhub-muted font-mono text-xs md:text-sm uppercase tracking-[0.4em] mt-4">
          Achievements & Certifications
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto px-6">
        {BADGES.map(badge => {
          const isEarned = userBadgeIds.has(badge.id);
          const config = getTierConfig(badge.tier)!;
          
          return (
            <div 
              key={badge.id}
              className={`
                group relative aspect-[2/3] perspective-1000 transition-all duration-500
                ${isEarned ? 'hover:-translate-y-4 hover:rotate-x-2 z-10 hover:z-50' : 'grayscale opacity-60 hover:opacity-100 hover:grayscale-0'}
              `}
            >
              {/* --- BACK GLOW --- */}
              <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${config.bg === 'bg-[#020617]' ? 'bg-cyan-500' : config.bg.replace('bg-', 'bg-')}`}></div>

              {/* --- CARD BODY --- */}
              <div className={`
                relative h-full w-full rounded-xl overflow-hidden border-4 ${config.border}
                ${config.bg} flex flex-col shadow-2xl
              `}>
                
                {/* Inner Border Frame (Triple Border Effect) */}
                <div className="absolute inset-1 border border-white/10 rounded-lg pointer-events-none z-20"></div>
                <div className="absolute inset-2 border border-black/50 rounded-md pointer-events-none z-20"></div>

                {/* Background Pattern */}
                <div className={`absolute inset-0 ${config.accent} mix-blend-overlay z-0`}>
                   <config.Pattern />
                </div>
                
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.15] pointer-events-none z-0 mix-blend-multiply" 
                     style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
                </div>

                {/* --- CONTENT --- */}
                
                {/* 1. Top Label */}
                <div className="relative z-10 pt-6 flex flex-col items-center">
                   <div className={`
                      px-3 py-1 border-y border-white/20 bg-black/60 backdrop-blur-md w-full text-center
                      text-[10px] font-cyber font-bold tracking-[0.3em] uppercase ${config.accent}
                      shadow-lg
                   `}>
                      {config.label}
                   </div>
                   <div className={`w-px h-4 ${config.accent} opacity-50`}></div>
                </div>

                {/* 2. Center Token */}
                <div className="flex-1 relative z-10 flex items-center justify-center py-2">
                   {/* Outer Ring */}
                   <div className={`
                      relative w-32 h-32 rounded-full border-[6px] ${config.ringColor}
                      bg-black shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_10px_20px_rgba(0,0,0,0.5)]
                      flex items-center justify-center
                      group-hover:shadow-[0_0_30px_currentColor] transition-shadow duration-500 ${config.accent}
                   `}>
                      {/* Rotating Elements */}
                      <div className="absolute inset-0 rounded-full border border-dashed border-white/30 animate-[spin_12s_linear_infinite]" style={{animationPlayState: 'paused'}}></div>
                      
                      {/* Inner Disc */}
                      <div className={`
                         w-24 h-24 rounded-full bg-gradient-to-br ${config.gradient}
                         flex items-center justify-center
                         border border-white/10 shadow-inner
                      `}>
                         {/* The Icon */}
                         <div className={`text-4xl drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300 ${isEarned ? 'text-white' : 'text-gray-400 blur-[1px]'}`}>
                            {badge.icon}
                         </div>
                      </div>

                      {/* Locked State Overlay */}
                      {!isEarned && (
                         <div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center backdrop-blur-[2px]">
                            <Lock className="w-8 h-8 text-gray-500" />
                         </div>
                      )}
                   </div>
                </div>

                {/* 3. Footer Info */}
                <div className="relative z-10 bg-gradient-to-t from-black via-black/90 to-transparent pt-8 pb-6 px-4 text-center">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black p-1 rounded-full border border-white/10">
                      {config.icon}
                   </div>
                   
                   <h3 className={`font-cyber font-bold text-lg uppercase tracking-wide mb-2 leading-none ${isEarned ? 'text-white' : 'text-gray-500'}`}>
                      {badge.name}
                   </h3>
                   
                   <div className="flex items-center justify-center gap-2 opacity-50 mb-2">
                      <div className={`h-px w-8 bg-current ${config.accent}`}></div>
                      <div className={`w-1 h-1 rounded-full bg-current ${config.accent}`}></div>
                      <div className={`h-px w-8 bg-current ${config.accent}`}></div>
                   </div>

                   <p className={`text-[10px] font-mono leading-relaxed ${isEarned ? 'text-gray-400' : 'text-gray-600'}`}>
                      {badge.description}
                   </p>
                </div>
                
                {/* Shine Effect Overlay */}
                {isEarned && (
                   <div className="absolute inset-0 z-30 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
