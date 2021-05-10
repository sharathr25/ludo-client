import React, { useState } from 'react'
import { animated, Spring } from '@react-spring/konva'
import { COLORS } from '../constants'

const Pawn = ({ x, y }) => {
  const [coordinates, setCoordinates] = useState({ x, y })

  const onRest = () => {
    setCoordinates({ x, y })
  }

  return (
    <Spring
      native
      from={{ x: coordinates.x, y: coordinates.y }}
      to={{
        x: coordinates.x !== x ? x : coordinates.x,
        y: coordinates.y !== y ? y : coordinates.y
      }}
      onRest={onRest}
    >
      {props => (
        <animated.Circle
          {...props}
          fill={COLORS.RED}
          radius={10}
          stroke={COLORS.BLACK}
        />
      )}
    </Spring>
  )
}

export default Pawn
