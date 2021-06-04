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

export function getPath ({ currentPosition, prevPosition, seat }) {
  const END_SQUARES = [undefined, 51, 12, 25, 38]
  if (!prevPosition) {
    return [squares.find(s => s.squareNumber === currentPosition.squareNumber)]
  }
  if (prevPosition.group === 'HOME' && currentPosition.group === 'COMMUNITY') {
    return [...range(1, currentPosition.squareNumber)].map(n =>
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
      ...[...range(prevPosition.squareNumber, END_SQUARES[seat])].map(n =>
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
    prevPosition.group === 'HOME_COLUMN' &&
    currentPosition.group === 'WIN_TRIANGLE'
  ) {
    return [
      ...[...range(prevPosition.squareNumber, 5)].map(n =>
        squares.find(
          s =>
            s.squareNumber === n &&
            s.group === prevPosition.group &&
            s.seat === seat
        )
      ),
      winTriangles.find(wt => wt.seat === seat) // TODO: for triangles we have points so need to return a single point
    ]
  }

  return [
    ...range(prevPosition.squareNumber, currentPosition.squareNumber)
  ].map(n =>
    squares.find(s => s.squareNumber === n && currentPosition.group === s.group)
  )
}

export function * range (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}
