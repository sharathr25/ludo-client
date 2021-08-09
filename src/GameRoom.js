import React, { useContext, useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Stage } from 'react-konva'
import { Provider } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { ToastContainer, toast } from 'react-toastify'

import SocketContext from './SocketContext'
import CopyButton from './Components/CopyButton'
import Board from './Components/Board'
import GameContainer from './Components/GameContainer'
import Dice3D from './Components/Dice3D'
import Heading from './Components/Heading'
import Pawns from './Components/Pawns'
import Player from './Components/Player'
import { GAME_EVENTS } from './constants/gameEvents'
import { BOARD_CONTAINER_SIZE } from './constants/sizes'
import { updateGame } from './redux/gameSlice'
import store from './redux/store'
import StartGame from './Components/StartGame'
import RollDice from './Components/RollDice'
import useSocketEventListener from './hooks/useSocketEventListener'

import 'react-toastify/dist/ReactToastify.css'

const {
  GET_GAME_STATE,
  GET_GAME_STATE_NOTIFY,
  MOVE_PAWN_NOTIFY,
  PLAYER_JOINED_NOTIFY
} = GAME_EVENTS

const GameRoom = () => {
  const socket = useContext(SocketContext)
  const { roomId } = useParams()
  const myId = sessionStorage.getItem('MY_ID')
  const game = useSelector(state => state.game)
  const {
    players = [],
    gameStatus,
    currentPlayerSeat,
    score,
    actionToTake
  } = game
  const myPlayer = players.find(p => p.id === myId)
  const [seatOfCurrentPlayer, setSeatOfCurrentPlayer] = useState(
    currentPlayerSeat
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (actionToTake === 'ROLL_DICE') {
      setSeatOfCurrentPlayer(currentPlayerSeat)
    }
  }, [actionToTake])

  useEffect(() => {
    const roomId = sessionStorage.getItem('ROOM_ID')
    socket.connect({ playerId: myId })
    if (roomId && !socket.channel) {
      socket.joinChannel(`room:${roomId}`).then(() => {
        socket.send(GET_GAME_STATE)
      })
    }
  }, [])

  const dispatchUpdateGame = res => {
    dispatch(updateGame(res))
  }

  useSocketEventListener(socket, [
    {
      eventName: PLAYER_JOINED_NOTIFY,
      cb: dispatchUpdateGame
    },
    {
      eventName: GET_GAME_STATE_NOTIFY,
      cb: dispatchUpdateGame
    },
    {
      eventName: MOVE_PAWN_NOTIFY,
      cb: dispatchUpdateGame
    }
  ])

  const handleOnCopy = () => {
    toast.info('Copied')
  }

  const findBySeat = seat => p => p.seat === seat

  const onDiceRollEnd = () => {
    setSeatOfCurrentPlayer(currentPlayerSeat)
  }

  const size = Math.min(
    BOARD_CONTAINER_SIZE,
    window.innerHeight,
    window.innerWidth
  )

  return (
    <GameContainer currentPlayerSeat={seatOfCurrentPlayer}>
      <div className='players-and-board'>
        <div className='two-players'>
          <Player
            player={players.find(findBySeat(1))}
            currentPlayerSeat={currentPlayerSeat}
          />
          <Player
            player={players.find(findBySeat(2))}
            currentPlayerSeat={currentPlayerSeat}
          />
        </div>
        <Stage width={size} height={size}>
          <Board roomId={roomId} />
          {/* react-konvo Stage is not passing store and contenxt to childs, so this is a workaround*/}
          <Provider store={store}>
            <SocketContext.Provider value={socket}>
              {players.map(p => (
                <Pawns pawns={p.pawns} seat={p.seat} key={p.id} />
              ))}
            </SocketContext.Provider>
          </Provider>
        </Stage>
        <div className='two-players'>
          <Player
            player={players.find(findBySeat(3))}
            currentPlayerSeat={currentPlayerSeat}
          />
          <Player
            player={players.find(findBySeat(4))}
            currentPlayerSeat={currentPlayerSeat}
          />
        </div>
        {/* {gameStatus == 'ON_GOING' && score && (
          <div className='dice'>
            <Dice3D score={score} onDiceRollEnd={onDiceRollEnd} />
          </div>
        )} */}
      </div>
      <div className='details-and-actions'>
        {/* <Heading>
          {roomId}
          <CopyToClipboard text={roomId} onCopy={handleOnCopy}>
            <CopyButton />
          </CopyToClipboard>
        </Heading> */}
        <StartGame />
        <RollDice />
        {myPlayer?.rank !== 0 && <span>{myPlayer?.rank}</span>}
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
