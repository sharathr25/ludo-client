import React from 'react'
import { Layer } from 'react-konva'
import Pawn from './Pawn'

const Pawns = ({
  pawns = [],
  seat,
  pawnsThatCanMove = [],
  currentPlayerSeat
}) => {
  return (
    <Layer>
      {pawns.map((p, i) => {
        return (
          <Pawn
            pawn={p}
            seat={seat}
            active={
              seat === currentPlayerSeat && pawnsThatCanMove.includes(p.no)
            }
            key={i}
          />
        )
      })}
    </Layer>
  )
}

export default Pawns
