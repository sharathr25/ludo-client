import React, { useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/konva'
import { useSelector } from 'react-redux'

import { SEAT_COLORS } from '../constants/colors'
import { GAME_EVENTS } from '../constants/gameEvents'
import { COLORS } from '../styles/colors'
import {
  addDistance,
  getPath,
  getSizesWithRespectToBoardSize
} from '../utils/utils'

const { MOVE_PAWN } = GAME_EVENTS

const Pawn = ({ pawn, seat, socket, boardSize }) => {
  const myId = sessionStorage.getItem('MY_ID')
  const [coordinates, setCoordinates] = useState([
    { x: 0, y: 0, positionNumber: 0, group: 'ORIGIN' }
  ])
  const { mySeat } = useSelector(
    state => {
      const { game } = state
      const { players } = game
      const myPlayer = players.find(p => p.id === myId)
      return { mySeat: myPlayer?.seat }
    },
    (oldState, newState) => oldState.mySeat === newState.mySeat
  )
  const { DISTANCE_TO_CENTER, PAWN_RADIUS } = getSizesWithRespectToBoardSize(
    boardSize
  )

  useEffect(() => {
    if (coordinates.length) {
      const path = getPath({
        currentPosition: pawn,
        prevPosition: coordinates[coordinates.length - 1],
        seat,
        boardSize
      })
      setCoordinates(path.map(addDistance({ xDistance: DISTANCE_TO_CENTER })))
    }
  }, [pawn.positionNumber])

  const propsToMovePawn = useSpring({
    from: {
      x: coordinates[0].x,
      y: coordinates[0].y
    },
    to: coordinates.map(p => ({
      x: p.x,
      y: p.y
    })),
    onRest: () => {
      if (coordinates.length > 1) {
        setCoordinates([coordinates[coordinates.length - 1]])
      }
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
      onTouchEnd={movePawn}
    />
  )
}

const memoise = (prevProps, nextProps) =>
  prevProps.pawn.positionNumber === nextProps.pawn.positionNumber &&
  prevProps.pawn.canMove === nextProps.pawn.canMove

export default React.memo(Pawn, memoise)
