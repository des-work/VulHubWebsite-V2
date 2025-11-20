import React, { useState, useEffect } from 'react';
import { USERS, registerUser } from '../services/mockData';
import { User, UserRole } from '../types';
import { Lock, User as UserIcon, Terminal, PawPrint, ScanLine, Cpu, FileText, UserPlus, LogIn } from 'lucide-react';

interface SignInProps {
  onSignIn: (user: User) => void;
}

export const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Animation states
  const [phase, setPhase] = useState(0); // 0: off, 1: wireframe, 2: content

  // Boot Sequence
  useEffect(() => {
    // Phase 1: CRT Turn On
    setTimeout(() => setPhase(1), 100);
    
    // Phase 2: Wireframe to Solid
    setTimeout(() => setPhase(2), 1200);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay for effect
    setTimeout(() => {
      if (isRegistering) {
        // -- REGISTRATION LOGIC --
        if (!username || !password || !confirmPassword) {
           setError('ERROR: MISSING REQUIRED FIELDS');
           setLoading(false);
           return;
        }
        if (password !== confirmPassword) {
            setError('ERROR: PASSCODE MISMATCH');
            setLoading(false);
            return;
        }
        if (password.length < 4) {
            setError('ERROR: PASSCODE TOO WEAK (MIN 4 CHARS)');
            setLoading(false);
            return;
        }

        const newUser = registerUser(username, bio || 'New Recruit');
        if (newUser) {
            onSignIn(newUser);
        } else {
            setError('ERROR: IDENTITY ALREADY EXISTS');
            setLoading(false);
        }

      } else {
        // -- LOGIN LOGIC --
        const user = USERS.find(u => u.username.toLowerCase() === username.toLowerCase());

        if (user) {
            if (user.role === UserRole.ADMIN) {
            // Admin specific check
            if (password === '0000') {
                onSignIn(user);
            } else {
                setError('ACCESS DENIED: INVALID ADMIN CODE');
                setLoading(false);
            }
            } else {
            // Student/Instructor check (looser for demo)
            if (password.length > 0) {
                onSignIn(user);
            } else {
                setError('ACCESS DENIED: CREDENTIALS REJECTED');
                setLoading(false);
            }
            }
        } else {
            setError('ACCESS DENIED: IDENTITY UNKNOWN');
            setLoading(false);
        }
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* CRT Turn-On Effect Wrapper */}
      <div className={`w-full max-w-xl transition-all duration-1000 ${phase === 0 ? 'opacity-0 scale-y-0' : 'animate-turn-on'}`}>
        
        {/* Ambient Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#001f3f,black)] z-0"></div>
        
        {/* Main Card Container */}
        <div className="relative z-10 perspective-1000">
          
          {/* Holographic/Glass Card */}
          <div className={`
             bg-black/70 backdrop-blur-xl border border-vulhub-primary/30 
             p-8 md:p-12 rounded-3xl shadow-[0_0_60px_rgba(0,181,226,0.15)] 
             relative overflow-hidden group transition-all duration-1000
             ${phase === 1 ? 'opacity-50 scale-95 skew-x-1 blur-[1px] border-dashed' : 'opacity-100 scale-100'}
          `}>
            
            {/* Scanner Line Animation */}
            <div className="absolute left-0 w-full h-[2px] bg-vulhub-primary/80 shadow-[0_0_15px_#00b5e2] animate-scan-vertical z-20 opacity-50 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,181,226,0.05)_50%)] bg-[size:100%_4px] pointer-events-none z-0"></div>

            {/* Phase 2 Content Fade In */}
            <div className={`transition-opacity duration-700 ${phase === 2 ? 'opacity-100' : 'opacity-0'}`}>
                
                {/* Header Section */}
                <div className="relative z-10 flex flex-col items-center pt-4">
                
                    {/* Multi-row Title Display */}
                    <div className="flex flex-col items-center justify-center space-y-2 mb-10 w-full text-center">
                        <h2 className="text-xl md:text-2xl font-bold text-vulhub-primary tracking-[0.6em] font-cyber animate-matrix-fade opacity-0" style={{animationDelay: '0.5s'}}>
                          CSUSB
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-widest font-cyber drop-shadow-[0_0_25px_rgba(0,181,226,0.6)] animate-matrix-fade opacity-0 py-2" style={{animationDelay: '0.7s'}}>
                          VULHUB
                        </h1>
                        <h3 className="text-lg md:text-xl font-bold text-vulhub-muted tracking-[0.4em] uppercase font-cyber animate-matrix-fade opacity-0" style={{animationDelay: '0.9s'}}>
                          Leaderboard
                        </h3>
                    </div>
                    
                    {/* Status Line */}
                    <div className="text-center mb-8 space-y-2 w-full">
                        <div className="h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-vulhub-secondary/50 to-transparent"></div>
                        <p className="text-vulhub-secondary text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
                        {isRegistering ? 'Establish New Connection' : 'Restricted Access // Authorized Only'}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="w-full space-y-6 max-w-sm mx-auto">
                        
                        {/* Username */}
                        <div className="space-y-1.5 relative group/input">
                            <label className="text-[10px] uppercase tracking-widest text-vulhub-primary font-bold ml-1 font-cyber flex items-center gap-2">
                                <ScanLine className="w-3 h-3" /> Coyote ID
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-4 w-4 text-vulhub-muted group-focus-within/input:text-vulhub-primary transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-10 pr-4 py-3.5 bg-black/60 border border-vulhub-border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-vulhub-primary focus:bg-vulhub-primary/5 focus:shadow-[0_0_20px_rgba(0,181,226,0.15)] transition-all font-mono text-sm"
                                    placeholder={isRegistering ? "CHOOSE_HANDLE" : "IDENTIFY_SELF"}
                                    autoFocus={phase === 2}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5 relative group/input">
                            <label className="text-[10px] uppercase tracking-widest text-vulhub-primary font-bold ml-1 font-cyber flex items-center gap-2">
                                <Lock className="w-3 h-3" /> Passcode
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Cpu className="h-4 w-4 text-vulhub-muted group-focus-within/input:text-vulhub-primary transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-4 py-3.5 bg-black/60 border border-vulhub-border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-vulhub-primary focus:bg-vulhub-primary/5 focus:shadow-[0_0_20px_rgba(0,181,226,0.15)] transition-all font-mono text-sm"
                                    placeholder={isRegistering ? "SET_SECRET" : "AUTHENTICATE"}
                                />
                            </div>
                        </div>

                        {/* Registration Fields */}
                        {isRegistering && (
                            <div className="space-y-6 animate-matrix-fade">
                                <div className="space-y-1.5 relative group/input">
                                    <label className="text-[10px] uppercase tracking-widest text-vulhub-primary font-bold ml-1 font-cyber flex items-center gap-2">
                                        <Lock className="w-3 h-3" /> Confirm Passcode
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Cpu className="h-4 w-4 text-vulhub-muted group-focus-within/input:text-vulhub-primary transition-colors" />
                                        </div>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="block w-full pl-10 pr-4 py-3.5 bg-black/60 border border-vulhub-border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-vulhub-primary focus:bg-vulhub-primary/5 focus:shadow-[0_0_20px_rgba(0,181,226,0.15)] transition-all font-mono text-sm"
                                            placeholder="VERIFY_SECRET"
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-1.5 relative group/input">
                                    <label className="text-[10px] uppercase tracking-widest text-vulhub-primary font-bold ml-1 font-cyber flex items-center gap-2">
                                        <FileText className="w-3 h-3" /> Manifesto
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Terminal className="h-4 w-4 text-vulhub-muted group-focus-within/input:text-vulhub-primary transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            className="block w-full pl-10 pr-4 py-3.5 bg-black/60 border border-vulhub-border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-vulhub-primary focus:bg-vulhub-primary/5 focus:shadow-[0_0_20px_rgba(0,181,226,0.15)] transition-all font-mono text-sm"
                                            placeholder="STATE_OBJECTIVE"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-900/20 border-l-4 border-red-500 text-red-400 text-xs p-3 flex items-center gap-2 animate-shake backdrop-blur-md shadow-[0_0_10px_rgba(220,38,38,0.2)]">
                                <Terminal className="w-4 h-4 shrink-0" />
                                <span className="font-mono font-bold tracking-wide">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative overflow-hidden group flex justify-center py-3.5 px-4 border border-vulhub-primary/50 rounded-xl text-sm font-bold text-white bg-vulhub-primary/10 hover:bg-vulhub-primary/20 transition-all font-cyber tracking-widest uppercase shadow-[0_0_10px_rgba(0,181,226,0.1)] hover:shadow-[0_0_25px_rgba(0,181,226,0.4)] mt-4"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {loading ? <span className="animate-pulse">PROCESSING...</span> : (isRegistering ? 'CREATE_IDENTITY' : 'INITIALIZE_SESSION')} 
                                {!loading && <PawPrint className="w-4 h-4" />}
                            </span>
                            {/* Button Hover Fill Effect */}
                            <div className="absolute inset-0 bg-vulhub-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                        </button>
                    </form>

                    {/* Mode Toggle */}
                    <div className="mt-8 w-full border-t border-vulhub-border/50 pt-6 text-center">
                        <button 
                            onClick={() => {
                                setIsRegistering(!isRegistering);
                                setError('');
                                setPassword('');
                                setConfirmPassword('');
                            }}
                            className="text-xs text-vulhub-muted hover:text-vulhub-primary transition-colors font-mono uppercase tracking-wide flex items-center justify-center gap-2 mx-auto group py-2"
                        >
                            {isRegistering ? (
                                <>
                                    <LogIn className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> 
                                    Already have credentials? Authenticate
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    New Recruit? Initialize Protocol
                                </>
                            )}
                        </button>

                        {!isRegistering && (
                            <div className="mt-4 flex flex-wrap justify-center gap-3 text-[10px] opacity-40 hover:opacity-100 transition-opacity duration-300 font-mono">
                                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> SYSTEM: ONLINE</span>
                                <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-vulhub-primary rounded-full"></div> NET: SECURE</span>
                                <span className="flex items-center gap-1 ml-4 text-gray-500">[DEMO: admin_zero / 0000]</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};