import React from 'react';

function Login() {
  const handleLogin = () => {
    window.location.assign("http://localhost:5002/auth/google");
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-box">
          <div className="google-emoji">
            <svg width="40" height="40" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <path fill="#4285F4" d="M255.9 133.5c0-10.1-.8-17.5-2.4-25.1H130v47.1h71.7c-1.4 11.5-9.1 28.9-26.2 40.5l-.2 1.5 38.1 29.5 2.6.3c24-22.1 37.9-54.7 37.9-93.8z" />
                <path fill="#34A853" d="M130 261c34.4 0 63.3-11.3 84.4-30.6l-40.2-31.2c-10.8 7.5-25.5 12.8-44.2 12.8-33.7 0-62.2-22.1-72.3-52.7l-1.5.1-39.3 30.7-.5 1.4C37.7 230.2 80.9 261 130 261z" />
                <path fill="#FBBC05" d="M57.7 159.3c-2.5-7.6-4-15.8-4-24.3s1.5-16.7 3.9-24.3l-.1-1.6-39.8-31-.7 1.3C10.8 97.6 0 122.3 0 135c0 12.5 10.3 38.4 26.9 55.6l30.8-23.4z" />
                <path fill="#EA4335" d="M130 52.4c23.8 0 39.8 10.2 48.9 18.7l35.7-34.8C192.7 13.5 164.4 0 130 0 80.9 0 37.7 30.8 26.9 79.3l39.2 30.7c10-30.7 38.6-52.6 63.9-57.6z" />
              </g>
            </svg>
          </div>
          <h1>Welcome Back 👋</h1>
          <p>Sign in with your Google account to continue</p>
          <button onClick={handleLogin}>Login with Google</button>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-wrapper {
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #eef2f3, #8ec5fc);
          font-family: 'Segoe UI', sans-serif;
        }

        .login-box {
          background-color: #ffffff;
          padding: 50px 35px;
          border-radius: 16px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
          width: 100%;
          max-width: 420px;
        }

        .google-emoji {
          margin-bottom: 20px;
        }

        h1 {
          font-size: 28px;
          color: #222;
          margin-bottom: 10px;
        }

        p {
          font-size: 15px;
          color: #666;
          margin-bottom: 30px;
        }

        button {
          background-color: #4285f4;
          color: white;
          padding: 14px 28px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.3s, transform 0.2s;
          width: 100%;
        }

        button:hover {
          background-color: #3367d6;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(66, 133, 244, 0.3);
        }

        @media (max-width: 480px) {
          .login-box {
            padding: 30px 20px;
          }

          h1 {
            font-size: 24px;
          }

          button {
            font-size: 15px;
            padding: 12px 22px;
          }
        }
      `}</style>
    </>
  );
}

export default Login;
