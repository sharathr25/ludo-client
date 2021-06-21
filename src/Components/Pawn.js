import React, { useContext, useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/konva'
import { COLORS, SEAT_COLORS } from '../constants'
import { GAME_EVENTS } from '../constants'
import SocketContext from '../SocketContext'
import { getPath } from '../utils/utils'
import { useSelector } from 'react-redux'

const { MOVE_PAWN } = GAME_EVENTS
const DISTANCE_TO_CENTER = 25
const PAWN_RADIUS = 10

const addDistance = p => ({
  ...p,
  x: p.x + DISTANCE_TO_CENTER,
  y: p.y + DISTANCE_TO_CENTER
})

const memoise = (prevProps, nextProps) =>
  prevProps.pawn.squareNumber === nextProps.pawn.squareNumber &&
  prevProps.pawn.canMove === nextProps.pawn.canMove

const Pawn = ({ pawn, seat }) => {
  const myId = sessionStorage.getItem('MY_ID')
  const socket = useContext(SocketContext)
  const [coordinates, setCoordinates] = useState([
    { x: 0, y: 0, squareNumber: 0 }
  ])
  const game = useSelector(
    state => {
      const { game } = state
      const { players } = game
      const myPlayer = players.find(p => p.id === myId)
      const mySeat = myPlayer?.seat
      return { mySeat }
    },
    (left, right) => left.mySeat === right.mySeat
  )
  const { mySeat } = game

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
      coordinates[coordinates.length - 1].squareNumber === pawn.squareNumber &&
      !pawn.canMove
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
    loop: pawn.canMove,
    from: { stroke: COLORS.BLACK },
    to: pawn.canMove
      ? [{ stroke: '#f8f8f8' }, { stroke: COLORS.BLACK }]
      : [{ stroke: COLORS.BLACK }]
  })

  const movePawn = () => {
    if (pawn.canMove && mySeat === seat) {
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
