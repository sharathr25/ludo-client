import React from 'react'
import { Layer, Rect, Line, Text, Circle, Star } from 'react-konva'

import {
  BOARD_SIZE,
  PLAYER_YARD_SIZE,
  SMALL_BOX_SIZE,
  BOARD_CONTAINER_SIZE,
  DISTANCE_TO_CENTER
} from '../constants/sizes'
import staticGameObjects from '../constants/gameObjects'
import { COLORS } from '../styles/colors'

const boardX = (BOARD_CONTAINER_SIZE - BOARD_SIZE) / 2
const boardY = (BOARD_CONTAINER_SIZE - BOARD_SIZE) / 2

const square = s => (
  <React.Fragment key={`${s.positionNumber} ${s.group} ${s.seat}`}>
    <Rect
      x={s.x}
      y={s.y}
      width={s.width || SMALL_BOX_SIZE}
      height={s.height || SMALL_BOX_SIZE}
      stroke={s.stroke || COLORS.BLACK}
      fill={s.fill || 'transparent'}
    />
    {/* <Text text={s.positionNumber} x={s.x} y={s.y} /> */}
  </React.Fragment>
)

const GROUP_TO_COMPONENT = {
  PLAYER_YARD: playerHome => (
    <React.Fragment key={`PLAYER_YARD_${playerHome.seat}`}>
      <Rect
        x={playerHome.x}
        y={playerHome.y}
        width={PLAYER_YARD_SIZE}
        height={PLAYER_YARD_SIZE}
        fill={playerHome.fill}
        stroke={COLORS.BLACK}
      />
      <Rect
        x={playerHome.x + SMALL_BOX_SIZE}
        y={playerHome.y + SMALL_BOX_SIZE}
        width={PLAYER_YARD_SIZE - SMALL_BOX_SIZE * 2}
        height={PLAYER_YARD_SIZE - SMALL_BOX_SIZE * 2}
        fill={COLORS.WHITE}
        stroke={COLORS.BLACK}
      />
    </React.Fragment>
  ),
  HOME: home => (
    <React.Fragment key={`${home.positionNumber} ${home.group} ${home.seat}`}>
      <Circle
        x={home.x + DISTANCE_TO_CENTER}
        y={home.y + DISTANCE_TO_CENTER}
        radius={(SMALL_BOX_SIZE + DISTANCE_TO_CENTER) / 2}
        stroke={COLORS.BLACK}
        fill={home.fill}
      />
      {/* <Text text={s.positionNumber} x={home.x} y={home.y} /> */}
    </React.Fragment>
  ),
  WIN_TRIANGLE: winTriangle => (
    <Line
      closed
      points={winTriangle.points}
      fill={winTriangle.fill}
      key={winTriangle.seat}
      stroke={COLORS.BLACK}
    />
  ),
  SAFE_SQUARE_STAR: (star, i) => (
    <Star
      x={star.x + DISTANCE_TO_CENTER}
      y={star.y + DISTANCE_TO_CENTER}
      numPoints={5}
      innerRadius={(DISTANCE_TO_CENTER - 10) / 2}
      outerRadius={DISTANCE_TO_CENTER - 10}
      key={`STAR_${i + 1}`}
      fill={COLORS.WHITE}
      stroke={COLORS.BLACK}
    />
  ),
  COMMUNITY: communitySquare => square(communitySquare),
  HOME_COLUMN: homeColumnSquare => square(homeColumnSquare)
}

const Board = () => {
  return (
    <Layer>
      <Rect
        x={boardX}
        y={boardY}
        width={BOARD_SIZE}
        height={BOARD_SIZE}
        fill={COLORS.LIGHT_GRAY}
        stroke={COLORS.BLACK}
      />
      {staticGameObjects.map((s, i) => GROUP_TO_COMPONENT[s.group](s, i))}
    </Layer>
  )
}

export default Board
