import { SEAT_COLORS } from './colors'
import { COLORS } from '../styles/colors'
import { getSizesWithRespectToBoardSize } from '../utils/utils'

export const START_SQUARES = [undefined, 1, 14, 27, 40]
export const END_SQUARES = [undefined, 51, 12, 25, 38]
export const BOARD_END_SQUARE = 52

const colors = {
  H1: COLORS.RED,
  H2: COLORS.YELLOW,
  H3: COLORS.BLUE,
  H4: COLORS.GREEN
}

export default function (boardSize) {
  const {
    BOARD_SIZE,
    PLAYER_YARD_SIZE,
    SMALL_BOX_SIZE,
    WIDTH_OF_SQUARES_ALONG_HOME
  } = getSizesWithRespectToBoardSize(boardSize)
  function getPlayerHomeSquares (home, playerHomeSize, smallBoxSize) {
    return [
      {
        positionNumber: 1,
        group: 'HOME',
        seat: home.seat,
        x: home.x + playerHomeSize / 6 + smallBoxSize / 2,
        y: home.y + playerHomeSize / 6 + smallBoxSize / 2,
        fill: SEAT_COLORS[home.seat]
      },
      {
        positionNumber: 2,
        group: 'HOME',
        seat: home.seat,
        x: home.x + playerHomeSize / 2 + smallBoxSize / 2,
        y: home.y + playerHomeSize / 2 + smallBoxSize / 2,
        fill: SEAT_COLORS[home.seat]
      },
      {
        positionNumber: 3,
        group: 'HOME',
        seat: home.seat,
        x: home.x + playerHomeSize / 2 + smallBoxSize / 2,
        y: home.y + playerHomeSize / 6 + smallBoxSize / 2,
        fill: SEAT_COLORS[home.seat]
      },
      {
        positionNumber: 4,
        group: 'HOME',
        seat: home.seat,
        x: home.x + playerHomeSize / 6 + smallBoxSize / 2,
        y: home.y + playerHomeSize / 2 + smallBoxSize / 2,
        fill: SEAT_COLORS[home.seat]
      }
    ]
  }

  const boardX = (boardSize - BOARD_SIZE) / 2
  const boardY = (boardSize - BOARD_SIZE) / 2

  const playerHomes = [
    {
      x: boardX,
      y: boardY,
      fill: colors.H1,
      seat: 1,
      group: 'PLAYER_YARD'
    },
    {
      x: boardX + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
      y: boardY,
      fill: colors.H2,
      seat: 2,
      group: 'PLAYER_YARD'
    },
    {
      x: boardX + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
      y: boardY + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
      fill: colors.H3,
      seat: 3,
      group: 'PLAYER_YARD'
    },
    {
      x: boardX,
      y: boardY + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
      fill: colors.H4,
      seat: 4,
      group: 'PLAYER_YARD'
    }
  ]

  const playerHomeSquares = playerHomes.reduce(
    (acc, cur) => [
      ...acc,
      ...getPlayerHomeSquares(cur, PLAYER_YARD_SIZE, SMALL_BOX_SIZE).map(s => ({
        ...s,
        stroke: COLORS.WHITE
      }))
    ],
    []
  )

  const playerHome1ColumnSquares = [1, 2, 3, 4, 5].map((n, i) => ({
    positionNumber: n,
    group: 'HOME_COLUMN',
    seat: 1,
    x: boardX + PLAYER_YARD_SIZE - SMALL_BOX_SIZE * (5 - i),
    y: boardY + PLAYER_YARD_SIZE + SMALL_BOX_SIZE,
    fill: colors.H1
  }))

  const playerHome2ColumnSquares = [1, 2, 3, 4, 5].map((n, i) => ({
    positionNumber: n,
    group: 'HOME_COLUMN',
    seat: 2,
    x: boardX + PLAYER_YARD_SIZE + SMALL_BOX_SIZE,
    y: boardY + SMALL_BOX_SIZE * (1 + i),
    fill: colors.H2
  }))

  const playerHome3ColumnSquares = [1, 2, 3, 4, 5].map((n, i) => ({
    positionNumber: n,
    group: 'HOME_COLUMN',
    seat: 3,
    x: boardX + PLAYER_YARD_SIZE + SMALL_BOX_SIZE * (7 - i),
    y: boardY + PLAYER_YARD_SIZE + SMALL_BOX_SIZE,
    fill: colors.H3
  }))

  const playerHome4ColumnSquares = [1, 2, 3, 4, 5].map((n, i) => ({
    positionNumber: n,
    group: 'HOME_COLUMN',
    seat: 4,
    x: boardX + PLAYER_YARD_SIZE + SMALL_BOX_SIZE,
    y: boardY + PLAYER_YARD_SIZE + SMALL_BOX_SIZE * (7 - i),
    fill: colors.H4
  }))

  const squares1to5 = [1, 2, 3, 4, 5].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: boardX + PLAYER_YARD_SIZE - SMALL_BOX_SIZE * (5 - i),
    y: boardY + PLAYER_YARD_SIZE,
    fill: i === 0 ? colors.H1 : null
  }))

  const squares6to10 = [6, 7, 8, 9, 10].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: boardX + PLAYER_YARD_SIZE,
    y: boardY + PLAYER_YARD_SIZE - SMALL_BOX_SIZE * (i + 1)
  }))

  const squares11to13 = [11, 12, 13].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: boardX + PLAYER_YARD_SIZE + SMALL_BOX_SIZE * i,
    y: boardY
  }))

  const squares14to18 = [14, 15, 16, 17, 18].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: boardX + PLAYER_YARD_SIZE + SMALL_BOX_SIZE * 2,
    y: boardY + SMALL_BOX_SIZE * (1 + i),
    fill: i === 0 ? colors.H2 : null
  }))

  const squares19to24 = [19, 20, 21, 22, 23].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: boardX + PLAYER_YARD_SIZE + SMALL_BOX_SIZE * (3 + i),
    y: boardY + PLAYER_YARD_SIZE
  }))

  const squares25to27 = [24, 25, 26].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: boardX + PLAYER_YARD_SIZE * 2 + SMALL_BOX_SIZE * 2,
    y: boardY + PLAYER_YARD_SIZE + SMALL_BOX_SIZE * i
  }))

  const squares28to32 = [27, 28, 29, 30, 31].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: boardX + PLAYER_YARD_SIZE + SMALL_BOX_SIZE * (7 - i),
    y: boardY + PLAYER_YARD_SIZE + SMALL_BOX_SIZE * 2,
    fill: i === 0 ? colors.H3 : null
  }))

  const squares33to37 = [32, 33, 34, 35, 36].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: boardX + PLAYER_YARD_SIZE + SMALL_BOX_SIZE * 2,
    y: boardY + PLAYER_YARD_SIZE + SMALL_BOX_SIZE * (3 + i)
  }))

  const squares38to40 = [37, 38, 39].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: boardX + PLAYER_YARD_SIZE + SMALL_BOX_SIZE * (2 - i),
    y: boardY + PLAYER_YARD_SIZE + SMALL_BOX_SIZE * 8
  }))

  const squares41to45 = [40, 41, 42, 43, 44].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: boardX + PLAYER_YARD_SIZE,
    y: boardY + PLAYER_YARD_SIZE + SMALL_BOX_SIZE * (7 - i),
    fill: i === 0 ? colors.H4 : null
  }))

  const squares46to45 = [45, 46, 47, 48, 49].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: boardX + PLAYER_YARD_SIZE - SMALL_BOX_SIZE * (1 + i),
    y: boardY + PLAYER_YARD_SIZE + SMALL_BOX_SIZE * 2
  }))

  const squares51to53 = [50, 51, 52].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: boardX,
    y: boardY + PLAYER_YARD_SIZE + SMALL_BOX_SIZE * (2 - i)
  }))

  const winTriangles = [
    {
      seat: 1,
      group: 'WIN_TRIANGLE',
      points: [
        boardX + PLAYER_YARD_SIZE,
        boardY + PLAYER_YARD_SIZE,
        boardX + PLAYER_YARD_SIZE,
        boardY + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
        boardX + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME / 2,
        boardY + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME / 2
      ],
      fill: colors.H1,
      positionNumber: 1
    },
    {
      seat: 2,
      group: 'WIN_TRIANGLE',
      points: [
        boardX + PLAYER_YARD_SIZE,
        boardY + PLAYER_YARD_SIZE,
        boardX + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
        boardY + PLAYER_YARD_SIZE,
        boardX + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME / 2,
        boardY + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME / 2
      ],
      fill: colors.H2,
      positionNumber: 1
    },
    {
      seat: 3,
      group: 'WIN_TRIANGLE',
      points: [
        boardX + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
        boardY + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
        boardX + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
        boardY + PLAYER_YARD_SIZE,
        boardX + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME / 2,
        boardY + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME / 2
      ],
      fill: colors.H3,
      positionNumber: 1
    },
    {
      seat: 4,
      group: 'WIN_TRIANGLE',
      points: [
        boardX + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
        boardY + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
        boardX + PLAYER_YARD_SIZE,
        boardY + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME,
        boardX + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME / 2,
        boardY + PLAYER_YARD_SIZE + WIDTH_OF_SQUARES_ALONG_HOME / 2
      ],
      fill: colors.H4,
      positionNumber: 1
    }
  ]

  const safeSquareStars = [
    {
      ...squares1to5[0],
      group: 'SAFE_SQUARE_STAR'
    },
    {
      ...squares14to18[0],
      group: 'SAFE_SQUARE_STAR'
    },
    {
      ...squares41to45[0],
      group: 'SAFE_SQUARE_STAR'
    },
    {
      ...squares28to32[0],
      group: 'SAFE_SQUARE_STAR'
    }
  ]
  return [
    ...playerHomes,
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
    ...squares51to53,
    ...winTriangles,
    ...safeSquareStars
  ]
}
