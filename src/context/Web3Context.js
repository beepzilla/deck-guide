import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export function Web3Provider({ children }) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const contractAddress = '0x3206C17ebeAFAe5FEe400157605cEef61515DC05';
    const abi = [
        {
            "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}],
            "name": "uri",
            "outputs": [{"internalType": "string", "name": "", "type": "string"}],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/NTd705uSyvAkL9udDjTkYaQ4LoDMjI24");
    console.log('Blockchain connection established');

    const contract = new ethers.Contract(contractAddress, abi, provider);
    console.log('Contract initialized');

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    const loadCards = useCallback(async () => {
        console.log('Loading cards...');
        const cardPromises = [];
        
        for (let i = 1; i <= 108; i++) {
            await sleep(250);
            cardPromises.push(contract.uri(i).then(async uri => {
                try {
                    const response = await fetch(uri.replace('ipfs://', 'https://ipfs.io/ipfs/'));
                    const metadata = await response.json();
                    return {
                        ...metadata,
                        id: i,
                        imageUrl: metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
                        modelUrl: metadata.animation_url.replace('ipfs://', 'https://ipfs.io/ipfs/')
                    };
                } catch (error) {
                    console.error(`Failed to fetch metadata for token ${i}:`, error);
                    return null;
                }
            }));
        }

        try {
            const results = await Promise.all(cardPromises);
            console.log('Cards loaded successfully');
            const loadedCards = results.filter(card => card !== null);
            setCards(loadedCards);
            setLoading(false);
        } catch (error) {
            console.error("Failed to process card data:", error);
            setLoading(false);
        }
    }, [contract]);

    useEffect(() => {
        loadCards();
    }, [loadCards]);

    return (
        <Web3Context.Provider value={{ cards, loading }}>
            {children}
        </Web3Context.Provider>
    );
}

export function useWeb3() {
    return useContext(Web3Context);
}
