import React, { useContext, useEffect } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Stage } from 'react-konva'
import { Provider } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SocketContext from './SocketContext'
import Button from './Components/Button'
import CopyButton from './Components/CopyButton'
import Board from './Components/Board'
import GameContainer from './Components/GameContainer'
import Heading from './Components/Heading'
import Pawns from './Components/Pawns'
import Player from './Components/Player'
import { GAME_EVENTS } from './constants/gameEvents'
import { BOARD_CONTAINER_SIZE } from './constants/sizes'
import { ERROR_MSGS } from './constants/texts'
import { updateGame } from './redux/gameSlice'
import store from './redux/store'

const {
  GET_GAME_STATE,
  GET_GAME_STATE_NOTIFY,
  MOVE_PAWN_NOTIFY,
  PLAYER_JOINED_NOTIFY,
  ROLL_DICE,
  ROLL_DICE_NOTIFY,
  START_GAME,
  START_GAME_ERROR,
  START_GAME_NOTIFY
} = GAME_EVENTS

const GameRoom = () => {
  const socket = useContext(SocketContext)
  const { roomId } = useParams()
  const myId = sessionStorage.getItem('MY_ID')
  const game = useSelector(state => state.game)
  const dispatch = useDispatch()

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
      dispatch(updateGame(res))
    })
    socket.receive(GET_GAME_STATE_NOTIFY, res => {
      dispatch(updateGame(res))
    })
    socket.receive(START_GAME_NOTIFY, res => {
      dispatch(updateGame(res))
    })
    socket.receive(ROLL_DICE_NOTIFY, res => {
      dispatch(updateGame(res))
    })
    socket.receive(MOVE_PAWN_NOTIFY, res => {
      dispatch(updateGame(res))
    })
    socket.receive(START_GAME_ERROR, res => {
      toast.error(ERROR_MSGS[res.reason])
    })
  }, [])

  const startGame = () => {
    socket.send(START_GAME)
  }

  const rollDice = () => {
    socket.send(ROLL_DICE, { playerId: myId })
  }

  const handleOnCopy = () => {
    toast.info('Copied')
  }

  const {
    players = [],
    hostId,
    gameStatus,
    actionToTake,
    currentPlayerSeat
  } = game

  const myPlayer = players.find(p => p.id === myId)

  const findBySeat = seat => p => p.seat === seat

  return (
    <GameContainer>
      <div className='details-and-actions'>
        <Heading>
          {roomId}
          <CopyToClipboard text={roomId} onCopy={handleOnCopy}>
            <CopyButton />
          </CopyToClipboard>
        </Heading>
        {players.find(p => p.id === myId)?.id === hostId &&
          gameStatus == 'CREATED' && (
            <Button onClick={startGame}>Start Game</Button>
          )}
        {myPlayer?.seat === currentPlayerSeat &&
          gameStatus == 'ON_GOING' &&
          actionToTake === 'ROLL_DICE' && (
            <Button onClick={rollDice}>Roll Dice</Button>
          )}
        {myPlayer?.rank !== 0 && <span>{myPlayer?.rank}</span>}
      </div>
      <div className='players-and-board'>
        <div className='two-players'>
          <Player
            player={players.find(findBySeat(1))}
            currentPlayerSeat={currentPlayerSeat}
          />
          <Player
            player={players.find(findBySeat(3))}
            currentPlayerSeat={currentPlayerSeat}
          />
        </div>
        <Stage width={BOARD_CONTAINER_SIZE} height={BOARD_CONTAINER_SIZE}>
          <Board roomId={roomId} />
          {/* react-konvo Stage is not passing store to childs, so this is a workaround*/}
          <Provider store={store}>
            {players.map(p => (
              <Pawns pawns={p.pawns} seat={p.seat} key={p.id} />
            ))}
          </Provider>
        </Stage>
        <div className='two-players'>
          <Player
            player={players.find(findBySeat(2))}
            currentPlayerSeat={currentPlayerSeat}
          />
          <Player
            players={players.find(findBySeat(4))}
            currentPlayerSeat={currentPlayerSeat}
          />
        </div>
      </div>
      <ToastContainer
        position='top-left'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </GameContainer>
  )
}

export default GameRoom
