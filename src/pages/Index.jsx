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

  const renderGameBoard = () => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="text-lg font-bold mb-2">Player 1</h3>
        <ul>
          {game.player1Deck.map(card => (
            <li key={card.id} className="mb-2">
              <Button 
                onClick={() => game.playCard(card.id, 1)}
                disabled={game.currentPlayer !== 1}
                className="w-full text-left"
              >
                {card.name} - {card.type}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Player 2</h3>
        <ul>
          {game.player2Deck.map(card => (
            <li key={card.id} className="mb-2">
              <Button 
                onClick={() => game.playCard(card.id, 2)}
                disabled={game.currentPlayer !== 2}
                className="w-full text-left"
              >
                {card.name} - {card.type}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white p-4">
      <Card className="w-full max-w-4xl bg-gray-700">
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
              <p className="text-center mb-4">Current Player: {game.currentPlayer}</p>
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
