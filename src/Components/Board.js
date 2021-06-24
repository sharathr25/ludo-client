import React from 'react'
import { Layer, Rect, Line, Text, Circle, Star } from 'react-konva'
import {
  BOARD_SIZE,
  PLAYER_HOME_SIZE,
  COLORS,
  SMALL_BOX_SIZE,
  staticGameObjects,
  BOARD_CONTAINER_SIZE,
  playerHomes
} from '../constants'

const boardX = (BOARD_CONTAINER_SIZE - BOARD_SIZE) / 2
const boardY = (BOARD_CONTAINER_SIZE - BOARD_SIZE) / 2

const GROUP_TO_COMPONENT = {
  HOME: home => (
    <React.Fragment key={`${home.positionNumber} ${home.group} ${home.seat}`}>
      <Circle
        x={home.x + 25}
        y={home.y + 25}
        radius={75 / 2}
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
  SAFE_SQUARE_STAR: star => (
    <Star
      x={star.x + 25}
      y={star.y + 25}
      numPoints={5}
      innerRadius={7.5}
      outerRadius={15}
      fill={COLORS.WHITE}
      stroke={COLORS.BLACK}
    />
  )
}

const Board = () => {
  return (
    <>
      <Layer>
        <Rect
          x={boardX}
          y={boardY}
          width={BOARD_SIZE}
          height={BOARD_SIZE}
          fill={COLORS.LIGHT_GRAY}
          stroke={COLORS.BLACK}
        />
        {playerHomes.map(b => (
          <>
            <Rect
              x={b.x}
              y={b.y}
              width={PLAYER_HOME_SIZE}
              height={PLAYER_HOME_SIZE}
              fill={b.fill}
              key={b.seat}
              stroke={COLORS.BLACK}
            />
            <Rect
              x={b.x + 50}
              y={b.y + 50}
              width={PLAYER_HOME_SIZE - 100}
              height={PLAYER_HOME_SIZE - 100}
              fill={COLORS.WHITE}
              key={b.seat}
              stroke={COLORS.BLACK}
            />
          </>
        ))}
        {staticGameObjects.map(s => {
          return GROUP_TO_COMPONENT[s.group] ? (
            GROUP_TO_COMPONENT[s.group](s)
          ) : (
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
        })}
      </Layer>
    </>
  )
}

export default Board
