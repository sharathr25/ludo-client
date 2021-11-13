import React, { useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/konva'
import { useSelector } from 'react-redux'
import { get } from 'idb-keyval'

import { SEAT_COLORS } from '../constants/colors'
import { GAME_EVENTS } from '../constants/gameEvents'
import { COLORS } from '../styles/colors'
import { getCommunitySquareSize, getPawnRadius } from '../logic/sizes'
import { getPath } from '../logic/path'
import { addDistance } from '../utils/utils'

const { MOVE_PAWN } = GAME_EVENTS
const { WHITE, BLACK } = COLORS

const Pawn = ({ pawn, seat, socket, boardSize }) => {
  const [myId, setMyId] = useState(null)
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
  const communitySquareSize = getCommunitySquareSize(boardSize)
  const pawnRadius = getPawnRadius(boardSize)

  useState(() => {
    get('MY_ID').then(setMyId)
  })

  useEffect(() => {
    if (coordinates.length) {
      const path = getPath({
        currentPosition: pawn,
        prevPosition: coordinates[coordinates.length - 1],
        seat,
        boardSize
      })
      setCoordinates(
        path.map(addDistance({ xDistance: communitySquareSize / 2 }))
      )
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
    from: { stroke: BLACK },
    to: pawn.canMove
      ? [{ stroke: WHITE }, { stroke: BLACK }]
      : [{ stroke: BLACK }]
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
      radius={pawnRadius}
      onClick={movePawn}
      onTouchEnd={movePawn}
    />
  )
}

const memoise = (prevProps, nextProps) =>
  prevProps.pawn.positionNumber === nextProps.pawn.positionNumber &&
  prevProps.pawn.canMove === nextProps.pawn.canMove &&
  prevProps.boardSize === nextProps.boardSize

export default React.memo(Pawn, memoise)
