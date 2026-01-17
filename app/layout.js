import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'AnonymPost - Anonymous Social Platform',
  description: 'Share your thoughts, confessions, and connect with others anonymously',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#e2e8f0',
              border: '1px solid #334155',
            },
          }}
        />
      </body>
    </html>
  );
}