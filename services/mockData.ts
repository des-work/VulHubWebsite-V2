import { User, UserRole, Badge, BadgeTier, Submission, SubmissionStatus, Challenge, ForumPost } from '../types';

export const BADGES: Badge[] = [
  // --- TIER 1: Getting Started (Bronze) ---
  { id: '1', name: 'Docker Pilot', description: 'Successfully spin up your first VulHub container environment', tier: BadgeTier.BRONZE, icon: '🐳' },
  { id: '7', name: 'First Blood', description: 'Complete your first challenge successfully', tier: BadgeTier.BRONZE, icon: '🩸' },
  { id: '6', name: 'Streak Master', description: '7 day login streak', tier: BadgeTier.BRONZE, icon: '🔥' },
  { id: '8', name: 'Script Kiddie', description: 'Solve 5 challenges', tier: BadgeTier.BRONZE, icon: '👶' },
  { id: '12', name: 'Night Owl', description: 'Submit a flag between 2 AM and 5 AM', tier: BadgeTier.BRONZE, icon: '🦉' },
  { id: '13', name: 'Weekend Warrior', description: 'Solve a challenge on Saturday or Sunday', tier: BadgeTier.BRONZE, icon: '⚔️' },
  { id: '25', name: 'Jenkins Janitor', description: 'Clean up a Jenkins RCE lab', tier: BadgeTier.BRONZE, icon: '🧹' },
  
  // --- TIER 2: Intermediate Skills (Silver) ---
  { id: '2', name: 'Shell Collector', description: 'Achieve Remote Code Execution (RCE) on 3 different targets', tier: BadgeTier.SILVER, icon: '🐚' },
  { id: '4', name: 'Legacy Hunter', description: 'Exploit historic vulnerabilities (Heartbleed, Shellshock)', tier: BadgeTier.SILVER, icon: '🦕' },
  { id: '9', name: 'Bug Bounty Hunter', description: 'Solve 15 challenges', tier: BadgeTier.SILVER, icon: '💰' },
  { id: '14', name: 'Community Pillar', description: 'Receive 10 upvotes on forum posts', tier: BadgeTier.SILVER, icon: '🏛️' },
  { id: '16', name: 'SQLi Master', description: 'Compromise 5 databases via Injection', tier: BadgeTier.SILVER, icon: '💉' },
  { id: '17', name: 'XSS Assassin', description: 'Execute 5 Cross-Site Scripting payloads', tier: BadgeTier.SILVER, icon: '🎭' },
  { id: '19', name: 'Heartbreaker', description: 'Exploit OpenSSL Heartbleed (CVE-2014-0160)', tier: BadgeTier.SILVER, icon: '💔' },
  { id: '20', name: 'Shellshocked', description: 'Exploit Bash Shellshock (CVE-2014-6271)', tier: BadgeTier.SILVER, icon: '⚡' },
  { id: '23', name: 'Ghostbuster', description: 'Exploit GhostScript vulnerabilities', tier: BadgeTier.SILVER, icon: '👻' },
  { id: '24', name: 'Magician', description: 'Exploit ImageMagick (ImageTragick)', tier: BadgeTier.SILVER, icon: '🎩' },
  { id: '27', name: 'ThinkPHP Thinker', description: 'Exploit ThinkPHP 5.x RCE', tier: BadgeTier.SILVER, icon: '🤔' },
  { id: '30', name: 'Struts Structurer', description: 'Exploit Apache Struts S2-045', tier: BadgeTier.SILVER, icon: '🏗️' },
  { id: '31', name: 'Drupal Destroyer', description: 'Exploit Drupalgeddon2', tier: BadgeTier.SILVER, icon: '💧' },

  // --- TIER 3: Advanced Exploitation (Gold) ---
  { id: '3', name: 'Log4Shell Survivor', description: 'Successfully exploit CVE-2021-44228 (Apache Log4j2)', tier: BadgeTier.GOLD, icon: '🪵' },
  { id: '10', name: 'Red Team Operator', description: 'Solve 30 challenges', tier: BadgeTier.GOLD, icon: '🔴' },
  { id: '15', name: 'Forum Guru', description: 'Receive 50 upvotes on forum posts', tier: BadgeTier.GOLD, icon: '🧘' },
  { id: '18', name: 'SSRF Surfer', description: 'Pivot through 3 internal networks via SSRF', tier: BadgeTier.GOLD, icon: '🏄' },
  { id: '21', name: 'Dirty COWboy', description: 'Escalate privileges via Dirty COW (CVE-2016-5195)', tier: BadgeTier.GOLD, icon: '🤠' },
  { id: '26', name: 'GitLab Guru', description: 'Exploit GitLab RCE', tier: BadgeTier.GOLD, icon: '🦊' },
  { id: '29', name: 'Fastjson Furious', description: 'Exploit Fastjson deserialization', tier: BadgeTier.GOLD, icon: '🚗' },
  { id: '32', name: 'Spring Sprinter', description: 'Exploit Spring4Shell in under 10 minutes', tier: BadgeTier.GOLD, icon: '🌱' },
  { id: '34', name: 'Root Cause', description: 'Provide a detailed root cause analysis in submission', tier: BadgeTier.GOLD, icon: '🌳' },

  // --- TIER 4: Elite Status (Platinum) ---
  { id: '5', name: 'Java Deserialization Specialist', description: 'Complete WebLogic, JBoss, and Jenkins labs', tier: BadgeTier.PLATINUM, icon: '☕' },
  { id: '11', name: 'The Architect', description: 'Solve 50 challenges', tier: BadgeTier.PLATINUM, icon: '🏗️' },
  { id: '22', name: 'Eternal Blue', description: 'Exploit SMB MS17-010', tier: BadgeTier.PLATINUM, icon: '🟦' },
  { id: '28', name: 'WebLogic Wizard', description: 'Exploit Oracle WebLogic T3 protocol', tier: BadgeTier.PLATINUM, icon: '🧙' },
  { id: '33', name: 'Pentest Pro', description: 'Reach Expert Level (Level 4)', tier: BadgeTier.PLATINUM, icon: '💼' },
];

export const USERS: User[] = [
  {
    id: 'admin1',
    username: 'admin_zero',
    role: UserRole.ADMIN,
    points: 9999,
    rank: 0,
    streak: 999,
    avatarUrl: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=admin_zero',
    badges: [BADGES[4], BADGES[2], BADGES[10], BADGES[33], BADGES[21]], // Architect, Log4Shell, Architect, Pentest Pro, Dirty COW
    bio: 'System Administrator and Lead Instructor. Docker compose up -d is my life.',
    level: 'Grandmaster'
  },
  {
    id: 'u1',
    username: 'cyb3r_n1nja',
    role: UserRole.STUDENT,
    points: 1450,
    rank: 1,
    streak: 12,
    avatarUrl: 'https://picsum.photos/200/200?random=1',
    badges: [BADGES[0], BADGES[1], BADGES[2], BADGES[6], BADGES[16]], // Docker, Shell, Log4j, First Blood, SQLi
    bio: 'Focused on RCEs and Java exploits.',
    level: 'Master'
  },
  {
    id: 'u2',
    username: 'hack_the_planet',
    role: UserRole.STUDENT,
    points: 1180,
    rank: 2,
    streak: 5,
    avatarUrl: 'https://picsum.photos/200/200?random=2',
    badges: [BADGES[0], BADGES[5], BADGES[19]], // Docker, Streak, Shellshocked
    bio: 'Red team enthusiast.',
    level: 'Expert'
  },
  {
    id: 'u3',
    username: 'buffer_overflow',
    role: UserRole.STUDENT,
    points: 950,
    rank: 3,
    streak: 0,
    avatarUrl: 'https://picsum.photos/200/200?random=3',
    badges: [BADGES[0], BADGES[20]], // Docker, Dirty COW
    bio: 'Binary exploitation wizard.',
    level: 'Adept'
  },
  {
    id: 'u4',
    username: 'container_breaker',
    role: UserRole.STUDENT,
    points: 820,
    rank: 4,
    streak: 20,
    avatarUrl: 'https://picsum.photos/200/200?random=4',
    badges: [BADGES[0], BADGES[3], BADGES[25]], // Docker, Legacy, Jenkins
    bio: 'Escaping containers one by one.',
    level: 'Adept'
  },
  {
    id: 'u5',
    username: 'tomcat_cat',
    role: UserRole.STUDENT,
    points: 750,
    rank: 5,
    streak: 2,
    avatarUrl: 'https://picsum.photos/200/200?random=5',
    badges: [BADGES[0], BADGES[7]], // Docker, Script Kiddie
    bio: 'Weak passwords are my favorite exploit.',
    level: 'Apprentice'
  }
];

// Add more dummy users to fill leaderboard
for (let i = 6; i <= 20; i++) {
  USERS.push({
    id: `u${i}`,
    username: `student_${i}`,
    role: UserRole.STUDENT,
    points: Math.floor(700 - i * 20),
    rank: i,
    streak: Math.floor(Math.random() * 10),
    avatarUrl: `https://picsum.photos/200/200?random=${i + 5}`,
    badges: [BADGES[1]], // Everyone gets 'First Blood'
    bio: 'Learning the ropes of VulHub.',
    level: 'Novice'
  });
}

export const registerUser = (username: string, bio: string = 'Recruit'): User | null => {
  if (USERS.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    return null; // User exists
  }
  const newUser: User = {
    id: `u${Date.now()}`,
    username,
    role: UserRole.STUDENT,
    points: 0,
    rank: USERS.length + 1,
    streak: 0,
    avatarUrl: `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${username}`,
    badges: [],
    bio,
    level: 'Novice'
  };
  USERS.push(newUser);
  return newUser;
};


// Based on real VulHub vulnerabilities
export const CHALLENGES: Challenge[] = [
  { 
    id: 'vulhub-log4j', 
    title: 'Apache Log4j2 (CVE-2021-44228)', 
    category: 'RCE / Java', 
    difficulty: 'Hard', 
    points: 300, 
    description: 'Exploit the famous Log4Shell vulnerability by injecting a malicious JNDI LDAP lookup string.' 
  },
  { 
    id: 'vulhub-struts2', 
    title: 'Apache Struts2 S2-045 (CVE-2017-5638)', 
    category: 'RCE', 
    difficulty: 'Medium', 
    points: 200, 
    description: 'Exploit the Jakarta Multipart parser via the Content-Type header to execute arbitrary commands.' 
  },
  { 
    id: 'vulhub-drupal', 
    title: 'Drupalgeddon2 (CVE-2018-7600)', 
    category: 'Web / CMS', 
    difficulty: 'Medium', 
    points: 150, 
    description: 'Leverage a lack of input validation on the Drupal Form API to execute code unauthenticated.' 
  },
  { 
    id: 'vulhub-spring', 
    title: 'Spring4Shell (CVE-2022-22965)', 
    category: 'RCE / Java', 
    difficulty: 'Hard', 
    points: 250, 
    description: 'Exploit class loader manipulation via Data Binding on Spring Framework running on JDK 9+.' 
  },
  { 
    id: 'vulhub-tomcat', 
    title: 'Tomcat Weak Password & WAR Deploy', 
    category: 'Misconfiguration', 
    difficulty: 'Easy', 
    points: 100, 
    description: 'Brute force the Tomcat Manager interface and deploy a malicious WAR file to get a shell.' 
  },
  { 
    id: 'vulhub-redis', 
    title: 'Redis Unauthenticated RCE', 
    category: 'Database', 
    difficulty: 'Medium', 
    points: 150, 
    description: 'Gain RCE by overwriting the authorized_keys file via an exposed, unauthenticated Redis instance.' 
  },
];

export const SUBMISSIONS: Submission[] = [
  { id: 's1', userId: 'u1', challengeId: 'vulhub-log4j', challengeTitle: 'Apache Log4j2 (CVE-2021-44228)', submittedAt: '2023-10-26T10:00:00Z', status: SubmissionStatus.APPROVED, proof: 'Screenshot of Calculator popping up via JNDI injection.' },
  { id: 's2', userId: 'u5', challengeId: 'vulhub-tomcat', challengeTitle: 'Tomcat Weak Password', submittedAt: '2023-10-26T09:30:00Z', status: SubmissionStatus.APPROVED, proof: 'Manager access with admin/admin credential.' },
  { id: 's3', userId: 'u2', challengeId: 'vulhub-spring', challengeTitle: 'Spring4Shell', submittedAt: '2023-10-25T15:00:00Z', status: SubmissionStatus.REJECTED, proof: 'Exploit script failed to verify.', feedback: 'Please demonstrate the actual webshell creation, not just the logs.' },
  { id: 's4', userId: 'u3', challengeId: 'vulhub-struts2', challengeTitle: 'Apache Struts2 S2-045', submittedAt: '2023-10-25T12:00:00Z', status: SubmissionStatus.PENDING, proof: 'Content-Type: %{(#=\'multipart/form-data\')...' },
];

export const FORUM_POSTS: ForumPost[] = [
  { 
    id: 'p1', 
    author: 'cyb3r_n1nja', 
    title: 'Help with JNDIExploit tool for Log4j', 
    content: 'I started the malicious LDAP server but the victim container isn\'t calling back. Do I need to expose port 1389 explicitly in docker-compose? I am running the official vulhub/log4j image.', 
    category: 'RCE', 
    tags: ['log4j', 'docker', 'help'],
    upvotes: 12, 
    timestamp: '2h ago',
    comments: [
      { id: 'c1', author: 'admin_zero', content: 'Yes, if your exploit server is outside the docker network, you need to ensure connectivity. Try using --net=host for your attacker container or expose the port.', timestamp: '1h ago', upvotes: 5 },
      { id: 'c2', author: 'newbie_hacker', content: 'I had the same issue!', timestamp: '30m ago', upvotes: 1 }
    ]
  },
  { 
    id: 'p2', 
    author: 'newbie_hacker', 
    title: 'How to clean up VulHub containers?', 
    content: 'Is docker-compose down enough or do I need to prune volumes to reset the labs? I want to make sure no artifacts are left behind between attempts.', 
    category: 'General', 
    tags: ['docker', 'setup'],
    upvotes: 5, 
    timestamp: '5h ago',
    comments: [
      { id: 'c3', author: 'container_breaker', content: 'docker-compose down -v usually does the trick to remove attached volumes.', timestamp: '4h ago', upvotes: 3 }
    ]
  },
  { 
    id: 'p3', 
    author: 'container_breaker', 
    title: 'Spring4Shell payload specific for Tomcat', 
    content: 'Found a great writeup on how the class loader metrics differ between Tomcat 8 and 9. Check this gist... It helps bypassing the WAF rules we saw in the hard challenge.', 
    category: 'RCE', 
    tags: ['spring', 'tomcat', 'research'],
    upvotes: 25, 
    timestamp: '1d ago',
    comments: []
  },
  {
    id: 'p4',
    author: 'tomcat_cat',
    title: 'Struts2 S2-045 Content-Type Header format?',
    content: 'I keep getting 500 errors but no shell. Does the OGNL expression need to be URL encoded inside the header? The documentation is vague.',
    category: 'Web',
    tags: ['struts2', 'ognl', 'fail'],
    upvotes: 8,
    timestamp: '2d ago',
    comments: [
        { id: 'c4', author: 'admin_zero', content: 'No, do not URL encode the header value itself. Ensure your Content-Type string starts exactly with %{(#=\'multipart/form-data\')...', timestamp: '1d ago', upvotes: 10 }
    ]
  }
];