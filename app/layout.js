import './globals.css';

export const metadata = {
  title: 'AnonymPost | Anonymous Social Platform',
  description: 'Share your thoughts, confessions, and connect with others anonymously',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <header className="header">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon">A</div>
              <div>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>AnonymPost</h1>
                <p style={{ fontSize: '0.875rem', color: '#8892b0', margin: 0 }}>
                  Anonymous Social Platform
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button className="btn btn-secondary btn-small">
                <span style={{ fontFamily: 'monospace' }}>user_abc123</span>
              </button>
              <div style={{ position: 'relative' }}>
                <button className="btn btn-secondary btn-small">
                  🔔
                </button>
                <span className="notification-badge">3</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="main-content">
          <div className="container">
            {children}
          </div>
        </main>
        
        <footer style={{
          textAlign: 'center',
          padding: '2rem',
          borderTop: '1px solid rgba(100, 255, 218, 0.1)',
          marginTop: '4rem',
          color: '#8892b0'
        }}>
          <p>© {new Date().getFullYear()} AnonymPost. All posts are anonymous and private.</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            No registration required • End-to-end anonymous • Your privacy first
          </p>
        </footer>
      </body>
    </html>
  );
}
