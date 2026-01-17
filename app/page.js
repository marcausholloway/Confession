'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { PostForm } from '@/components/PostForm';
import { PostList } from '@/components/PostList';
import { generateUserId } from '@/lib/utils';

export default function Home() {
  const [userId, setUserId] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('recent');

  useEffect(() => {
    // Generate user ID
    const storedId = localStorage.getItem('anonympost_userId') || generateUserId();
    localStorage.setItem('anonympost_userId', storedId);
    setUserId(storedId);
    
    // Load posts
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (formData) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      if (data.success) {
        setPosts([data.data, ...posts]);
        return data.data;
      }
    } catch (error) {
      console.error('Failed to create post:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen">
      <Header userId={userId} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <PostForm 
          userId={userId}
          onSubmit={handleCreatePost}
          onSuccess={loadPosts}
        />
        
        <div className="mt-8 flex gap-4 mb-6">
          {['recent', 'hot', 'top'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <PostList posts={posts} userId={userId} />
        )}
      </main>
    </div>
  );
}