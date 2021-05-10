export const getPlayerHomeInnerSquare = (home, margin) => {
  return {
    id: `${home.id}IS`,
    x: home.x + margin / 2,
    y: home.y + margin / 2,
    margin
  }
}

export const getPlayerHomeSquares = (
  homeInnerSquare,
  playerHomeSize,
  smallBoxSize
) => {
  return [
    {
      id: `${homeInnerSquare.id}HS1`,
      x: homeInnerSquare.x + playerHomeSize / 6 + smallBoxSize / 2,
      y: homeInnerSquare.y + playerHomeSize / 6 + smallBoxSize / 2
    },
    {
      id: `${homeInnerSquare.id}HS2`,
      x: homeInnerSquare.x + playerHomeSize / 2 + smallBoxSize / 2,
      y: homeInnerSquare.y + playerHomeSize / 2 + smallBoxSize / 2
    },
    {
      id: `${homeInnerSquare.id}HS3`,
      x: homeInnerSquare.x + playerHomeSize / 2 + smallBoxSize / 2,
      y: homeInnerSquare.y + playerHomeSize / 6 + smallBoxSize / 2
    },
    {
      id: `${homeInnerSquare.id}HS4`,
      x: homeInnerSquare.x + playerHomeSize / 6 + smallBoxSize / 2,
      y: homeInnerSquare.y + playerHomeSize / 2 + smallBoxSize / 2
    }
  ]
}
