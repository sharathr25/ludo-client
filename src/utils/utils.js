import { squares } from '../Components/Board'

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

export function getPath (
  currentPosition,
  prevPosition = currentPosition,
  seat
) {
  return [
    ...range(prevPosition.squareNumber, currentPosition.squareNumber)
  ].map(n => squares.find(s => s.squareNumber === n))
}

export function * range (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}
