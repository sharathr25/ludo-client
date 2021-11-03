import React, { useContext } from 'react'
import { Layer } from 'react-konva'

import SocketContext from '../SocketContext'
import Pawn from './Pawn'

const Pawns = ({ pawns = [], seat, boardContainerSize }) => {
  const socket = useContext(SocketContext) // cannot use socket context inside pawn, Because it will cause re-renders

  const renderPawn = (p, i) => (
    <Pawn
      pawn={p}
      seat={seat}
      key={i}
      socket={socket}
      boardSize={boardContainerSize}
    />
  )

  return <Layer>{pawns.map(renderPawn)}</Layer>
}

export default Pawns
