import React, { useContext, useEffect } from 'react'
import { Stage } from 'react-konva'
import { Provider } from 'react-redux'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import store from '../redux/store'
import SocketContext from '../SocketContext'
import Board from '../components/Board'
import Pawns from '../components/Pawns'
import Player from '../components/Player'
import PlayerActions from '../components/PlayerActions'
import {
  GameContainer,
  PlayersAndBoard,
  StageAndDice,
  TwoPlayers,
  StageAndActions
} from './stylesComponents'
import { GAME_EVENTS } from '../constants/gameEvents'
import { BOARD_CONTAINER_SIZE } from '../constants/sizes'
import { DESKTOP_BREAKPOINT } from '../styles/breakpoints'

import 'react-toastify/dist/ReactToastify.css'
import { useParams } from 'react-router'

const { GET_GAME_STATE } = GAME_EVENTS

const GameRoom = () => {
  const myId = sessionStorage.getItem('MY_ID')
  const { roomId } = useParams()
  const socket = useContext(SocketContext)
  const isDesktop = useMediaQuery({
    query: `(min-width: ${DESKTOP_BREAKPOINT}px)`
  })
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

  return (
    <GameContainer>
      <PlayersAndBoard>
        <TwoPlayers>
          <Player seat={1} />
          <Player seat={isDesktop ? 4 : 2} />
        </TwoPlayers>
        <StageAndActions>
          <StageAndDice>
            <Stage width={BOARD_CONTAINER_SIZE} height={BOARD_CONTAINER_SIZE}>
              <Board />
              {/* react-konvo Stage is not passing store and contenxt to childs, so this is a workaround*/}
              <Provider store={store}>
                <SocketContext.Provider value={socket}>
                  {players.map(p => (
                    <Pawns pawns={p.pawns} seat={p.seat} key={p.id} />
                  ))}
                </SocketContext.Provider>
              </Provider>
            </Stage>
          </StageAndDice>
          {isDesktop && <PlayerActions />}
        </StageAndActions>
        <TwoPlayers>
          <Player seat={isDesktop ? 2 : 4} />
          <Player seat={3} />
        </TwoPlayers>
        {!isDesktop && <PlayerActions />}
      </PlayersAndBoard>
    </GameContainer>
  )
}

export default GameRoom
