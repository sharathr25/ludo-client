export const getCommunitySquareSize = boardSize => boardSize / 15
export const getPawnRadius = boardSize => boardSize / 60
export const getPlayerYardSize = boardSize => {
  const NO_OF_SQUARES_ALONG_HOMES = 6
  return NO_OF_SQUARES_ALONG_HOMES * getCommunitySquareSize(boardSize)
}
