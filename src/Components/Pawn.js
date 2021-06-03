import React, { useContext, useEffect, useState } from 'react'
import { animated, Spring } from '@react-spring/konva'
import { COLORS, SEAT_COLORS } from '../constants'
import { MOVE_PAWN } from '../roomReducer'
import SocketContext from '../SocketContext'
import { squares } from './Board'

const DISTANCE_TO_CENTER = 25

// const STARTING_SQUARES = {
//   '1': '1',
//   '2': '14'
// }

const Pawn = ({ pawn, seat, active }) => {
  const socket = useContext(SocketContext)
  const [source, setSource] = useState({ x: 0, y: 0 })
  const [destinations, setDestination] = useState([
    squares.find(
      s =>
        s.squareNumber === pawn.squareNumber &&
        s.group === pawn.group &&
        (seat === s.seat || pawn.group === 'COMMUNITY')
    )
  ])
  const myId = sessionStorage.getItem('MY_ID')

  useEffect(() => {
    setDestination([
      squares.find(
        s =>
          s.squareNumber === pawn.squareNumber &&
          s.group === pawn.group &&
          (seat === s.seat || pawn.group === 'COMMUNITY')
      )
    ])
  }, [pawn])

  const movePawn = () => {
    socket.send(MOVE_PAWN, { pawnNo: pawn.no, playerId: myId })
  }

  return (
    <Spring
      loop={active}
      from={{ stroke: COLORS.BLACK, strokeWidth: 1 }}
      to={
        active
          ? [
              { stroke: '#f8f8f8', strokeWidth: 6 },
              { stroke: COLORS.BLACK, strokeWidth: 1 }
            ]
          : []
      }
    >
      {props1 => (
        <Spring
          native
          from={{
            x: source.x + DISTANCE_TO_CENTER,
            y: source.y + DISTANCE_TO_CENTER
          }}
          to={destinations.map(d => ({
            x: d.x + DISTANCE_TO_CENTER,
            y: d.y + DISTANCE_TO_CENTER
          }))}
        >
          {props2 => (
            <animated.Circle
              {...props2}
              {...props1}
              fill={SEAT_COLORS[seat]}
              radius={10}
              onClick={movePawn}
            />
          )}
        </Spring>
      )}
    </Spring>
  )
}

export default Pawn
