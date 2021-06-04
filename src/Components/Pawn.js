import React, { useContext, useEffect, useState, memo } from 'react'
import { animated, Spring } from '@react-spring/konva'
import { COLORS, SEAT_COLORS } from '../constants'
import { MOVE_PAWN } from '../roomReducer'
import SocketContext from '../SocketContext'
import { squares } from './Board'
import { range } from '../utils/utils'

const DISTANCE_TO_CENTER = 25

// const STARTING_SQUARES = {
//   '1': '1',
//   '2': '14'
// }

const Pawn = memo(({ pawn, seat, active }) => {
  const socket = useContext(SocketContext)
  const [positions, setPositions] = useState([])
  const myId = sessionStorage.getItem('MY_ID')

  useEffect(() => {
    setPositions(prev => {
      if (positions.length === 0) {
        return [
          squares.find(
            s =>
              s.squareNumber === pawn.squareNumber &&
              s.group === pawn.group &&
              ((pawn.group === 'HOME' && seat === s.seat) ||
                pawn.group === 'COMMUNITY' ||
                (pawn.group === 'HOME_COLUMN' && seat === s.seat))
          )
        ]
      }

      const nextPosition = pawn
      const prevPosition = prev[prev.length - 1]

      if (nextPosition.squareNumber === prevPosition.squareNumber) {
        return [
          squares.find(
            s =>
              s.squareNumber === prevPosition.squareNumber &&
              s.group === pawn.group &&
              ((prevPosition.group === 'HOME' && seat === s.seat) ||
                prevPosition.group === 'COMMUNITY' ||
                (prevPosition.group === 'HOME_COLUMN' && seat === s.seat))
          )
        ]
      }

      if (
        nextPosition.group === 'HOME_COLUMN' &&
        prevPosition.group === 'COMMUNITY'
      ) {
        return [...range(prevPosition.squareNumber, 51)]
          .map(square => {
            return squares.find(
              s =>
                s.squareNumber === square &&
                s.group === square.group &&
                ((prevPosition.group === 'HOME' && seat === s.seat) ||
                  prevPosition.group === 'COMMUNITY' ||
                  (prevPosition.group === 'HOME_COLUMN' && seat === s.seat))
            )
          })
          .concat(
            [...range(1, nextPosition.squareNumber)].map(square => {
              return squares.find(
                s =>
                  s.squareNumber === square &&
                  s.group === square.group &&
                  ((nextPosition.group === 'HOME' && seat === s.seat) ||
                    nextPosition.group === 'COMMUNITY' ||
                    (nextPosition.group === 'HOME_COLUMN' && seat === s.seat))
              )
            })
          )
      }

      return [
        ...range(prevPosition.squareNumber, nextPosition.squareNumber)
      ].map(square => {
        return squares.find(
          s =>
            s.squareNumber === square &&
            s.group === nextPosition.group &&
            ((nextPosition.group === 'HOME' && seat === s.seat) ||
              nextPosition.group === 'COMMUNITY' ||
              (nextPosition.group === 'HOME_COLUMN' && seat === s.seat))
        )
      })
    })
  }, [pawn])

  const movePawn = () => {
    socket.send(MOVE_PAWN, { pawnNo: pawn.no, playerId: myId })
  }

  if (!positions || positions.length === 0) return null

  console.log(positions)

  return (
    <Spring
      loop={active}
      from={{ stroke: COLORS.BLACK }}
      to={active ? [{ stroke: '#f8f8f8' }, { stroke: COLORS.BLACK }] : []}
    >
      {props1 => (
        <Spring
          native
          from={{
            x: positions[0].x + DISTANCE_TO_CENTER,
            y: positions[0].y + DISTANCE_TO_CENTER
          }}
          to={positions.map(d => ({
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
})

export default Pawn
