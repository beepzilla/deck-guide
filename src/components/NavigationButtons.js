import React from 'react';

function NavigationButtons({ onBack, onNavigate, loading }) {
  return (
    <>
      <button 
        onClick={onBack}  
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px 20px',
          zIndex: 1,
          background: 'rgba(255, 255, 255, 0.8)',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Back
      </button>
      <button 
        onClick={() => onNavigate(-1)} 
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          padding: '10px 20px',
          zIndex: 1,
          background: 'rgba(255, 255, 255, 0.8)',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        disabled={loading}
      >
        &lt;
      </button>
      <button 
        onClick={() => onNavigate(1)} 
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          padding: '10px 20px',
          zIndex: 1,
          background: 'rgba(255, 255, 255, 0.8)',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        disabled={loading}
      >
        &gt;
      </button>
    </>
  );
}

export default NavigationButtons;
