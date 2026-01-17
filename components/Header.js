'use client';

import { Shield, User, Copy, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { generateUserId } from '@/lib/utils';

export function Header({ userId }) {
  const [copied, setCopied] = useState(false);

  const copyUserId = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    toast.success('User ID copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const generateNewId = () => {
    const newId = generateUserId();
    localStorage.setItem('anonympost_userId', newId);
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">AnonymPost</h1>
              <p className="text-sm text-gray-400">Anonymous Social Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-mono">
                {userId.substring(0, 8)}...
              </span>
              <button
                onClick={copyUserId}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <Copy className="w-3 h-3" />
              </button>
              <button
                onClick={generateNewId}
                className="p-1 hover:bg-gray-700 rounded"
                title="Generate new ID"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}