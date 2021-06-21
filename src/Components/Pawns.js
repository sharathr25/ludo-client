import React from 'react'
import { Layer } from 'react-konva'
import Pawn from './Pawn'

const Pawns = ({ pawns = [], seat }) => {
  return (
    <Layer>
      {pawns.map((p, i) => (
        <Pawn pawn={p} seat={seat} key={i} />
      ))}
    </Layer>
  )
}

export default Pawns
