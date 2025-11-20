import React from 'react';
import { User } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Target, Award, Calendar, Zap } from 'lucide-react';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  // Mock data for charts
  const skillData = [
    { name: 'Web', value: 400 },
    { name: 'Binary', value: 300 },
    { name: 'Crypto', value: 300 },
    { name: 'Network', value: 200 },
  ];
  
  const activityData = [
    { name: 'Mon', points: 20 },
    { name: 'Tue', points: 45 },
    { name: 'Wed', points: 10 },
    { name: 'Thu', points: 80 },
    { name: 'Fri', points: 50 },
    { name: 'Sat', points: 100 },
    { name: 'Sun', points: 30 },
  ];

  // CSUSB Palette: Coyote Blue, Official Blue, Gold/Amber, Dark
  const COLORS = ['#00b5e2', '#005eb8', '#facc15', '#64748b'];

  return (
    <div className="space-y-8 pb-20 animate-matrix-fade">
      {/* Header */}
      <div className="bg-vulhub-card border border-vulhub-border rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-vulhub-primary/20 to-vulhub-secondary/20"></div>
        
        <div className="relative flex flex-col md:flex-row items-end gap-6 pt-10">
            <div className="relative">
                <img src={user.avatarUrl} alt={user.username} className="w-32 h-32 rounded-full border-4 border-vulhub-card shadow-lg" />
                <div className="absolute bottom-0 right-0 bg-vulhub-primary text-black text-xs font-bold px-2 py-1 rounded-full border-2 border-vulhub-card">
                    Lvl. {user.level}
                </div>
            </div>
            <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white">{user.username}</h1>
                <p className="text-vulhub-muted max-w-lg">{user.bio}</p>
            </div>
            <div className="flex gap-4 text-center">
                <div className="bg-black/30 p-3 rounded-lg border border-vulhub-border">
                    <p className="text-xs text-vulhub-muted uppercase">Rank</p>
                    <p className="text-xl font-bold text-white">#{user.rank}</p>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-vulhub-border">
                    <p className="text-xs text-vulhub-muted uppercase">Points</p>
                    <p className="text-xl font-bold text-vulhub-primary">{user.points}</p>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-vulhub-border">
                    <p className="text-xs text-vulhub-muted uppercase">Streak</p>
                    <div className="flex items-center justify-center gap-1">
                        <Zap className="w-4 h-4 text-yellow-400 fill-current" />
                        <p className="text-xl font-bold text-white">{user.streak}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skill Distribution */}
        <div className="bg-vulhub-card border border-vulhub-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-vulhub-primary" /> Skill Matrix
            </h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={skillData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {skillData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', color: '#fff' }} 
                            itemStyle={{ color: '#fff' }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Activity */}
        <div className="bg-vulhub-card border border-vulhub-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-vulhub-secondary" /> Weekly Activity
            </h3>
            <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData}>
                        <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                            contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', color: '#fff' }} 
                        />
                        <Bar dataKey="points" fill="#005eb8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                 </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-vulhub-card border border-vulhub-border rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" /> Recent Badges
        </h3>
        <div className="flex flex-wrap gap-4">
            {user.badges.length > 0 ? user.badges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-3 bg-black/40 p-3 rounded-lg border border-vulhub-border pr-6">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                        <p className="font-bold text-sm text-white">{badge.name}</p>
                        <p className="text-xs text-vulhub-muted">{badge.description}</p>
                    </div>
                </div>
            )) : (
                <p className="text-vulhub-muted italic">No badges earned yet. Go hack something!</p>
            )}
        </div>
      </div>
    </div>
  );
};