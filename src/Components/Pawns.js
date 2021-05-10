import React, { useEffect, useState } from 'react'
import { Layer } from 'react-konva'
import { squares } from './Board'
import Pawn from './Pawn'

const Pawns = () => {
  const { x: x1, y: y1 } = squares.find(s => s.id === '1')
  const { x: x2, y: y2 } = squares.find(s => s.id === '5')
  const [{ x, y }, setCoordinates] = useState({ x: x1, y: y1 })

  useState(() => {
    setTimeout(() => {
      setCoordinates({ x: x2, y: y2 })
    }, 3000)
  }, [])
  return (
    <Layer>
      <Pawn x={x + 25} y={y + 25} />
    </Layer>
  )
}

export default Pawns
