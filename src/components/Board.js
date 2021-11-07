import React from 'react'
import { Layer, Rect, Line, Circle, Star } from 'react-konva'

import staticGameObjects from '../logic/gameObjects'
import { COLORS } from '../styles/colors'
import { getCommunitySquareSize, getPlayerYardSize } from '../logic/sizes'

const Board = ({ boardContainerSize }) => {
  const communitySquareSize = getCommunitySquareSize(boardContainerSize)
  const playerYardSize = getPlayerYardSize(boardContainerSize)

  const square = s => (
    <React.Fragment key={`${s.positionNumber} ${s.group} ${s.seat}`}>
      <Rect
        x={s.x}
        y={s.y}
        width={s.width || communitySquareSize}
        height={s.height || communitySquareSize}
        stroke={s.stroke || COLORS.BLACK}
        fill={s.fill || 'transparent'}
      />
    </React.Fragment>
  )

  const GROUP_TO_COMPONENT = {
    PLAYER_YARD: playerHome => (
      <React.Fragment key={`PLAYER_YARD_${playerHome.seat}`}>
        <Rect
          x={playerHome.x}
          y={playerHome.y}
          width={playerYardSize}
          height={playerYardSize}
          fill={playerHome.fill}
          stroke={COLORS.BLACK}
        />
        <Rect
          x={playerHome.x + communitySquareSize}
          y={playerHome.y + communitySquareSize}
          width={playerYardSize - communitySquareSize * 2}
          height={playerYardSize - communitySquareSize * 2}
          fill={COLORS.WHITE}
          stroke={COLORS.BLACK}
        />
      </React.Fragment>
    ),
    HOME: home => (
      <React.Fragment key={`${home.positionNumber} ${home.group} ${home.seat}`}>
        <Circle
          x={home.x + communitySquareSize / 2}
          y={home.y + communitySquareSize / 2}
          radius={(communitySquareSize + communitySquareSize / 2) / 2}
          stroke={COLORS.BLACK}
          fill={home.fill}
        />
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
        x={star.x + communitySquareSize / 2}
        y={star.y + communitySquareSize / 2}
        numPoints={5}
        innerRadius={(communitySquareSize / 2 - 10) / 2}
        outerRadius={communitySquareSize / 2 - 10}
        key={`STAR_${i + 1}`}
        fill={COLORS.WHITE}
        stroke={COLORS.BLACK}
      />
    ),
    COMMUNITY: communitySquare => square(communitySquare),
    HOME_COLUMN: homeColumnSquare => square(homeColumnSquare)
  }

  return (
    <Layer>
      <Rect
        x={0}
        y={0}
        width={boardContainerSize}
        height={boardContainerSize}
        fill={COLORS.LIGHT_GRAY}
        stroke={COLORS.BLACK}
      />
      {staticGameObjects(boardContainerSize).map((s, i) =>
        GROUP_TO_COMPONENT[s.group](s, i)
      )}
    </Layer>
  )
}

export default Board
