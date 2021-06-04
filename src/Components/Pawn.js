import React, { useContext, useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/konva'
import { COLORS, SEAT_COLORS } from '../constants'
import { MOVE_PAWN } from '../roomReducer'
import SocketContext from '../SocketContext'
import { getPath } from '../utils/utils'

const DISTANCE_TO_CENTER = 25

const Pawn = ({ pawn, seat, active }) => {
  const socket = useContext(SocketContext)
  const [positions, setPositions] = useState(
    getPath({
      currentPosition: pawn,
      seat
    })
  )
  const myId = sessionStorage.getItem('MY_ID')

  const propsToMovePawn = useSpring({
    from: {
      x: prevPosition.x + DISTANCE_TO_CENTER,
      y: prevPosition.y + DISTANCE_TO_CENTER
    },
    to: positions.map(d => ({
      x: d.x + DISTANCE_TO_CENTER,
      y: d.y + DISTANCE_TO_CENTER
    }))
  })

  const propsToGlowPawn = useSpring({
    loop: active,
    from: { stroke: COLORS.BLACK },
    to: active
      ? [{ stroke: '#f8f8f8' }, { stroke: COLORS.BLACK }]
      : [{ stroke: COLORS.BLACK }]
  })

  useEffect(() => {
    setPositions(prev =>
      getPath({
        prevPosition: prev[prev.length - 1],
        currentPosition: pawn,
        seat
      })
    )
  }, [pawn.squareNumber])

  const movePawn = () => {
    socket.send(MOVE_PAWN, { pawnNo: pawn.no, playerId: myId })
  }

  if (positions.length === 0) return null

  return (
    <animated.Circle
      {...propsToGlowPawn}
      {...propsToMovePawn}
      fill={SEAT_COLORS[seat]}
      radius={10}
      onClick={movePawn}
    />
  )
}

export default React.memo(Pawn)
