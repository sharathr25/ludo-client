import React, { useContext, useEffect, useReducer } from 'react'
import { Stage } from 'react-konva'
import { useParams } from 'react-router'
import Board from './Components/Board'
import GameContainer from './Components/GameContainer'
import Heading from './Components/Heading'
import Pawns from './Components/Pawns'
import Player from './Components/Player'
import PlayersAndBoard from './Components/PlayersAndBoard'
import TwoPlayers from './Components/TwoPlayers'
import { BOARD_CONTAINER_SIZE } from './constants'
import roomReducer, {
  GET_GAME_STATE,
  GET_GAME_STATE_NOTIFY,
  MOVE_PAWN_NOTIFY,
  PLAYER_JOINED_NOTIFY,
  ROLL_DICE,
  ROLL_DICE_NOTIFY,
  START_GAME,
  START_GAME_ERROR,
  START_GAME_NOTIFY
} from './roomReducer'
import SocketContext from './SocketContext'

const GameRoom = () => {
  const socket = useContext(SocketContext)
  const [state, dispatch] = useReducer(roomReducer, {})
  const { roomId } = useParams()
  const myId = sessionStorage.getItem('MY_ID')

  useEffect(() => {
    const roomId = sessionStorage.getItem('ROOM_ID')
    socket.connect({ playerId: myId })
    if (roomId && !socket.channel) {
      socket.joinChannel(`room:${roomId}`).then(() => {
        socket.send(GET_GAME_STATE)
      })
    }
  }, [])

  useEffect(() => {
    socket.receive(PLAYER_JOINED_NOTIFY, res => {
      dispatch({ type: PLAYER_JOINED_NOTIFY, payload: res })
    })
    socket.receive(GET_GAME_STATE_NOTIFY, res => {
      dispatch({ type: GET_GAME_STATE_NOTIFY, payload: res })
    })
    socket.receive(START_GAME_NOTIFY, res => {
      dispatch({ type: START_GAME_NOTIFY, payload: res })
    })
    socket.receive(ROLL_DICE_NOTIFY, res => {
      dispatch({ type: START_GAME_NOTIFY, payload: res })
    })
    socket.receive(MOVE_PAWN_NOTIFY, res => {
      dispatch({ type: START_GAME_NOTIFY, payload: res })
    })
    socket.receive(START_GAME_ERROR, res => {
      alert(res.reason)
    })
  }, [])

  const startGame = () => {
    socket.send(START_GAME)
  }

  const rollDice = () => {
    socket.send(ROLL_DICE, { playerId: myId })
  }

  console.log(state, '-----')
  const {
    players = [],
    hostId,
    gameStatus,
    actionToTake,
    currentPlayerSeat,
    pawnsThatCanMove
  } = state

  const playerOne = players.find(p => p.seat === 1)
  const playerTwo = players.find(p => p.seat === 2)
  const playerThree = players.find(p => p.seat === 3)
  const playerFour = players.find(p => p.seat === 4)

  return (
    <GameContainer>
      <Heading>{roomId}</Heading>
      <PlayersAndBoard>
        <TwoPlayers>
          <Player seat={1} active={currentPlayerSeat === playerOne?.seat}>
            {playerOne?.name}
          </Player>
          <Player seat={4} active={currentPlayerSeat === playerFour?.seat}>
            {playerFour?.name}
          </Player>
        </TwoPlayers>
        <Stage width={BOARD_CONTAINER_SIZE} height={BOARD_CONTAINER_SIZE}>
          <Board roomId={state.roomId} />
          {players.map(p => (
            <Pawns
              pawns={p.pawns}
              seat={p.seat}
              key={p.id}
              pawnsThatCanMove={pawnsThatCanMove}
              currentPlayerSeat={currentPlayerSeat}
            />
          ))}
        </Stage>
        <TwoPlayers>
          <Player seat={2} active={currentPlayerSeat === playerTwo?.seat}>
            {playerTwo?.name}
          </Player>
          <Player seat={3} active={currentPlayerSeat === playerThree?.seat}>
            {playerThree?.name}
          </Player>
        </TwoPlayers>
      </PlayersAndBoard>
      {players.find(p => p.id === myId)?.id === hostId &&
        gameStatus == 'CREATED' && (
          <button onClick={startGame}>Start Game</button>
        )}
      {players.find(p => p.id === myId)?.seat === currentPlayerSeat &&
        gameStatus == 'ON_GOING' &&
        actionToTake === 'ROLL_DICE' && (
          <button onClick={rollDice}>Roll Dice</button>
        )}
    </GameContainer>
  )
}

export default GameRoom
