import React from 'react';

const ModelControls = ({ navigate, cardId, totalCards }) => {
  const navigateToNextCard = () => {
    if (cardId < totalCards - 1) {
      const nextId = cardId + 1;
      sessionStorage.setItem('scrollPosition', window.scrollY);
      navigate(`/model/${nextId}`);
    }
  };

  const navigateToPreviousCard = () => {
    if (cardId > 0) {
      const previousId = cardId - 1;
      sessionStorage.setItem('scrollPosition', window.scrollY);
      navigate(`/model/${previousId}`);
    }
  };

  const handleBack = () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
    navigate('/');
  };

  return (
    <>
      <button 
        onClick={handleBack}
        style={{ position: 'absolute', top: '10px', left: '10px', padding: '10px 20px', zIndex: 1, background: 'rgba(255, 255, 255, 0.8)', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Back
      </button>
      <button 
        onClick={navigateToPreviousCard}
        style={{ position: 'absolute', top: '50%', left: '10px', padding: '10px 20px', zIndex: 1, background: 'rgba(255, 255, 255, 0.8)', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        disabled={cardId === 0}
      >
        &lt;
      </button>
      <button 
        onClick={navigateToNextCard}
        style={{ position: 'absolute', top: '50%', right: '10px', padding: '10px 20px', zIndex: 1, background: 'rgba(255, 255, 255, 0.8)', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        disabled={cardId === 107}
      >
        &gt;
      </button>
    </>
  );
};

export default ModelControls;
