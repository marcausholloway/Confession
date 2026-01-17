'use client';

import { useState, useEffect } from 'react';
import './globals.css';

export default function Home() {
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState('recent');
  const [posts, setPosts] = useState([]);
  const [isConfession, setIsConfession] = useState(false);
  const [userId, setUserId] = useState('');

  // Sample data
  useEffect(() => {
    // Generate user ID
    const generatedId = 'user_' + Math.random().toString(36).substr(2, 9);
    setUserId(generatedId);
    
    // Sample posts
    const samplePosts = [
      {
        id: 1,
        text: "Just discovered this amazing platform! Love how I can share my thoughts without any pressure. The anonymity really helps me be myself. 🎉",
        userId: 'user_x7b3k9p2',
        time: '2 hours ago',
        reactions: { like: 12, love: 5, laugh: 3 },
        replies: 4,
        isConfession: false
      },
      {
        id: 2,
        text: "Confession: I've been pretending to be busy because I'm actually really lonely and don't know how to ask for company. 😔",
        userId: 'user_a2c8m4n6',
        time: '4 hours ago',
        reactions: { like: 45, love: 32, sad: 18 },
        replies: 23,
        isConfession: true
      },
      {
        id: 3,
        text: "The best feeling is when you complete something you've been procrastinating on for weeks! Just finished my side project! 💻",
        userId: 'user_p9q1r5s3',
        time: '6 hours ago',
        reactions: { like: 28, love: 15, wow: 7 },
        replies: 8,
        isConfession: false
      },
      {
        id: 4,
        text: "Confession: I secretly enjoy watching cheesy romance movies even though all my friends make fun of them. 🍿❤️",
        userId: 'user_m3n8b2v9',
        time: '1 day ago',
        reactions: { like: 67, love: 42, laugh: 19 },
        replies: 31,
        isConfession: true
      }
    ];
    
    setPosts(samplePosts);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    const newPost = {
      id: posts.length + 1,
      text: text.trim(),
      userId: userId,
      time: 'Just now',
      reactions: {},
      replies: 0,
      isConfession: isConfession
    };
    
    setPosts([newPost, ...posts]);
    setText('');
    
    // Show success message
    alert('Post created successfully! Your post is now anonymous.');
  };

  const handleReaction = (postId, reaction) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [reaction]: (post.reactions[reaction] || 0) + 1
          }
        };
      }
      return post;
    }));
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Tabs Navigation */}
      <div className="tabs-container">
        <button 
          className={`tab ${activeTab === 'recent' ? 'active' : ''}`}
          onClick={() => setActiveTab('recent')}
        >
          ⏰ Recent
        </button>
        <button 
          className={`tab ${activeTab === 'hot' ? 'active' : ''}`}
          onClick={() => setActiveTab('hot')}
        >
          🔥 Hot
        </button>
        <button 
          className={`tab ${activeTab === 'top' ? 'active' : ''}`}
          onClick={() => setActiveTab('top')}
        >
          📈 Top
        </button>
        <button 
          className={`tab ${activeTab === 'my-posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-posts')}
        >
          👤 My Posts
        </button>
        <button 
          className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          🔔 Notifications
        </button>
      </div>

      {/* Post Form */}
      <div className="post-form-container glass-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="form-header">
          <h2>{isConfession ? 'Share a Confession' : 'Share Your Thoughts'}</h2>
          <div className="form-tabs">
            <button 
              className={`tab-btn ${!isConfession ? 'active' : ''}`}
              onClick={() => setIsConfession(false)}
            >
              Regular Post
            </button>
            <button 
              className={`tab-btn ${isConfession ? 'active' : ''}`}
              onClick={() => setIsConfession(true)}
            >
              Confession
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="textarea-container">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                isConfession 
                  ? "What's your secret? Share it anonymously..."
                  : "What's on your mind? Share anonymously..."
              }
              className="glass-input"
              style={{ height: '150px', resize: 'vertical' }}
              maxLength={2000}
            />
            <div className="textarea-counter">
              {text.length}/2000
            </div>
          </div>

          {isConfession && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8892b0' }}>
                Add Image (Optional for confessions)
              </label>
              <div style={{
                border: '2px dashed rgba(100, 255, 218, 0.3)',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</div>
                <p style={{ color: '#8892b0' }}>Click to upload image</p>
                <p style={{ fontSize: '0.875rem', color: '#5d6885', marginTop: '0.25rem' }}>
                  Max 10MB • JPG, PNG, GIF, WebP
                </p>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.875rem', color: '#8892b0' }}>
              Posting as: <span style={{ fontFamily: 'monospace', color: '#64ffda' }}>
                {userId.substring(0, 8)}...
              </span>
            </div>
            <button type="submit" className="btn btn-primary">
              {isConfession ? 'Post Confession' : 'Post Anonymously'}
            </button>
          </div>
        </form>
      </div>

      {/* Posts List */}
      <div className="posts-container">
        <h3 style={{ marginBottom: '2rem', color: '#e6f1ff' }}>
          {activeTab === 'recent' && 'Recent Posts'}
          {activeTab === 'hot' && 'Hot Posts'}
          {activeTab === 'top' && 'Top Posts'}
          {activeTab === 'my-posts' && 'My Posts'}
          {activeTab === 'notifications' && 'Notifications'}
        </h3>

        {activeTab === 'notifications' ? (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔔</div>
            <h3 style={{ marginBottom: '0.5rem' }}>No New Notifications</h3>
            <p style={{ color: '#8892b0' }}>When someone replies to your posts, you'll see it here.</p>
          </div>
        ) : (
          posts.map((post, index) => (
            <div 
              key={post.id} 
              className="post-card glass-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="post-header">
                <div className="user-info">
                  <div 
                    className="user-avatar"
                    style={{ 
                      background: `linear-gradient(135deg, #${post.userId.substr(5, 6)} 0%, #${post.userId.substr(11, 6)} 100%)`
                    }}
                  >
                    {post.userId.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="post-meta">
                    <span style={{ fontWeight: '600', color: '#e6f1ff' }}>
                      Anonymous User
                    </span>
                    <span style={{ fontSize: '0.875rem', color: '#8892b0' }}>
                      {post.time} • {post.isConfession && '🔒 Confession'}
                    </span>
                  </div>
                </div>
                
                {post.userId === userId && (
                  <span style={{
                    padding: '4px 12px',
                    background: 'rgba(100, 255, 218, 0.1)',
                    color: '#64ffda',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    border: '1px solid rgba(100, 255, 218, 0.3)'
                  }}>
                    Your Post
                  </span>
                )}
              </div>

              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                whiteSpace: 'pre-wrap'
              }}>
                {post.text}
              </p>

              {/* Reactions */}
              <div className="reactions-container">
                {['👍', '❤️', '😂', '😮', '😢', '😠'].map((emoji, index) => {
                  const reactions = ['like', 'love', 'laugh', 'wow', 'sad', 'angry'];
                  const reactionType = reactions[index];
                  const count = post.reactions[reactionType] || 0;
                  
                  return (
                    <button
                      key={emoji}
                      className={`reaction-btn ${count > 0 ? 'active' : ''}`}
                      onClick={() => handleReaction(post.id, reactionType)}
                      title={`${reactionType.charAt(0).toUpperCase() + reactionType.slice(1)}: ${count}`}
                    >
                      {emoji}
                      {count > 0 && (
                        <span style={{
                          position: 'absolute',
                          top: '-5px',
                          right: '-5px',
                          fontSize: '0.75rem',
                          background: '#64ffda',
                          color: '#0a192f',
                          borderRadius: '50%',
                          width: '18px',
                          height: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="post-actions">
                <button className="action-btn">
                  💬 Reply ({post.replies})
                </button>
                <button className="action-btn">
                  📋 Copy
                </button>
                <button className="action-btn">
                  📤 Share
                </button>
              </div>

              {/* Reply Section (Collapsed) */}
              {post.replies > 0 && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(100, 255, 218, 0.1)' }}>
                  <button className="action-btn" style={{ background: 'transparent', border: 'none' }}>
                    👁️ Show {post.replies} {post.replies === 1 ? 'reply' : 'replies'}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Stats Bar */}
      <div className="glass-card" style={{ 
        marginTop: '3rem', 
        padding: '1.5rem',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: '#64ffda' }}>{posts.length}</div>
          <div style={{ fontSize: '0.875rem', color: '#8892b0' }}>Total Posts</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: '#64ffda' }}>
            {posts.filter(p => p.isConfession).length}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#8892b0' }}>Confessions</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: '#64ffda' }}>
            {posts.reduce((sum, post) => sum + Object.values(post.reactions).reduce((a, b) => a + b, 0), 0)}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#8892b0' }}>Reactions</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', color: '#64ffda' }}>
            {posts.reduce((sum, post) => sum + post.replies, 0)}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#8892b0' }}>Replies</div>
        </div>
      </div>
    </div>
  );
}
