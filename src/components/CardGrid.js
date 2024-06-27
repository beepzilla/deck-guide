import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

function CardGrid() {
    const { cards, loading } = useWeb3();

    useEffect(() => {
        // Restore scroll position
        const savedScrollPosition = sessionStorage.getItem('scrollPosition');
        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition));
            sessionStorage.removeItem('scrollPosition');  // Clean up after restoring
        }
    }, []);

    if (loading) {
        return <img src="loading-image-url.jpg" alt="Loading..." style={{ width: '100%' }} />;
    }

    return (
        <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', padding: '1rem' }}>
            <h2 style={{ gridColumn: '1/-1' }}>OddPepes Deck Guide</h2>
            {cards.map(card => (
                <div key={card.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                    <Link to={`/model/${card.id}`}>
                        <img src={card.imageUrl} alt={`Card ${card.id}`} style={{ width: '100%', height: 'auto' }} />
                        <h3>{card.name}</h3>
                        <p>{card.description}</p>
                    </Link>
                    {card.attributes && card.attributes.map(attr => (
                        <p key={attr.trait_type}>{`${attr.trait_type}: ${attr.value}`}</p>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default CardGrid;
