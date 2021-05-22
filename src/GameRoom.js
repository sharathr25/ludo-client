import React, { useContext, useEffect, useReducer } from 'react'
import { Stage } from 'react-konva'
import { useParams } from 'react-router'
import Board from './Components/Board'
import Pawns from './Components/Pawns'
import { BOARD_CONTAINER_SIZE } from './constants'
import SocketContext from './SocketContext'

const PLAYER_JOINED_NOTIFY = 'PLAYER_JOINED_NOTIFY'
const GET_GAME_STATE = 'GET_GAME_STATE'
const GET_GAME_STATE_NOTIFY = 'GET_GAME_STATE_NOTIFY'

const reducer = (state, action) => {
  switch (action.type) {
    case PLAYER_JOINED_NOTIFY:
    case GET_GAME_STATE_NOTIFY:
      return action.payload
    default:
      return state
  }
}

const GameRoom = () => {
  const socket = useContext(SocketContext)
  const [state, dispatch] = useReducer(reducer, {})
  const { roomId } = useParams()

  const init = async () => {
    const roomId = sessionStorage.getItem('ROOM_ID')
    if (roomId && !socket.channel) {
      await socket.joinChannel(`room:${roomId}`)
      socket.send(GET_GAME_STATE)
    }
  }

  useEffect(() => {
    init()
  })

  useEffect(() => {
    socket.receive(PLAYER_JOINED_NOTIFY, res => {
      dispatch({ type: PLAYER_JOINED_NOTIFY, payload: res })
    })
    socket.receive(GET_GAME_STATE_NOTIFY, res => {
      dispatch({ type: GET_GAME_STATE_NOTIFY, payload: res })
    })
  }, [])

  const { players = [] } = state
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>{roomId}</h1>
      <div
        style={{
          maxHeight: BOARD_CONTAINER_SIZE,
          maxWidth: BOARD_CONTAINER_SIZE,
          margin: 'auto'
        }}
      >
        <Stage width={BOARD_CONTAINER_SIZE} height={BOARD_CONTAINER_SIZE}>
          <Board roomId={state.roomId} />
          {players.map(p => (
            <Pawns pawns={p.pawns} seat={p.seat} key={p.id} />
          ))}
        </Stage>
      </div>
    </>
  )
}

export default GameRoom
