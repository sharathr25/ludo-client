import React from 'react'
import { Layer } from 'react-konva'
import { squares } from './Board'
import Pawn from './Pawn'

const DISTANCE_TO_CENTER = 25

const Pawns = ({ pawns = [], seat }) => {
  return (
    <Layer>
      {pawns.map(p => {
        const { x, y } = squares.find(s => s.id === p.square)
        return (
          <Pawn
            x={x + DISTANCE_TO_CENTER}
            y={y + DISTANCE_TO_CENTER}
            seat={seat}
            key={p.no}
          />
        )
      })}
    </Layer>
  )
}

export default Pawns
