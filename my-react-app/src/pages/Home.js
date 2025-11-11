import React from 'react';

function Home() {
  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#3b82f6', marginBottom: '20px' }}>Welcome to Event Planner</h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
        Plan and manage your events with ease.
      </p>
      <div style={{ display: 'flex', gap: '20px' }}>
        <a
          href="/signup"
          style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          Get Started
        </a>
        <a
          href="/login"
          style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: '#3b82f6',
            textDecoration: 'none',
            border: '2px solid #3b82f6',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          Login
        </a>
      </div>
    </div>
  );
}

export default Home;