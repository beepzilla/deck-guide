import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import NavigationButtons from './NavigationButtons';
import ModelViewer from './ModelViewer';
import Description from './Description';

function CardModel() {
  const { id } = useParams();
  const { cards } = useWeb3();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const cardId = parseInt(id);

  const card = cards.find(card => card.id.toString() === id);
  
  const handleNavigate = (direction) => {
    if (loading) return;

    const nextId = (cardId + direction + cards.length) % cards.length;
    setLoading(true);
    navigate(`/model/${nextId}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <NavigationButtons onBack={handleBack} onNavigate={handleNavigate} loading={loading} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        gridTemplateRows: 'auto 1fr auto',
        gap: '20px',
        width: '100%',
        height: '100%',
        padding: '20px'
      }}>
        <div style={{ gridColumn: '2 / 3', gridRow: '1 / 2', textAlign: 'center', fontSize: '2em' }}>
          {card?.name}
        </div>
        <div style={{ gridColumn: '2 / 3', gridRow: '2 / 3', height: '100%' }}>
          <ModelViewer card={card} setLoading={setLoading} />
        </div>
        <div style={{
          gridColumn: '2 / 3',
          gridRow: '3 / 4',
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '10px',
          borderRadius: '5px',
          textAlign: 'left',
          fontSize: '1.5em',
          overflowY: 'auto'
        }}>
          <Description card={card} />
        </div>
        <div style={{
          gridColumn: '1 / 2',
          gridRow: '1 / 4',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <img 
            src={card?.imageUrl} 
            alt={`Card ${card?.id}`} 
            style={{ width: '100%', height: 'auto', maxWidth: '50%' }}
          />
        </div>
      </div>
    </div>
  );
}

export default CardModel;
