import React, { useContext, useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/konva'
import { COLORS, SEAT_COLORS } from '../constants'
import { MOVE_PAWN } from '../roomReducer'
import SocketContext from '../SocketContext'
import { getPath } from '../utils/utils'

const DISTANCE_TO_CENTER = 25
const PAWN_RADIUS = 10

const addDistance = p => ({
  ...p,
  x: p.x + DISTANCE_TO_CENTER,
  y: p.y + DISTANCE_TO_CENTER
})

const memoise = (prevProps, nextProps) =>
  prevProps.pawn.squareNumber === nextProps.pawn.squareNumber &&
  prevProps.active === nextProps.active

const Pawn = ({ pawn, seat, score, active }) => {
  const socket = useContext(SocketContext)
  const [coordinates, setCoordinates] = useState([{ x: 0, y: 0 }])

  const myId = sessionStorage.getItem('MY_ID')

  useEffect(() => {
    if (coordinates.length) {
      const path = getPath({
        currentPosition: pawn,
        prevPosition: coordinates[coordinates.length - 1].squareNumber
          ? coordinates[coordinates.length - 1]
          : null,
        seat
      })
      setCoordinates(path.map(addDistance))
    }
  }, [pawn.squareNumber])

  const propsToMovePawn = useSpring({
    from: {
      x: coordinates[0].x,
      y: coordinates[0].y
    },
    to:
      coordinates.length === score && !active
        ? coordinates.map(p => ({
            x: p.x,
            y: p.y
          }))
        : {
            x: coordinates[coordinates.length - 1].x,
            y: coordinates[coordinates.length - 1].y
          }
  })

  const propsToGlowPawn = useSpring({
    loop: active,
    from: { stroke: COLORS.BLACK },
    to: active
      ? [{ stroke: '#f8f8f8' }, { stroke: COLORS.BLACK }]
      : [{ stroke: COLORS.BLACK }]
  })

  const movePawn = () => {
    if (active) {
      socket.send(MOVE_PAWN, { pawnNo: pawn.no, playerId: myId })
    }
  }

  return (
    <animated.Circle
      {...propsToMovePawn}
      {...propsToGlowPawn}
      fill={SEAT_COLORS[seat]}
      radius={PAWN_RADIUS}
      onClick={movePawn}
    />
  )
}

export default React.memo(Pawn, memoise)
