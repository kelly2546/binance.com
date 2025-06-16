import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { resendVerificationEmail } from '@/lib/firebase';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useFirebaseAuth();
  const [, setLocation] = useLocation();
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Redirect to home if not authenticated
        setLocation('/');
      } else if (!user.emailVerified) {
        // Show verification message if email not verified
        setShowVerificationMessage(true);
      } else {
        // User is authenticated and verified
        setShowVerificationMessage(false);
      }
    }
  }, [user, loading, setLocation]);

  const handleResendEmail = async () => {
    setResendLoading(true);
    setResendMessage('');
    
    try {
      await resendVerificationEmail();
      setResendMessage('Verification email sent successfully!');
    } catch (error) {
      setResendMessage('Failed to send verification email. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0e11] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to home
  }

  if (!user.emailVerified) {
    return (
      <div className="min-h-screen bg-[#0b0e11] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-6 bg-[#1e2329] rounded-lg border border-[#474d57]">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a1 1 0 001.42 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Email Verification Required</h2>
          <p className="text-[#848e9c] mb-4">
            Please check your email and click the verification link to access your dashboard.
          </p>
          <p className="text-sm text-[#848e9c] mb-4">
            Verification email sent to: <span className="text-white">{user.email}</span>
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.location.reload()}
              className="bg-[var(--binance-yellow)] text-black font-medium py-2 px-4 rounded hover:bg-yellow-400 transition-colors"
            >
              I've Verified My Email
            </button>
            <button
              onClick={handleResendEmail}
              disabled={resendLoading}
              className="bg-[#474d57] text-white font-medium py-2 px-4 rounded hover:bg-[#5a6169] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendLoading ? 'Sending...' : 'Resend Verification Email'}
            </button>
            {resendMessage && (
              <p className={`text-sm ${resendMessage.includes('sent') ? 'text-green-400' : 'text-red-400'}`}>
                {resendMessage}
              </p>
            )}
            <button
              onClick={() => setLocation('/')}
              className="text-[#848e9c] hover:text-white transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}