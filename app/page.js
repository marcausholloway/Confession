'use client';

import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [posts, setPosts] = useState([
    { id: 1, text: "First anonymous post!", time: "2h ago" },
    { id: 2, text: "This platform is amazing!", time: "1h ago" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    const newPost = {
      id: posts.length + 1,
      text: text.trim(),
      time: 'Just now'
    };
    
    setPosts([newPost, ...posts]);
    setText('');
    alert('Post created!');
  };

  // Inline CSS for dark blue glossy style
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
      color: '#e6f1ff',
      fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    },
    header: {
      padding: '20px',
      background: 'rgba(10, 25, 47, 0.9)',
      borderBottom: '1px solid rgba(100, 255, 218, 0.2)',
      backdropFilter: 'blur(10px)',
    },
    main: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    card: {
      background: 'rgba(17, 34, 64, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(100, 255, 218, 0.1)',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '20px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    },
    input: {
      width: '100%',
      minHeight: '120px',
      background: 'rgba(10, 25, 47, 0.5)',
      border: '1px solid rgba(100, 255, 218, 0.2)',
      borderRadius: '8px',
      padding: '16px',
      color: '#e6f1ff',
      fontSize: '16px',
      fontFamily: 'inherit',
      resize: 'vertical',
      marginBottom: '16px',
    },
    button: {
      background: 'linear-gradient(90deg, #64ffda 0%, #4cc9f0 100%)',
      color: '#0a192f',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    postText: {
      fontSize: '16px',
      lineHeight: '1.6',
      marginBottom: '12px',
    },
    meta: {
      fontSize: '14px',
      color: '#8892b0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      background: 'linear-gradient(90deg, #64ffda, #4cc9f0)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '32px',
      margin: '0 0 20px 0',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={styles.title}>AnonymPost</h1>
          <p style={{ color: '#8892b0', margin: 0 }}>Anonymous Social Platform</p>
        </div>
      </header>

      <main style={styles.main}>
        {/* Post Form */}
        <div style={styles.card}>
          <h2 style={{ margin: '0 0 20px 0', color: '#e6f1ff' }}>Share Your Thoughts</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind? Share anonymously..."
              style={styles.input}
              maxLength={2000}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', color: '#8892b0' }}>
                {text.length}/2000 characters
              </div>
              <button 
                type="submit" 
                style={styles.button}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Post Anonymously
              </button>
            </div>
          </form>
        </div>

        {/* Posts List */}
        <h3 style={{ color: '#e6f1ff', margin: '40px 0 20px 0' }}>Recent Posts</h3>
        
        {posts.map((post) => (
          <div key={post.id} style={styles.card}>
            <p style={styles.postText}>{post.text}</p>
            <div style={styles.meta}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #64ffda, #4cc9f0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0a192f',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}>
                  AN
                </div>
                <span>Anonymous User</span>
              </span>
              <span>{post.time}</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(100, 255, 218, 0.1)'
            }}>
              <button style={{
                background: 'none',
                border: '1px solid rgba(100, 255, 218, 0.2)',
                color: '#8892b0',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
              }}>
                👍 Like
              </button>
              <button style={{
                background: 'none',
                border: '1px solid rgba(100, 255, 218, 0.2)',
                color: '#8892b0',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
              }}>
                💬 Reply
              </button>
            </div>
          </div>
        ))}

        {/* Stats */}
        <div style={{
          ...styles.card,
          display: 'flex',
          justifyContent: 'space-around',
          textAlign: 'center',
          marginTop: '40px',
        }}>
          <div>
            <div style={{ fontSize: '24px', color: '#64ffda' }}>{posts.length}</div>
            <div style={{ fontSize: '14px', color: '#8892b0' }}>Posts</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', color: '#64ffda' }}>0</div>
            <div style={{ fontSize: '14px', color: '#8892b0' }}>Replies</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', color: '#64ffda' }}>0</div>
            <div style={{ fontSize: '14px', color: '#8892b0' }}>Online</div>
          </div>
        </div>
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '20px',
        borderTop: '1px solid rgba(100, 255, 218, 0.1)',
        marginTop: '40px',
        color: '#8892b0',
        fontSize: '14px',
      }}>
        <p>© {new Date().getFullYear()} AnonymPost. All posts are anonymous.</p>
        <p style={{ marginTop: '8px' }}>No registration required • Your privacy first</p>
      </footer>
    </div>
  );
}
