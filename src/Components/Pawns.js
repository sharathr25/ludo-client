import React, { useContext } from 'react'
import { Layer } from 'react-konva'

import SocketContext from '../SocketContext'
import Pawn from './Pawn'

const Pawns = ({ pawns = [], seat }) => {
  const socket = useContext(SocketContext) // cannot use socket context inside pawn, Because it will cause re-renders
  return (
    <Layer>
      {pawns.map((p, i) => (
        <Pawn pawn={p} seat={seat} key={i} socket={socket} />
      ))}
    </Layer>
  )
}

export default Pawns
