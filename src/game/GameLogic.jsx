import { useState } from 'react';

// Sample card data
const cardData = [
  { id: 1, name: "Naughty Nick", type: "Teddy", attack: 3, defense: 2, ability: "Mooning: Stun an enemy teddy for 1 turn" },
  { id: 2, name: "Sassy Sarah", type: "Teddy", attack: 2, defense: 4, ability: "Gossip: Reveal one random card in your opponent's hand" },
  { id: 3, name: "Boozy Barry", type: "Teddy", attack: 4, defense: 1, ability: "Beer Goggles: Confuse an enemy teddy, reducing its attack by 2" },
  { id: 4, name: "Pillow Fight", type: "Action", effect: "Deal 2 damage to an enemy teddy" },
  { id: 5, name: "Teddy Tequila", type: "Item", effect: "Increase a teddy's attack by 2 but decrease its defense by 1" },
];

const GameLogic = () => {
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [player2Deck, setPlayer2Deck] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameState, setGameState] = useState('setup'); // 'setup', 'playing', 'finished'

  const initializeGame = () => {
    // Shuffle and distribute cards
    const shuffled = [...cardData].sort(() => 0.5 - Math.random());
    setPlayer1Deck(shuffled.slice(0, 5));
    setPlayer2Deck(shuffled.slice(5, 10));
    setGameState('playing');
  };

  const playCard = (cardId, playerId) => {
    // Implement card playing logic
    console.log(`Player ${playerId} played card ${cardId}`);
    // Update game state, check for win conditions, etc.
  };

  const endTurn = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  return {
    player1Deck,
    player2Deck,
    currentPlayer,
    gameState,
    initializeGame,
    playCard,
    endTurn,
  };
};

export default GameLogic;
