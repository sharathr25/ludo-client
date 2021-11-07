import { SEAT_COLORS } from '../constants/colors'
import { getCommunitySquareSize, getPlayerYardSize } from '../logic/sizes'
import { PLAYER_YARD_COLORS } from './constants'

function getPlayerHomeSquares (home, playerHomeSize, communitySquareSize) {
  return [
    {
      positionNumber: 1,
      group: 'HOME',
      seat: home.seat,
      x: home.x + playerHomeSize / 6 + communitySquareSize / 2,
      y: home.y + playerHomeSize / 6 + communitySquareSize / 2,
      fill: SEAT_COLORS[home.seat]
    },
    {
      positionNumber: 2,
      group: 'HOME',
      seat: home.seat,
      x: home.x + playerHomeSize / 2 + communitySquareSize / 2,
      y: home.y + playerHomeSize / 2 + communitySquareSize / 2,
      fill: SEAT_COLORS[home.seat]
    },
    {
      positionNumber: 3,
      group: 'HOME',
      seat: home.seat,
      x: home.x + playerHomeSize / 2 + communitySquareSize / 2,
      y: home.y + playerHomeSize / 6 + communitySquareSize / 2,
      fill: SEAT_COLORS[home.seat]
    },
    {
      positionNumber: 4,
      group: 'HOME',
      seat: home.seat,
      x: home.x + playerHomeSize / 6 + communitySquareSize / 2,
      y: home.y + playerHomeSize / 2 + communitySquareSize / 2,
      fill: SEAT_COLORS[home.seat]
    }
  ]
}

export default function (boardSize) {
  const ORIGIN_X = 0
  const ORIGIN_Y = 0
  const playerYardSize = getPlayerYardSize(boardSize)
  const communitySquareSize = getCommunitySquareSize(boardSize)

  const playerHomes = [
    {
      x: ORIGIN_X,
      y: ORIGIN_Y,
      fill: PLAYER_YARD_COLORS.H1,
      seat: 1,
      group: 'PLAYER_YARD'
    },
    {
      x: ORIGIN_X + playerYardSize + playerYardSize / 2,
      y: ORIGIN_Y,
      fill: PLAYER_YARD_COLORS.H2,
      seat: 2,
      group: 'PLAYER_YARD'
    },
    {
      x: ORIGIN_X + playerYardSize + playerYardSize / 2,
      y: ORIGIN_Y + playerYardSize + playerYardSize / 2,
      fill: PLAYER_YARD_COLORS.H3,
      seat: 3,
      group: 'PLAYER_YARD'
    },
    {
      x: ORIGIN_X,
      y: ORIGIN_Y + playerYardSize + playerYardSize / 2,
      fill: PLAYER_YARD_COLORS.H4,
      seat: 4,
      group: 'PLAYER_YARD'
    }
  ]

  const playerHomeSquares = playerHomes
    .map(playerHomeSquare =>
      getPlayerHomeSquares(
        playerHomeSquare,
        playerYardSize,
        communitySquareSize
      )
    )
    .flat()

  const playerHome1ColumnSquares = [1, 2, 3, 4, 5].map((n, i) => ({
    positionNumber: n,
    group: 'HOME_COLUMN',
    seat: 1,
    x: ORIGIN_X + playerYardSize - communitySquareSize * (5 - i),
    y: ORIGIN_Y + playerYardSize + communitySquareSize,
    fill: PLAYER_YARD_COLORS.H1
  }))

  const playerHome2ColumnSquares = [1, 2, 3, 4, 5].map((n, i) => ({
    positionNumber: n,
    group: 'HOME_COLUMN',
    seat: 2,
    x: ORIGIN_X + playerYardSize + communitySquareSize,
    y: ORIGIN_Y + communitySquareSize * (1 + i),
    fill: PLAYER_YARD_COLORS.H2
  }))

  const playerHome3ColumnSquares = [1, 2, 3, 4, 5].map((n, i) => ({
    positionNumber: n,
    group: 'HOME_COLUMN',
    seat: 3,
    x: ORIGIN_X + playerYardSize + communitySquareSize * (7 - i),
    y: ORIGIN_Y + playerYardSize + communitySquareSize,
    fill: PLAYER_YARD_COLORS.H3
  }))

  const playerHome4ColumnSquares = [1, 2, 3, 4, 5].map((n, i) => ({
    positionNumber: n,
    group: 'HOME_COLUMN',
    seat: 4,
    x: ORIGIN_X + playerYardSize + communitySquareSize,
    y: ORIGIN_Y + playerYardSize + communitySquareSize * (7 - i),
    fill: PLAYER_YARD_COLORS.H4
  }))

  const squares1to5 = [1, 2, 3, 4, 5].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: ORIGIN_X + playerYardSize - communitySquareSize * (5 - i),
    y: ORIGIN_Y + playerYardSize,
    fill: i === 0 ? PLAYER_YARD_COLORS.H1 : null
  }))

  const squares6to10 = [6, 7, 8, 9, 10].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: ORIGIN_X + playerYardSize,
    y: ORIGIN_Y + playerYardSize - communitySquareSize * (i + 1)
  }))

  const squares11to13 = [11, 12, 13].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: ORIGIN_X + playerYardSize + communitySquareSize * i,
    y: ORIGIN_Y
  }))

  const squares14to18 = [14, 15, 16, 17, 18].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: ORIGIN_X + playerYardSize + communitySquareSize * 2,
    y: ORIGIN_Y + communitySquareSize * (1 + i),
    fill: i === 0 ? PLAYER_YARD_COLORS.H2 : null
  }))

  const squares19to24 = [19, 20, 21, 22, 23].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: ORIGIN_X + playerYardSize + communitySquareSize * (3 + i),
    y: ORIGIN_Y + playerYardSize
  }))

  const squares25to27 = [24, 25, 26].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: ORIGIN_X + playerYardSize * 2 + communitySquareSize * 2,
    y: ORIGIN_Y + playerYardSize + communitySquareSize * i
  }))

  const squares28to32 = [27, 28, 29, 30, 31].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: ORIGIN_X + playerYardSize + communitySquareSize * (7 - i),
    y: ORIGIN_Y + playerYardSize + communitySquareSize * 2,
    fill: i === 0 ? PLAYER_YARD_COLORS.H3 : null
  }))

  const squares33to37 = [32, 33, 34, 35, 36].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: ORIGIN_X + playerYardSize + communitySquareSize * 2,
    y: ORIGIN_Y + playerYardSize + communitySquareSize * (3 + i)
  }))

  const squares38to40 = [37, 38, 39].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: ORIGIN_X + playerYardSize + communitySquareSize * (2 - i),
    y: ORIGIN_Y + playerYardSize + communitySquareSize * 8
  }))

  const squares41to45 = [40, 41, 42, 43, 44].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: ORIGIN_X + playerYardSize,
    y: ORIGIN_Y + playerYardSize + communitySquareSize * (7 - i),
    fill: i === 0 ? PLAYER_YARD_COLORS.H4 : null
  }))

  const squares46to45 = [45, 46, 47, 48, 49].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: ORIGIN_X + playerYardSize - communitySquareSize * (1 + i),
    y: ORIGIN_Y + playerYardSize + communitySquareSize * 2
  }))

  const squares51to53 = [50, 51, 52].map((n, i) => ({
    positionNumber: n,
    group: 'COMMUNITY',
    x: ORIGIN_X,
    y: ORIGIN_Y + playerYardSize + communitySquareSize * (2 - i)
  }))

  const winTriangles = [
    {
      seat: 1,
      group: 'WIN_TRIANGLE',
      points: [
        ORIGIN_X + playerYardSize,
        ORIGIN_Y + playerYardSize,
        ORIGIN_X + playerYardSize,
        ORIGIN_Y + playerYardSize + playerYardSize / 2,
        ORIGIN_X + playerYardSize + playerYardSize / 4,
        ORIGIN_Y + playerYardSize + playerYardSize / 4
      ],
      fill: PLAYER_YARD_COLORS.H1,
      positionNumber: 1
    },
    {
      seat: 2,
      group: 'WIN_TRIANGLE',
      points: [
        ORIGIN_X + playerYardSize,
        ORIGIN_Y + playerYardSize,
        ORIGIN_X + playerYardSize + playerYardSize / 2,
        ORIGIN_Y + playerYardSize,
        ORIGIN_X + playerYardSize + playerYardSize / 4,
        ORIGIN_Y + playerYardSize + playerYardSize / 4
      ],
      fill: PLAYER_YARD_COLORS.H2,
      positionNumber: 1
    },
    {
      seat: 3,
      group: 'WIN_TRIANGLE',
      points: [
        ORIGIN_X + playerYardSize + playerYardSize / 2,
        ORIGIN_Y + playerYardSize + playerYardSize / 2,
        ORIGIN_X + playerYardSize + playerYardSize / 2,
        ORIGIN_Y + playerYardSize,
        ORIGIN_X + playerYardSize + playerYardSize / 4,
        ORIGIN_Y + playerYardSize + playerYardSize / 4
      ],
      fill: PLAYER_YARD_COLORS.H3,
      positionNumber: 1
    },
    {
      seat: 4,
      group: 'WIN_TRIANGLE',
      points: [
        ORIGIN_X + playerYardSize + playerYardSize / 2,
        ORIGIN_Y + playerYardSize + playerYardSize / 2,
        ORIGIN_X + playerYardSize,
        ORIGIN_Y + playerYardSize + playerYardSize / 2,
        ORIGIN_X + playerYardSize + playerYardSize / 4,
        ORIGIN_Y + playerYardSize + playerYardSize / 4
      ],
      fill: PLAYER_YARD_COLORS.H4,
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
