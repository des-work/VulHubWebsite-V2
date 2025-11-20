import React, { useState } from 'react';
import { Submission, SubmissionStatus } from '../types';
import { SUBMISSIONS, USERS } from '../services/mockData';
import { CheckCircle, XCircle, Clock, FileText, AlertCircle, ExternalLink } from 'lucide-react';

export const GradingConsole: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(SUBMISSIONS);
  const [filter, setFilter] = useState<SubmissionStatus | 'ALL'>('ALL');

  const handleGrade = (id: string, status: SubmissionStatus) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const filteredSubmissions = filter === 'ALL' 
    ? submissions 
    : submissions.filter(s => s.status === filter);

  const getUserName = (uid: string) => USERS.find(u => u.id === uid)?.username || 'Unknown User';

  return (
    <div className="space-y-6 animate-matrix-fade pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-vulhub-text">Grading Console</h2>
          <p className="text-vulhub-muted text-sm">Review and grade student submissions</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-colors border ${
                filter === f 
                  ? 'bg-vulhub-primary/20 text-vulhub-primary border-vulhub-primary' 
                  : 'bg-vulhub-card text-vulhub-muted border-vulhub-border hover:bg-vulhub-border'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredSubmissions.length === 0 && (
            <div className="text-center py-10 text-vulhub-muted border border-dashed border-vulhub-border rounded-lg">
                No submissions found.
            </div>
        )}
        {filteredSubmissions.map(submission => (
          <div key={submission.id} className="bg-vulhub-card border border-vulhub-border rounded-lg p-6 flex flex-col lg:flex-row gap-6 hover:border-vulhub-muted transition-colors">
            
            {/* Info Section */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase border ${
                  submission.status === SubmissionStatus.APPROVED ? 'text-green-400 border-green-900 bg-green-900/20' :
                  submission.status === SubmissionStatus.REJECTED ? 'text-red-400 border-red-900 bg-red-900/20' :
                  'text-yellow-400 border-yellow-900 bg-yellow-900/20'
                }`}>
                  {submission.status}
                </span>
                <span className="text-vulhub-muted text-xs flex items-center gap-1">
                   <Clock className="w-3 h-3" /> {new Date(submission.submittedAt).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-vulhub-text">
                {submission.challengeTitle}
              </h3>
              
              <div className="flex items-center gap-2 text-sm">
                 <span className="text-vulhub-muted">Student:</span>
                 <span className="text-vulhub-primary font-mono">@{getUserName(submission.userId)}</span>
              </div>

              <div className="bg-black/50 p-3 rounded border border-vulhub-border/50 mt-2">
                <p className="text-xs text-vulhub-muted uppercase mb-1 flex items-center gap-1">
                    <FileText className="w-3 h-3" /> Proof of Work
                </p>
                <p className="text-sm text-gray-300 font-mono break-all">
                    {submission.proof}
                </p>
              </div>

              {submission.feedback && (
                <div className="text-sm text-orange-300/80 bg-orange-900/10 p-2 rounded border border-orange-900/30 flex gap-2 items-start">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{submission.feedback}</span>
                </div>
              )}
            </div>

            {/* Action Section */}
            {submission.status === SubmissionStatus.PENDING && (
                <div className="flex lg:flex-col gap-2 justify-center border-t lg:border-t-0 lg:border-l border-vulhub-border pt-4 lg:pt-0 lg:pl-6 min-w-[140px]">
                <button 
                    onClick={() => handleGrade(submission.id, SubmissionStatus.APPROVED)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/40 text-green-400 border border-green-600/50 rounded transition-colors"
                >
                    <CheckCircle className="w-4 h-4" /> Approve
                </button>
                <button 
                    onClick={() => handleGrade(submission.id, SubmissionStatus.REJECTED)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-600/50 rounded transition-colors"
                >
                    <XCircle className="w-4 h-4" /> Reject
                </button>
                </div>
            )}
            {submission.status !== SubmissionStatus.PENDING && (
                <div className="flex items-center justify-center lg:border-l border-vulhub-border lg:pl-6 min-w-[140px]">
                    <button className="text-vulhub-muted hover:text-vulhub-text text-sm flex items-center gap-1">
                        <ExternalLink className="w-4 h-4" /> Details
                    </button>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};