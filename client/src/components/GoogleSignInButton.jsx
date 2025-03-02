import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleSignInButton = () => {
  const clientId = '1058296266674-251c9htbe4u4vde7ku6u1l3o01jd6953.apps.googleusercontent.com';

  const handleSuccess = (response) => {
    console.log('Google Login Success:', response);
  };

  const handleFailure = (error) => {
    console.error('Google Login Failed:', error);
  };
  
  const handleGoogleLogin = () => {
    // Redirect to your backend Google authentication route
    window.location.href = "http://localhost:5000/auth/google/callback"; // Update this URL as per your backend server
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex justify-center items-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleFailure}
          useOneTap
          render={(renderProps) => (
            <button
        onClick={handleGoogleLogin}
        className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center"
      >
              <img
                          src="/assets/google.png"
                          alt="Google"
                          className="w-5 h-5 mr-2"
                        />
                        Sign up with Google
            </button>
          )}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleSignInButton;
