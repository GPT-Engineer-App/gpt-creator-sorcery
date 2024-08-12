import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import GameLogic from '../game/GameLogic';

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const game = GameLogic();

  const startGame = () => {
    setGameStarted(true);
    game.initializeGame();
  };

  const renderCard = (card, playerId) => (
    <Card key={card.id} className="mb-2 bg-gray-600 hover:bg-gray-500 transition-colors">
      <CardHeader className="p-2">
        <CardTitle className="text-sm">{card.name}</CardTitle>
        <CardDescription className="text-xs">{card.type}</CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <p className="text-xs">{card.ability || card.effect}</p>
        {card.type === 'Teddy' && (
          <p className="text-xs mt-1">ATK: {card.attack} | DEF: {card.defense}</p>
        )}
      </CardContent>
      <CardFooter className="p-2">
        <Button 
          onClick={() => game.playCard(card.id, playerId)}
          disabled={game.currentPlayer !== playerId}
          className="w-full text-xs"
        >
          Play Card
        </Button>
      </CardFooter>
    </Card>
  );

  const renderGameBoard = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="text-lg font-bold mb-2">Player 1</h3>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-1">Hand ({game.player1Hand.length})</h4>
          <div className="grid grid-cols-2 gap-2">
            {game.player1Hand.map(card => renderCard(card, 1))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-1">Field ({game.player1Field.length})</h4>
          <div className="grid grid-cols-2 gap-2">
            {game.player1Field.map(card => renderCard(card, 1))}
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Player 2</h3>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-1">Hand ({game.player2Hand.length})</h4>
          <div className="grid grid-cols-2 gap-2">
            {game.player2Hand.map(card => renderCard(card, 2))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-1">Field ({game.player2Field.length})</h4>
          <div className="grid grid-cols-2 gap-2">
            {game.player2Field.map(card => renderCard(card, 2))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white p-4">
      <Card className="w-full max-w-6xl bg-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-red-500">Terrible Teddies</CardTitle>
          <CardDescription className="text-center text-gray-300">The naughtiest card battle you've ever seen!</CardDescription>
        </CardHeader>
        <CardContent>
          {!gameStarted ? (
            <>
              <p className="text-center mb-4">
                Get ready for a hilarious and irreverent card battling experience that blends the humor of South Park with the strategy of Magic: The Gathering!
              </p>
              <Button onClick={startGame} className="w-full bg-red-600 hover:bg-red-700">
                Start New Game
              </Button>
            </>
          ) : (
            <>
              <p className="text-center mb-4 text-xl font-bold">Current Player: {game.currentPlayer}</p>
              {renderGameBoard()}
              <Button onClick={game.endTurn} className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
                End Turn
              </Button>
            </>
          )}
        </CardContent>
        <CardFooter className="text-center text-xs text-gray-400">
          Warning: Contains adult humor and themes. Not suitable for young audiences or easily offended teddies.
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
