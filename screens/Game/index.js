import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import EndGameDialog from '../../components/EndGameDialog';
import { getInitialTableState, fullTable, hasWinner, isValidPlay } from './gameRules';
import GameTable from './Table';
import TurnRecorder from './TurnRecorder';
 
 
const CPU_PLAYER = 2;
 
 
const GameScreen = ({ navigation }) => {
  const [endGameDialog, setEndGameDialog] = useState(false);
  const [activePlayer, setActivePlayer] = useState(1);
  const [table, setTable] = useState(getInitialTableState());
  const [winner, setWinner] = useState();
  const [gameMode, setGameMode] = useState('1Player');
 
 
  const makeCPUMove = () => {
    const emptyCells = table.reduce((acc, cellState, index) => {
      if (cellState === 0) {
        acc.push(index);
      }
      return acc;
    }, []);
 
 
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const selectedCell = emptyCells[randomIndex];
 
 
    const newTable = [...table];
    newTable[selectedCell] = CPU_PLAYER;
    setTable(newTable);
 
 
    if (hasWinner(newTable, selectedCell)) {
      setWinner('CPU');
      setEndGameDialog(true);
      return;
    }
 
 
    if (fullTable(newTable)) {
      setEndGameDialog(true);
      return;
    }
 
 
    setActivePlayer(1); // Alternando para o jogador humano
  };
 
 
  const onCellClicked = (cellId) => {
    if (!isValidPlay(cellId, table) || winner) {
      return;
    }
 
 
    const newTable = [...table];
    newTable[cellId] = activePlayer;
    setTable(newTable);
 
 
    if (hasWinner(newTable, cellId)) {
      setWinner(activePlayer === 1 ? 'Jogador 1' : 'Jogador 2');
      setEndGameDialog(true);
      return;
    }
 
 
    if (fullTable(newTable)) {
      setEndGameDialog(true);
      return;
    }
 
 
    if (gameMode === '1Player' && activePlayer === 1) {
      setActivePlayer(CPU_PLAYER);
    } else {
      setActivePlayer(activePlayer === 1 ? 2 : 1);
    }
  };
 
 
  const resetGame = () => {
    setEndGameDialog(false);
    setActivePlayer(1);
    setTable(getInitialTableState());
    setWinner(undefined);
  };
 
 
  const endGameText = winner ? (gameMode === '1Player' ? `O ganhador é ${winner === 'CPU' ? 'CPU' : 'Jogador'}` : `O ganhador é ${winner}`) : 'Empatou';
 
 
  useEffect(() => {
    if (gameMode === '1Player' && activePlayer === CPU_PLAYER && !winner) {
      makeCPUMove();
    }
  }, [activePlayer, winner]);
 
 
  return (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#4B0082' }}> 
      <TurnRecorder
        playerName={gameMode === '1Player' ? (activePlayer === CPU_PLAYER ? 'CPU' : 'Jogador') : `Jogador ${activePlayer}`}
        playerId={activePlayer}
      />
      <GameTable
        tableState={table}
        onCellClicked={onCellClicked}
      />
      <EndGameDialog
        isOpen={endGameDialog}
        resultText={endGameText}
        onClickYes={resetGame}
        onClickNo={() => navigation.goBack()}
      />
      <Button title="1 Player" onPress={() => setGameMode('1Player')} />
      <Button title="2 Players" onPress={() => setGameMode('2Players')} />
    </View>
  );
};
 
 
export default GameScreen;