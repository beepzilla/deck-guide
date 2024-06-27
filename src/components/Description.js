import React from 'react';

function Description({ card }) {
  return (
    <>
      <div style={{ maxHeight: '300px', overflowY: 'auto', wordWrap: 'break-word' }}>
        <p>{card?.description}</p>
        {card?.attributes.map(attr => (
          <p key={attr.trait_type} style={{ margin: '0' }}>{`${attr.trait_type}: ${attr.value}`}</p>
        ))}
      </div>
    </>
  );
}

export default Description;
