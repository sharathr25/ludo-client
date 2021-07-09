import React, { useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/konva'

import { COLORS, SEAT_COLORS } from '../constants/colors'
import { DISTANCE_TO_CENTER, PAWN_RADIUS } from '../constants/sizes'
import { GAME_EVENTS } from '../constants/gameEvents'
import { addDistance, getPath } from '../utils/utils'
import { useSelector } from 'react-redux'

const { MOVE_PAWN } = GAME_EVENTS

const Pawn = ({ pawn, seat, socket }) => {
  const myId = sessionStorage.getItem('MY_ID')
  const [coordinates, setCoordinates] = useState([
    { x: 0, y: 0, positionNumber: 0 }
  ])
  const game = useSelector(
    state => {
      const { game } = state
      const { players } = game
      const myPlayer = players.find(p => p.id === myId)
      const mySeat = myPlayer?.seat
      return { mySeat }
    },
    (oldState, newState) => oldState.mySeat === newState.mySeat
  )
  const { mySeat } = game

  useEffect(() => {
    if (coordinates.length) {
      const path = getPath({
        currentPosition: pawn,
        prevPosition: coordinates[coordinates.length - 1].positionNumber
          ? coordinates[coordinates.length - 1]
          : null,
        seat
      })
      setCoordinates(path.map(addDistance({ xDistance: DISTANCE_TO_CENTER })))
    }
  }, [pawn.positionNumber])

  const propsToMovePawn = useSpring({
    from: {
      x: coordinates[0].x,
      y: coordinates[0].y
    },
    to:
      coordinates[coordinates.length - 1].positionNumber ===
        pawn.positionNumber && !pawn.canMove
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

const memoise = (prevProps, nextProps) =>
  prevProps.pawn.positionNumber === nextProps.pawn.positionNumber &&
  prevProps.pawn.canMove === nextProps.pawn.canMove

export default React.memo(Pawn, memoise)
