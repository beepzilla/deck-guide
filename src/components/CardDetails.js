import React from 'react';

const CardDetails = ({ card }) => (
  <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1, background: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px', textAlign: 'left' }}>
    <h2>{card.name}</h2>
    <p>{card.description}</p>
    {card.attributes.map(attr => (
      <p key={attr.trait_type}>{`${attr.trait_type}: ${attr.value}`}</p>
    ))}
  </div>
);

export default CardDetails;
