import React from 'react'
import { Layer, Rect, Line, Circle } from 'react-konva'
import {
  BOARD_SIZE,
  PLAYER_HOME_SIZE,
  WIDTH_OF_SQUARES_ALONG_HOME,
  COLORS,
  SMALL_BOX_SIZE
} from '../constants'
import { getPlayerHomeSquares } from '../utils'

const boardX = (window.innerWidth - BOARD_SIZE) / 2
const boardY = (window.innerHeight - BOARD_SIZE) / 2

const colors = {
  H1: COLORS.RED,
  H2: COLORS.YELLOW,
  H3: COLORS.BLUE,
  H4: COLORS.GREEN
}

const playerHomes = [
  {
    x: boardX,
    y: boardY,
    fill: colors.H1,
    id: 'H1'
  },
  {
    x: boardX + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
    y: boardY,
    fill: colors.H2,
    id: 'H2'
  },
  {
    x: boardX + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
    y: boardY + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
    fill: colors.H3,
    id: 'H3'
  },
  {
    x: boardX,
    y: boardY + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
    fill: colors.H4,
    id: 'H4'
  }
]

const playerHomeSquares = playerHomes.reduce(
  (acc, cur) => [
    ...acc,
    ...getPlayerHomeSquares(cur, PLAYER_HOME_SIZE, SMALL_BOX_SIZE).map(s => ({
      ...s,
      fill: COLORS.WHITE,
      stroke: COLORS.WHITE
    }))
  ],
  []
)

const playerHome1ColumnSquares = [1, 2, 3, 4, 5].map((n, i) => ({
  id: `H1CS${n}`,
  x: boardX + PLAYER_HOME_SIZE - SMALL_BOX_SIZE * (5 - i),
  y: boardY + PLAYER_HOME_SIZE + SMALL_BOX_SIZE,
  fill: colors.H1
}))

const playerHome2ColumnSquares = [1, 2, 3, 4, 5].map((n, i) => ({
  id: `H2CS${n}`,
  x: boardX + PLAYER_HOME_SIZE + SMALL_BOX_SIZE,
  y: boardY + SMALL_BOX_SIZE * (1 + i),
  fill: colors.H2
}))

const playerHome3ColumnSquares = [1, 2, 3, 4, 5].map((n, i) => ({
  id: `H3CS${n}`,
  x: boardX + PLAYER_HOME_SIZE + SMALL_BOX_SIZE * (7 - i),
  y: boardY + PLAYER_HOME_SIZE + SMALL_BOX_SIZE,
  fill: colors.H3
}))

const playerHome4ColumnSquares = [1, 2, 3, 4, 5].map((n, i) => ({
  id: `H4CS${n}`,
  x: boardX + PLAYER_HOME_SIZE + SMALL_BOX_SIZE,
  y: boardY + PLAYER_HOME_SIZE + SMALL_BOX_SIZE * (7 - i),
  fill: colors.H4
}))

const squares1to5 = [1, 2, 3, 4, 5].map((n, i) => ({
  id: n + '',
  x: boardX + PLAYER_HOME_SIZE - SMALL_BOX_SIZE * (5 - i),
  y: boardY + PLAYER_HOME_SIZE,
  fill: i === 0 ? colors.H1 : null
}))

const squares6to10 = [6, 7, 8, 9, 10].map((n, i) => ({
  id: n + '',
  x: boardX + PLAYER_HOME_SIZE,
  y: boardY + PLAYER_HOME_SIZE - SMALL_BOX_SIZE * (i + 1)
}))

const squares11to13 = [11, 12, 13].map((n, i) => ({
  id: n + '',
  x: boardX + PLAYER_HOME_SIZE + SMALL_BOX_SIZE * i,
  y: boardY
}))

const squares14to18 = [14, 15, 16, 17, 18].map((n, i) => ({
  id: n + '',
  x: boardX + PLAYER_HOME_SIZE + SMALL_BOX_SIZE * 2,
  y: boardY + SMALL_BOX_SIZE * (1 + i),
  fill: i === 0 ? colors.H2 : null
}))

const squares19to24 = [19, 20, 21, 22, 23].map((n, i) => ({
  id: n + '',
  x: boardX + PLAYER_HOME_SIZE + SMALL_BOX_SIZE * (3 + i),
  y: boardY + PLAYER_HOME_SIZE
}))

const squares25to27 = [25, 26, 27].map((n, i) => ({
  id: n + '',
  x: boardX + PLAYER_HOME_SIZE * 2 + SMALL_BOX_SIZE * 2,
  y: boardY + PLAYER_HOME_SIZE + SMALL_BOX_SIZE * i
}))

const squares28to32 = [28, 29, 30, 31, 32].map((n, i) => ({
  id: n + '',
  x: boardX + PLAYER_HOME_SIZE + SMALL_BOX_SIZE * (7 - i),
  y: boardY + PLAYER_HOME_SIZE + SMALL_BOX_SIZE * 2,
  fill: i === 0 ? colors.H3 : null
}))

const squares33to37 = [33, 34, 35, 36, 37].map((n, i) => ({
  id: n + '',
  x: boardX + PLAYER_HOME_SIZE + SMALL_BOX_SIZE * 2,
  y: boardY + PLAYER_HOME_SIZE + SMALL_BOX_SIZE * (3 + i)
}))

const squares38to40 = [38, 39, 40].map((n, i) => ({
  id: n + '',
  x: boardX + PLAYER_HOME_SIZE + SMALL_BOX_SIZE * (2 - i),
  y: boardY + PLAYER_HOME_SIZE + SMALL_BOX_SIZE * 8
}))

const squares41to45 = [41, 42, 43, 44, 45].map((n, i) => ({
  id: n + '',
  x: boardX + PLAYER_HOME_SIZE,
  y: boardY + PLAYER_HOME_SIZE + SMALL_BOX_SIZE * (7 - i),
  fill: i === 0 ? colors.H4 : null
}))

const squares46to45 = [46, 47, 48, 49, 50].map((n, i) => ({
  id: n + '',
  x: boardX + PLAYER_HOME_SIZE - SMALL_BOX_SIZE * (1 + i),
  y: boardY + PLAYER_HOME_SIZE + SMALL_BOX_SIZE * 2
}))

const squares51to53 = [51, 52, 53].map((n, i) => ({
  id: n + '',
  x: boardX,
  y: boardY + PLAYER_HOME_SIZE + SMALL_BOX_SIZE * (2 - i)
}))

export const squares = [
  ...playerHomeSquares,
  ...playerHome1ColumnSquares,
  ...playerHome2ColumnSquares,
  ...playerHome3ColumnSquares,
  ...playerHome4ColumnSquares,
  ...squares1to5,
  ...squares6to10,
  ...squares11to13,
  ...squares14to18,
  ...squares19to24,
  ...squares25to27,
  ...squares28to32,
  ...squares33to37,
  ...squares38to40,
  ...squares41to45,
  ...squares46to45,
  ...squares51to53
]

const winTriangles = [
  {
    id: 'w1',
    points: [
      boardX + PLAYER_HOME_SIZE,
      boardY + PLAYER_HOME_SIZE,
      boardX + PLAYER_HOME_SIZE,
      boardY + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
      boardX + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME / 2,
      boardY + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME / 2
    ],
    fill: colors.H1
  },
  {
    id: 'w2',
    points: [
      boardX + PLAYER_HOME_SIZE,
      boardY + PLAYER_HOME_SIZE,
      boardX + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
      boardY + PLAYER_HOME_SIZE,
      boardX + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME / 2,
      boardY + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME / 2
    ],
    fill: colors.H2
  },
  {
    id: 'w3',
    points: [
      boardX + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
      boardY + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
      boardX + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
      boardY + PLAYER_HOME_SIZE,
      boardX + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME / 2,
      boardY + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME / 2
    ],
    fill: colors.H3
  },
  {
    id: 'w4',
    points: [
      boardX + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
      boardY + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
      boardX + PLAYER_HOME_SIZE,
      boardY + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
      boardX + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME / 2,
      boardY + PLAYER_HOME_SIZE + WIDTH_OF_SQUARES_ALONG_HOME / 2
    ],
    fill: colors.H4
  }
]

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
          <Rect
            x={b.x}
            y={b.y}
            width={PLAYER_HOME_SIZE}
            height={PLAYER_HOME_SIZE}
            fill={b.fill}
            key={b.id}
          />
        ))}
        {squares.map(s => (
          <Rect
            x={s.x}
            y={s.y}
            width={s.width || SMALL_BOX_SIZE}
            height={s.height || SMALL_BOX_SIZE}
            stroke={s.stroke || COLORS.BLACK}
            fill={s.fill || 'transparent'}
            key={s.id}
          />
        ))}
        {winTriangles.map(wt => (
          <Line
            closed
            points={wt.points}
            fill={wt.fill}
            key={wt.id}
            stroke={COLORS.BLACK}
          />
        ))}
      </Layer>
    </>
  )
}

export default Board
