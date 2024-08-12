import { useState } from 'react';

// Enhanced card data with more variety and humor
const cardData = [
  { id: 1, name: "Naughty Nick", type: "Teddy", attack: 3, defense: 2, ability: "Mooning: Stun an enemy teddy for 1 turn", description: "His full moon always rises at the worst time.", image: "/images/cards/naughty-nick.jpg" },
  { id: 2, name: "Sassy Sarah", type: "Teddy", attack: 2, defense: 4, ability: "Gossip: Reveal one random card in your opponent's hand", description: "She knows all your dirty secrets, and she's not afraid to share.", image: "/images/cards/sassy-sarah.jpg" },
  { id: 3, name: "Boozy Barry", type: "Teddy", attack: 4, defense: 1, ability: "Beer Goggles: Confuse an enemy teddy, reducing its attack by 2", description: "He's not an alcoholic, he's a fun-coholic!", image: "/images/cards/boozy-barry.jpg" },
  { id: 4, name: "Kinky Kelly", type: "Teddy", attack: 3, defense: 3, ability: "Whips and Chains: Immobilize an enemy teddy for 1 turn", description: "She'll tie you up in knots, literally and figuratively.", image: "/images/cards/kinky-kelly.jpg" },
  { id: 5, name: "Pillow Fight", type: "Action", effect: "Deal 2 damage to an enemy teddy", description: "It's all fun and games until someone loses a button eye.", image: "/images/cards/pillow-fight.jpg" },
  { id: 6, name: "Teddy Tequila", type: "Item", effect: "Increase a teddy's attack by 2 but decrease its defense by 1", description: "Liquid courage with a fuzzy aftertaste.", image: "/images/cards/teddy-tequila.jpg" },
  { id: 7, name: "Hangover from Hell", type: "Action", effect: "Reduce all teddies' attack and defense by 1 for 1 turn", description: "The morning after is always worse when you're stuffed with cotton.", image: "/images/cards/hangover-from-hell.jpg" },
  { id: 8, name: "Fluffy Handcuffs", type: "Item", effect: "Prevent an enemy teddy from attacking for 1 turn", description: "For when you want to be naughty but still cuddly.", image: "/images/cards/fluffy-handcuffs.jpg" },
];

const GameLogic = () => {
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [player2Deck, setPlayer2Deck] = useState([]);
  const [player1Hand, setPlayer1Hand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);
  const [player1Field, setPlayer1Field] = useState([]);
  const [player2Field, setPlayer2Field] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameState, setGameState] = useState('setup'); // 'setup', 'playing', 'finished'

  const initializeGame = () => {
    const shuffled = [...cardData].sort(() => 0.5 - Math.random());
    setPlayer1Deck(shuffled.slice(0, 20));
    setPlayer2Deck(shuffled.slice(20, 40));
    drawCards(1, 5);
    drawCards(2, 5);
    setGameState('playing');
  };

  const drawCards = (playerId, count) => {
    const deck = playerId === 1 ? player1Deck : player2Deck;
    const hand = playerId === 1 ? player1Hand : player2Hand;
    const drawnCards = deck.slice(0, count);
    const newDeck = deck.slice(count);
    const newHand = [...hand, ...drawnCards];

    if (playerId === 1) {
      setPlayer1Deck(newDeck);
      setPlayer1Hand(newHand);
    } else {
      setPlayer2Deck(newDeck);
      setPlayer2Hand(newHand);
    }
  };

  const playCard = (cardId, playerId) => {
    const hand = playerId === 1 ? player1Hand : player2Hand;
    const field = playerId === 1 ? player1Field : player2Field;
    const card = hand.find(c => c.id === cardId);

    if (card && currentPlayer === playerId) {
      const newHand = hand.filter(c => c.id !== cardId);
      const newField = [...field, card];

      if (playerId === 1) {
        setPlayer1Hand(newHand);
        setPlayer1Field(newField);
      } else {
        setPlayer2Hand(newHand);
        setPlayer2Field(newField);
      }

      // Apply card effects here
      applyCardEffect(card, playerId);

      console.log(`Player ${playerId} played ${card.name}`);
    }
  };

  const applyCardEffect = (card, playerId) => {
    // Implement card effect logic here
    console.log(`Applying effect of ${card.name} for player ${playerId}`);
    // You would add specific logic for each card type and ability here
  };

  const endTurn = () => {
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    setCurrentPlayer(nextPlayer);
    drawCards(nextPlayer, 1);
    // Check for win conditions here
    checkWinCondition();
  };

  const checkWinCondition = () => {
    if (player1Deck.length === 0 || player2Deck.length === 0) {
      setGameState('finished');
      console.log(`Player ${player1Deck.length === 0 ? 2 : 1} wins!`);
    }
  };

  return {
    player1Deck,
    player2Deck,
    player1Hand,
    player2Hand,
    player1Field,
    player2Field,
    currentPlayer,
    gameState,
    initializeGame,
    playCard,
    endTurn,
  };
};

export default GameLogic;
