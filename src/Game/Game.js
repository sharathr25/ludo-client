import React, { useContext, useEffect } from 'react'
import { Stage } from 'react-konva'
import { Provider as ReduxProvider } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import store from '../redux/store'
import SocketContext from '../SocketContext'
import Board from '../components/Board'
import Pawns from '../components/Pawns'
import Player from '../components/Player'
import PlayerActions from '../components/PlayerActions'
import CopyRoomCode from '../components/CopyRoomCode'
import { GameContainer } from './stylesComponents'
import { GAME_EVENTS } from '../constants/gameEvents'
import { BOARD_CONTAINER_SIZE } from '../constants/sizes'

import 'react-toastify/dist/ReactToastify.css'

const { GET_GAME_STATE } = GAME_EVENTS

const GameRoom = () => {
  const myId = sessionStorage.getItem('MY_ID')
  const { roomId } = useParams()
  const socket = useContext(SocketContext)
  const game = useSelector(state => state.game)
  const { players = [] } = game

  useEffect(() => {
    socket.connect({ playerId: myId })
    if (roomId && !socket.channel) {
      socket.joinChannel(`room:${roomId}`).then(() => {
        socket.send(GET_GAME_STATE)
      })
    }
  }, [])

  const renderPawns = p => <Pawns pawns={p.pawns} seat={p.seat} key={p.id} />

  return (
    <GameContainer>
      <div className='header'>
        <CopyRoomCode roomId={roomId} />
      </div>
      <div className='player-1'>
        <Player seat={1} />
      </div>
      <div className='player-2'>
        <Player seat={2} />
      </div>
      <div className='stage'>
        <Stage width={BOARD_CONTAINER_SIZE} height={BOARD_CONTAINER_SIZE}>
          <Board />
          {/* react-konvo Stage is not passing store and contenxt to childs, so this is a workaround*/}
          <ReduxProvider store={store}>
            <SocketContext.Provider value={socket}>
              {players.map(renderPawns)}
            </SocketContext.Provider>
          </ReduxProvider>
        </Stage>
      </div>
      <div className='player-3'>
        <Player seat={3} />
      </div>
      <div className='player-4'>
        <Player seat={4} />
      </div>
      <div className='footer'>
        <PlayerActions />
      </div>
    </GameContainer>
  )
}

export default GameRoom
