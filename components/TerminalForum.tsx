import React, { useState, useRef, useEffect } from 'react';
import { FORUM_POSTS } from '../services/mockData';
import { askAITutor } from '../services/geminiService';
import { ForumPost, Comment } from '../types';
import { 
  Terminal, Cpu, Folder, FileCode, Hash, User, 
  ArrowLeft, MessageSquare, ThumbsUp, Search, 
  Send, ChevronRight, Globe, Lock, Server, Database, 
  CornerUpLeft, X, Zap, Activity, Radio, Wifi 
} from 'lucide-react';

// --- CONFIG & HELPERS ---

const getCategoryColor = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('rce') || cat.includes('critical')) return { 
    text: 'text-red-400', 
    border: 'border-red-500', 
    bg: 'bg-red-500/10', 
    glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    hex: '#ef4444'
  };
  if (cat.includes('web') || cat.includes('cms')) return { 
    text: 'text-orange-400', 
    border: 'border-orange-500', 
    bg: 'bg-orange-500/10', 
    glow: 'shadow-[0_0_15px_rgba(249,115,22,0.3)]',
    hex: '#f97316'
  };
  if (cat.includes('crypto') || cat.includes('database')) return { 
    text: 'text-purple-400', 
    border: 'border-purple-500', 
    bg: 'bg-purple-500/10', 
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    hex: '#a855f7'
  };
  if (cat.includes('network')) return { 
    text: 'text-blue-400', 
    border: 'border-blue-500', 
    bg: 'bg-blue-500/10', 
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    hex: '#3b82f6'
  };
  if (cat.includes('general')) return { 
    text: 'text-cyan-400', 
    border: 'border-cyan-500', 
    bg: 'bg-cyan-500/10', 
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]',
    hex: '#06b6d4'
  };
  return { 
    text: 'text-pink-400', 
    border: 'border-pink-500', 
    bg: 'bg-pink-500/10', 
    glow: 'shadow-[0_0_15px_rgba(236,72,153,0.3)]',
    hex: '#ec4899'
  };
};

const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('rce')) return <Cpu className="w-6 h-6" />;
  if (cat.includes('web')) return <Globe className="w-6 h-6" />;
  if (cat.includes('crypto')) return <Lock className="w-6 h-6" />;
  if (cat.includes('network')) return <Server className="w-6 h-6" />;
  if (cat.includes('database')) return <Database className="w-6 h-6" />;
  return <Folder className="w-6 h-6" />;
};

// --- UI COMPONENTS ---

const TechBorder: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`relative p-[1px] group ${className}`}>
    {/* SVG Border Layer */}
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00b5e2" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#005eb8" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Corners */}
      <path d="M1 20 V10 L10 1 H30" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
      <path d="M1 10 L10 1" fill="none" stroke="#00b5e2" strokeWidth="2" className="opacity-60" />
      
      <path d="M100% 20 V10 Lcalc(100% - 10px) 1 Hcalc(100% - 30px)" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
      
      <path d="M1 calc(100% - 20px) Vcalc(100% - 10px) L10 calc(100% - 1px) H30" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
      
      <path d="M100% calc(100% - 20px) Vcalc(100% - 10px) Lcalc(100% - 10px) calc(100% - 1px) Hcalc(100% - 30px)" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
      <path d="M100% calc(100% - 10px) Lcalc(100% - 10px) calc(100% - 1px)" fill="none" stroke="#00b5e2" strokeWidth="2" className="opacity-60" />
    </svg>
    
    {/* Content Wrapper */}
    <div className="relative bg-[#0a0a0a]/90 backdrop-blur-sm border border-white/5 h-full w-full overflow-hidden" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
       {children}
    </div>
  </div>
);

const HolographicGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
     <div className="absolute inset-0 bg-[linear-gradient(rgba(0,181,226,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,181,226,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)_translateY(-100px)_translateZ(-200px)]"></div>
     <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
  </div>
);

export const TerminalForum: React.FC = () => {
  // Navigation State
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [currentPost, setCurrentPost] = useState<ForumPost | null>(null);
  
  // Data State
  const [posts, setPosts] = useState<ForumPost[]>(FORUM_POSTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');

  // AI State
  const [showAi, setShowAi] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const aiInputRef = useRef<HTMLInputElement>(null);

  // --- Logic ---

  const handleVote = (postId: string, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    setPosts(prev => prev.map(p => 
      p.id === postId ? { ...p, upvotes: p.upvotes + (direction === 'up' ? 1 : -1) } : p
    ));
    if (currentPost?.id === postId) {
      setCurrentPost(prev => prev ? { ...prev, upvotes: prev.upvotes + (direction === 'up' ? 1 : -1) } : null);
    }
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !currentPost) return;

    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: 'you',
      content: replyText,
      timestamp: 'Just now',
      upvotes: 0
    };

    const updatedPost = { ...currentPost, comments: [...currentPost.comments, newComment] };
    setPosts(prev => prev.map(p => p.id === currentPost.id ? updatedPost : p));
    setCurrentPost(updatedPost);
    setReplyText('');
  };

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setIsAiLoading(true);
    setAiResponse(''); 
    try {
      const response = await askAITutor(aiQuery, currentPost ? `Reading post: ${currentPost.title}\nContent: ${currentPost.content}` : undefined);
      setAiResponse(response);
    } catch (error) {
      setAiResponse("Error: Connection to VulBot failed.");
    }
    setIsAiLoading(false);
  };

  const categories = Array.from(new Set(posts.map(p => p.category))) as string[];
  
  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = currentCategory ? p.category === currentCategory : true;
    return matchesSearch && matchesCategory;
  });

  const currentPath = currentPost 
    ? `ROOT/${currentCategory?.toUpperCase()}/${currentPost.id}` 
    : currentCategory 
      ? `ROOT/${currentCategory.toUpperCase()}` 
      : 'ROOT/INDEX';

  return (
    <div className="min-h-screen bg-[#050505] p-2 md:p-6 pb-40 relative font-mono text-gray-300 overflow-x-hidden">
      
      {/* Ambient Atmosphere */}
      <HolographicGrid />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] pointer-events-none z-0"></div>
      
      {/* Main Interface Container */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col min-h-[85vh]">
        
        {/* Top Status HUD */}
        <div className="flex items-center justify-between mb-4 px-2">
           <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-vulhub-primary/60 uppercase">
              <Wifi className="w-3 h-3 animate-pulse" />
              <span>Net_Link: Secure</span>
              <span className="mx-2">|</span>
              <span>Enc: AES-256</span>
           </div>
           <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-vulhub-primary/60 uppercase">
              <span>Sys.Time: {new Date().toLocaleTimeString()}</span>
           </div>
        </div>

        {/* Terminal Window */}
        <TechBorder className="flex-1 shadow-2xl shadow-vulhub-primary/5">
            
            {/* Window Header */}
            <div className="bg-[#111] border-b border-white/10 p-3 flex items-center justify-between sticky top-0 md:top-20 z-30 backdrop-blur-md bg-opacity-90">
                <div className="flex items-center gap-4">
                    {/* Window Controls */}
                    <div className="flex gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
                        <div className="w-2 h-2 rounded-sm bg-red-500"></div>
                        <div className="w-2 h-2 rounded-sm bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-sm bg-green-500"></div>
                    </div>
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs font-bold font-cyber tracking-wider">
                        <span className="text-vulhub-muted">/</span>
                        <span className="text-vulhub-primary drop-shadow-[0_0_5px_rgba(0,181,226,0.5)]">{currentPath}</span>
                        <span className="ml-2 px-1 bg-vulhub-primary/20 text-vulhub-primary text-[9px] rounded animate-pulse">LIVE</span>
                    </div>
                </div>
                
                {/* Search & Tools */}
                <div className="flex items-center gap-3">
                    {!currentPost && (
                        <div className="hidden md:flex items-center relative group">
                            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                                <Search className="w-3 h-3 text-gray-500" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="SEARCH_DB..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-black/50 border border-white/10 rounded-sm pl-8 pr-2 py-1 text-xs focus:border-vulhub-primary focus:outline-none w-48 text-vulhub-primary transition-all focus:w-64 font-mono"
                            />
                        </div>
                    )}
                    <button 
                        onClick={() => setShowAi(!showAi)}
                        className={`
                            flex items-center gap-2 text-[10px] font-bold px-3 py-1.5 border transition-all
                            ${showAi 
                                ? 'bg-vulhub-primary text-black border-vulhub-primary shadow-[0_0_10px_rgba(0,181,226,0.5)]' 
                                : 'bg-transparent text-vulhub-primary border-vulhub-primary/30 hover:bg-vulhub-primary/10'}
                        `}
                        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 10%)' }}
                    >
                        <Cpu className="w-3 h-3" />
                        {showAi ? 'TERM_LINK' : 'INIT_AI'}
                    </button>
                </div>
            </div>

            {/* Content Viewport */}
            <div className="relative p-4 md:p-8 min-h-[600px] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-opacity-5">
               
               {/* --- VIEW: CATEGORY GRID (ROOT) --- */}
               {!currentCategory && !currentPost && (
                 <div className="animate-matrix-fade">
                    <div className="mb-8 border-l-2 border-vulhub-primary pl-4">
                        <h2 className="text-3xl text-white font-cyber tracking-widest mb-1">KNOWLEDGE_BASE</h2>
                        <p className="text-xs text-vulhub-muted font-mono uppercase tracking-wider">Select Data Bank to Access Threads</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((cat, idx) => {
                            const styles = getCategoryColor(cat);
                            const count = posts.filter(p => p.category === cat).length;
                            return (
                                <button 
                                    key={cat}
                                    onClick={() => { setCurrentCategory(cat); setSearchTerm(''); }}
                                    className="relative group text-left h-full"
                                >
                                    {/* Card Frame */}
                                    <div className={`
                                        absolute inset-0 border ${styles.border} opacity-30 group-hover:opacity-100 transition-opacity
                                        bg-gradient-to-br ${styles.bg} to-transparent
                                    `} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}></div>
                                    
                                    {/* Card Content */}
                                    <div className="relative p-6 h-full flex flex-col z-10">
                                        {/* Decor */}
                                        <div className="absolute top-2 right-2 flex gap-1">
                                            <div className={`w-1 h-1 ${styles.bg.replace('bg-', 'bg-opacity-100 bg-')}`}></div>
                                            <div className={`w-1 h-1 ${styles.bg.replace('bg-', 'bg-opacity-50 bg-')}`}></div>
                                            <div className={`w-1 h-1 ${styles.bg.replace('bg-', 'bg-opacity-20 bg-')}`}></div>
                                        </div>

                                        <div className={`mb-4 p-3 rounded-full w-fit bg-black border ${styles.border} ${styles.text} group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                                            {getCategoryIcon(cat)}
                                        </div>

                                        <h3 className={`text-xl font-bold font-cyber tracking-wider text-white group-hover:${styles.text} transition-colors mb-1`}>
                                            {cat}
                                        </h3>
                                        <p className="text-[10px] text-gray-500 font-mono mb-6 uppercase">
                                            // Access Level: Public
                                        </p>

                                        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3">
                                            <div className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-white">
                                                <Database className="w-3 h-3" />
                                                <span>{count} Records</span>
                                            </div>
                                            <ChevronRight className={`w-4 h-4 ${styles.text} group-hover:translate-x-1 transition-transform`} />
                                        </div>

                                        {/* Scanline Effect on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 animate-scanline pointer-events-none" style={{ backgroundSize: '100% 3px' }}></div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                 </div>
               )}

               {/* --- VIEW: THREAD LIST --- */}
               {currentCategory && !currentPost && (
                 <div className="animate-matrix-fade">
                    {/* Header Actions */}
                    <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-4">
                        <button 
                           onClick={() => setCurrentCategory(null)}
                           className="p-2 hover:bg-white/5 rounded-sm border border-transparent hover:border-white/20 transition-all text-vulhub-primary group"
                        >
                           <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                           <h2 className={`text-2xl font-bold font-cyber tracking-wider ${getCategoryColor(currentCategory).text} drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]`}>
                              {currentCategory} // INDEX
                           </h2>
                           <div className="flex gap-4 text-[10px] text-gray-500 font-mono uppercase mt-1">
                              <span>Status: Mounted</span>
                              <span>Files: {filteredPosts.length}</span>
                           </div>
                        </div>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-2 text-[10px] text-vulhub-muted font-mono uppercase tracking-widest border-b border-white/10 opacity-70">
                        <div className="col-span-1">ID_Tag</div>
                        <div className="col-span-7 md:col-span-8">Subject_Matter</div>
                        <div className="col-span-2 md:col-span-1 text-center">Signal</div>
                        <div className="col-span-2 text-right hidden md:block">Origin</div>
                    </div>

                    {/* List Items */}
                    <div className="space-y-1 mt-2">
                        <button 
                            onClick={() => setCurrentCategory(null)}
                            className="w-full grid grid-cols-12 gap-4 px-4 py-3 hover:bg-white/5 text-left text-xs font-mono text-gray-500 hover:text-white transition-colors border-l-2 border-transparent hover:border-white"
                        >
                            <div className="col-span-1"><CornerUpLeft className="w-3 h-3" /></div>
                            <div className="col-span-11">.. [PARENT_DIRECTORY]</div>
                        </button>

                        {filteredPosts.map(post => (
                            <button 
                                key={post.id}
                                onClick={() => setCurrentPost(post)}
                                className={`
                                    w-full grid grid-cols-12 gap-4 px-4 py-3 text-left group relative overflow-hidden
                                    border border-transparent hover:border-white/10 hover:bg-white/5 transition-all
                                `}
                            >
                                {/* Row Hover Glow */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 ${getCategoryColor(post.category).bg}`}></div>

                                <div className="col-span-1 font-mono text-[10px] text-gray-600 group-hover:text-vulhub-primary pt-1">
                                    {post.id.toUpperCase()}
                                </div>
                                <div className="col-span-7 md:col-span-8 relative z-10">
                                    <h4 className="font-bold text-sm text-gray-300 group-hover:text-white truncate pr-4 mb-0.5 font-cyber tracking-wide">
                                        {post.title}
                                    </h4>
                                    <div className="flex gap-2 text-[9px] text-gray-500 uppercase tracking-wider">
                                        <span className="flex items-center gap-1"><Activity className="w-2 h-2" /> {post.timestamp}</span>
                                        <span className="hidden sm:flex items-center gap-1">| <MessageSquare className="w-2 h-2" /> {post.comments.length}</span>
                                    </div>
                                </div>
                                <div className="col-span-2 md:col-span-1 flex justify-center pt-1">
                                    <span className={`text-xs font-mono font-bold ${post.upvotes > 0 ? 'text-green-400' : 'text-gray-600'}`}>
                                        {post.upvotes > 0 ? '+' : ''}{post.upvotes}
                                    </span>
                                </div>
                                <div className="col-span-2 text-right hidden md:block pt-1">
                                    <span className="text-[10px] text-vulhub-primary/70 font-mono">@{post.author}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                 </div>
               )}

               {/* --- VIEW: POST DETAIL --- */}
               {currentPost && (
                 <div className="animate-matrix-fade max-w-5xl mx-auto">
                    
                    {/* Post Control Bar */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                        <button 
                            onClick={() => setCurrentPost(null)}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm text-gray-300 hover:text-white transition-all group"
                        >
                            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> BACK_TO_INDEX
                        </button>
                        <div className={`px-3 py-1 border ${getCategoryColor(currentPost.category).border} ${getCategoryColor(currentPost.category).text} ${getCategoryColor(currentPost.category).bg} text-[10px] font-bold tracking-widest uppercase`}>
                            SEC_LEVEL: {currentPost.category}
                        </div>
                    </div>

                    {/* Main Content Card */}
                    <div className="relative mb-8 group">
                        {/* Tech Borders for Card */}
                        <div className={`absolute -inset-[1px] border-x border-white/10 pointer-events-none`}></div>
                        <div className={`absolute top-0 left-0 w-4 h-4 border-t border-l ${getCategoryColor(currentPost.category).border}`}></div>
                        <div className={`absolute top-0 right-0 w-4 h-4 border-t border-r ${getCategoryColor(currentPost.category).border}`}></div>
                        <div className={`absolute bottom-0 left-0 w-4 h-4 border-b border-l ${getCategoryColor(currentPost.category).border}`}></div>
                        <div className={`absolute bottom-0 right-0 w-4 h-4 border-b border-r ${getCategoryColor(currentPost.category).border}`}></div>

                        <div className="bg-[#0f0f0f]/80 p-6 md:p-10 backdrop-blur-sm relative overflow-hidden">
                            {/* Background Watermark */}
                            <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
                                {getCategoryIcon(currentPost.category)}
                            </div>

                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 font-cyber tracking-wide leading-tight drop-shadow-md">
                                {currentPost.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 md:gap-8 text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-8 border-y border-white/5 py-3">
                                <div className="flex items-center gap-2 text-vulhub-primary">
                                    <User className="w-3 h-3" /> 
                                    <span>OP: {currentPost.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Radio className="w-3 h-3" />
                                    <span>{currentPost.timestamp}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Hash className="w-3 h-3" />
                                    <span>ID: {currentPost.id}</span>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                                {currentPost.content}
                            </div>

                            {/* Tags */}
                            <div className="mt-8 flex gap-2">
                                {currentPost.tags?.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-white/5 text-[9px] text-gray-400 uppercase border border-white/10">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Interaction Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Thread & Comments */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center gap-4 mb-4 pb-2 border-b border-white/10">
                                <div className="flex items-center gap-2 text-sm font-bold text-gray-300">
                                    <MessageSquare className="w-4 h-4 text-vulhub-primary" /> 
                                    <span>TRANSMISSIONS ({currentPost.comments.length})</span>
                                </div>
                                <button 
                                    onClick={(e) => handleVote(currentPost.id, 'up', e)}
                                    className="ml-auto flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-green-500/20 text-xs font-mono text-gray-400 hover:text-green-400 border border-white/10 hover:border-green-500/50 transition-all"
                                >
                                    <ThumbsUp className="w-3 h-3" />
                                    <span>ACKNOWLEDGE ({currentPost.upvotes})</span>
                                </button>
                            </div>

                            <div className="space-y-4">
                                {currentPost.comments.map(comment => (
                                    <div key={comment.id} className="bg-[#111] border-l-2 border-vulhub-primary/30 pl-4 py-2 pr-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={`text-xs font-bold font-mono ${comment.author === 'admin_zero' ? 'text-red-500' : 'text-blue-400'}`}>
                                                {comment.author}
                                            </span>
                                            <span className="text-[9px] text-gray-600 uppercase">{comment.timestamp}</span>
                                        </div>
                                        <p className="text-xs text-gray-300 font-mono leading-relaxed">{comment.content}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Reply Input */}
                            <div className="mt-6 flex gap-2">
                                <div className="relative flex-1">
                                    <div className="absolute -top-2 left-2 bg-[#050505] px-1 text-[9px] text-vulhub-primary uppercase font-bold">
                                        Append_Data
                                    </div>
                                    <textarea 
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className="w-full bg-transparent border border-white/20 p-4 text-sm text-white font-mono focus:border-vulhub-primary focus:outline-none min-h-[80px] bg-[#0a0a0a]"
                                        placeholder="Enter transmission..."
                                    />
                                </div>
                                <button 
                                    onClick={handleReply}
                                    disabled={!replyText.trim()}
                                    className="px-4 border border-vulhub-primary/50 text-vulhub-primary hover:bg-vulhub-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Side Info Panel */}
                        <div className="hidden lg:block space-y-4">
                             <div className="p-4 border border-white/10 bg-white/5 text-[10px] font-mono text-gray-400">
                                <h4 className="text-white font-bold uppercase mb-2 border-b border-white/10 pb-1">Meta_Data</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between"><span>Status:</span> <span className="text-green-500">Open</span></div>
                                    <div className="flex justify-between"><span>Encryption:</span> <span>None</span></div>
                                    <div className="flex justify-between"><span>Nodes:</span> <span>{currentPost.comments.length + 1}</span></div>
                                </div>
                             </div>
                             <div className="p-4 border border-dashed border-white/10 text-center">
                                <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2 opacity-50" />
                                <p className="text-[10px] text-gray-500 uppercase">
                                    Contribution to this thread rewards <span className="text-yellow-500">+5 Rep</span>
                                </p>
                             </div>
                        </div>
                    </div>

                 </div>
               )}

            </div>
        </TechBorder>

      </div>

      {/* --- AI SIDE PANEL (Sliding Drawer) --- */}
      <div className={`
        fixed top-0 right-0 bottom-0 w-full md:w-[400px] bg-[#0a0a0a] border-l border-vulhub-primary/50 z-[60] 
        transform transition-transform duration-500 ease-in-out shadow-[-50px_0_100px_rgba(0,0,0,0.8)]
        ${showAi ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col
      `}>
        <div className="p-4 border-b border-vulhub-primary/30 bg-vulhub-primary/5 flex justify-between items-center">
            <div className="flex items-center gap-2 font-bold text-vulhub-primary font-cyber tracking-wider">
                <Cpu className="w-5 h-5 animate-pulse" /> VULBOT_AI <span className="text-[9px] px-1 bg-vulhub-primary text-black rounded">v2.5</span>
            </div>
            <button onClick={() => setShowAi(false)} className="text-gray-500 hover:text-white hover:rotate-90 transition-all">
                <X className="w-5 h-5" />
            </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto font-mono text-xs space-y-6 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5 pointer-events-none"></div>
            
            <div className="flex gap-3">
                <div className="w-8 h-8 bg-vulhub-primary/20 rounded-sm flex items-center justify-center shrink-0 border border-vulhub-primary/50">
                    <Cpu className="w-4 h-4 text-vulhub-primary" />
                </div>
                <div className="bg-white/5 p-3 border-l-2 border-vulhub-primary text-gray-300">
                    Greetings. I am linked to the VulHub mainframe. Current context: {currentCategory || 'Global'}. Awaiting input.
                </div>
            </div>

            {aiResponse && (
               <div className="flex gap-3 animate-matrix-fade">
                    <div className="w-8 h-8 bg-vulhub-primary/20 rounded-sm flex items-center justify-center shrink-0 border border-vulhub-primary/50">
                        <Cpu className="w-4 h-4 text-vulhub-primary" />
                    </div>
                    <div className="bg-black border border-vulhub-primary/30 p-4 text-cyan-100 shadow-[0_0_20px_rgba(6,182,212,0.1)] whitespace-pre-wrap relative">
                        <div className="absolute -top-2 -left-2 w-2 h-2 border-t border-l border-vulhub-primary"></div>
                        <div className="absolute -bottom-2 -right-2 w-2 h-2 border-b border-r border-vulhub-primary"></div>
                        {aiResponse}
                    </div>
               </div>
            )}

            {isAiLoading && (
               <div className="flex items-center gap-2 text-vulhub-primary opacity-70">
                   <span className="animate-bounce">_</span> Processing Neural Request...
               </div>
            )}
        </div>

        <div className="p-4 border-t border-white/10 bg-[#0e0e0e]">
            <form onSubmit={handleAiAsk} className="relative">
                <input 
                    ref={aiInputRef}
                    type="text" 
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder="INPUT_QUERY..."
                    className="w-full bg-black border border-white/20 pl-4 pr-12 py-3 text-xs text-white focus:border-vulhub-primary focus:outline-none font-mono focus:shadow-[0_0_15px_rgba(0,181,226,0.2)] transition-all"
                />
                <button 
                    type="submit" 
                    disabled={isAiLoading || !aiQuery.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-vulhub-primary/20 text-vulhub-primary hover:bg-vulhub-primary hover:text-black transition-colors disabled:opacity-20"
                >
                    <Send className="w-3 h-3" />
                </button>
            </form>
        </div>
      </div>

    </div>
  );
};