export const getPlayerHomeInnerSquare = (home, margin) => {
  return {
    id: `${home.id}IS`,
    x: home.x + margin / 2,
    y: home.y + margin / 2,
    margin
  }
}

export const getPlayerHomeSquares = (home, playerHomeSize, smallBoxSize) => {
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
