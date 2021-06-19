import { squares, winTriangles } from '../Components/Board'

export function getPlayerHomeInnerSquare (home, margin) {
  return {
    id: `${home.id}IS`,
    x: home.x + margin / 2,
    y: home.y + margin / 2,
    margin
  }
}

export function getPlayerHomeSquares (home, playerHomeSize, smallBoxSize) {
  return [
    {
      squareNumber: 1,
      group: 'HOME',
      seat: home.seat,
      x: home.x + playerHomeSize / 6 + smallBoxSize / 2,
      y: home.y + playerHomeSize / 6 + smallBoxSize / 2
    },
    {
      squareNumber: 2,
      group: 'HOME',
      seat: home.seat,
      x: home.x + playerHomeSize / 2 + smallBoxSize / 2,
      y: home.y + playerHomeSize / 2 + smallBoxSize / 2
    },
    {
      squareNumber: 3,
      group: 'HOME',
      seat: home.seat,
      x: home.x + playerHomeSize / 2 + smallBoxSize / 2,
      y: home.y + playerHomeSize / 6 + smallBoxSize / 2
    },
    {
      squareNumber: 4,
      group: 'HOME',
      seat: home.seat,
      x: home.x + playerHomeSize / 6 + smallBoxSize / 2,
      y: home.y + playerHomeSize / 2 + smallBoxSize / 2
    }
  ]
}

const getCentroid = points => {
  return {
    x: (points[0] + points[2] + points[4]) / 3 - 25,
    y: (points[1] + points[3] + points[5]) / 3 - 25
  }
}

export function getPath ({ currentPosition, prevPosition, seat }) {
  const START_SQUARES = [undefined, 1, 14, 27, 40]
  const END_SQUARES = [undefined, 51, 12, 25, 38]
  const BOARD_END_SQUARE = 52
  if (!prevPosition) {
    if (currentPosition.group !== 'WIN_TRIANGLE') {
      return [
        squares.find(
          s =>
            (s.seat ? s.seat === seat : true) &&
            s.squareNumber === currentPosition.squareNumber &&
            currentPosition.group === s.group
        )
      ]
    } else {
      const winTriangle = winTriangles.find(wt => wt.seat === seat)
      const { points } = winTriangle
      const centroid = getCentroid(points)
      return [{ ...winTriangle, ...centroid }]
    }
  }
  if (prevPosition.group === 'HOME' && currentPosition.group === 'COMMUNITY') {
    return [...range(START_SQUARES[seat], currentPosition.squareNumber)].map(
      n =>
        squares.find(
          s => s.squareNumber === n && currentPosition.group === s.group
        )
    )
  }
  if (
    prevPosition.group === 'COMMUNITY' &&
    currentPosition.group === 'HOME_COLUMN'
  ) {
    return [
      ...[...range(prevPosition.squareNumber + 1, END_SQUARES[seat])].map(n =>
        squares.find(s => s.squareNumber === n)
      ),
      ...[...range(1, currentPosition.squareNumber)].map(n =>
        squares.find(
          s =>
            s.squareNumber === n &&
            s.group === currentPosition.group &&
            s.seat === seat
        )
      )
    ]
  }
  if (
    prevPosition.group === 'COMMUNITY' &&
    currentPosition.group === 'WIN_TRIANGLE'
  ) {
    const winTriangle = winTriangles.find(wt => wt.seat === seat)
    const { points } = winTriangle
    const centroid = getCentroid(points)
    return [
      ...[...range(1, 5)].map(n =>
        squares.find(
          s =>
            s.squareNumber === n && s.group === 'HOME_COLUMN' && s.seat === seat
        )
      ),
      { ...winTriangle, ...centroid }
    ]
  }
  if (
    prevPosition.group === 'HOME_COLUMN' &&
    currentPosition.group === 'HOME_COLUMN'
  ) {
    return [
      ...range(prevPosition.squareNumber + 1, currentPosition.squareNumber)
    ].map(n =>
      squares.find(
        s =>
          s.squareNumber === n &&
          currentPosition.group === s.group &&
          s.seat === seat
      )
    )
  }
  if (
    prevPosition.group === 'HOME_COLUMN' &&
    currentPosition.group === 'WIN_TRIANGLE'
  ) {
    const winTriangle = winTriangles.find(wt => wt.seat === seat)
    const { points } = winTriangle
    const centroid = getCentroid(points)
    return [
      ...[...range(prevPosition.squareNumber + 1, 5)].map(n =>
        squares.find(
          s =>
            s.squareNumber === n &&
            s.group === prevPosition.group &&
            s.seat === seat
        )
      ),
      { ...winTriangle, ...centroid }
    ]
  }

  if (
    prevPosition.squareNumber <= BOARD_END_SQUARE &&
    currentPosition.squareNumber >= 1 &&
    currentPosition.squareNumber !== BOARD_END_SQUARE &&
    prevPosition.squareNumber > currentPosition.squareNumber
  ) {
    return [
      ...[...range(prevPosition.squareNumber + 1, BOARD_END_SQUARE)].map(n =>
        squares.find(
          s => s.squareNumber === n && currentPosition.group === s.group
        )
      ),
      ...[...range(1, currentPosition.squareNumber)].map(n =>
        squares.find(
          s => s.squareNumber === n && currentPosition.group === s.group
        )
      )
    ]
  }

  return [
    ...range(prevPosition.squareNumber + 1, currentPosition.squareNumber)
  ].map(n =>
    squares.find(s => s.squareNumber === n && currentPosition.group === s.group)
  )
}

export function * range (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}
