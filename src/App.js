import React from 'react'
import { Stage } from 'react-konva'
import Board from './Components/Board'
import Pawns from './Components/Pawns'

const App = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Board />
      <Pawns />
    </Stage>
  )
}

export default App
