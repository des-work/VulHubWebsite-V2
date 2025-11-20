export enum UserRole {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN'
}

export enum BadgeTier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM'
}

export enum SubmissionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  RETURNED = 'RETURNED'
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  tier: BadgeTier;
  icon: string; // Lucide icon name or emoji
  earnedDate?: string;
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  points: number;
  rank: number;
  streak: number; // Days
  avatarUrl: string;
  badges: Badge[];
  bio: string;
  level: string; // "Novice", "Apprentice", etc.
}

export interface Challenge {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Insane';
  points: number;
  description: string;
}

export interface Submission {
  id: string;
  userId: string;
  challengeId: string;
  challengeTitle: string;
  submittedAt: string;
  status: SubmissionStatus;
  proof: string; // URL or text
  feedback?: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  upvotes: number;
  isAi?: boolean;
}

export interface ForumPost {
  id: string;
  author: string;
  title: string;
  content: string;
  category: string;
  upvotes: number;
  timestamp: string;
  tags: string[];
  comments: Comment[];
}

export enum NavView {
  LEADERBOARD = 'LEADERBOARD',
  FORUM = 'FORUM',
  BADGES = 'BADGES',
  GRADING = 'GRADING',
  PROFILE = 'PROFILE'
}