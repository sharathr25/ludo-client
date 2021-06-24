export const BOARD_CONTAINER_SIZE = 750
export const NO_OF_SQUARES_BETWEEN_HOMES = 3
export const NO_OF_SQUARES_ALONG_HOMES = 6
export const SMALL_BOX_SIZE = 50
export const BOARD_SIZE =
  NO_OF_SQUARES_ALONG_HOMES * SMALL_BOX_SIZE * 2 +
  NO_OF_SQUARES_BETWEEN_HOMES * SMALL_BOX_SIZE
export const WIDTH_OF_SQUARES_ALONG_HOME =
  SMALL_BOX_SIZE * NO_OF_SQUARES_BETWEEN_HOMES
export const PLAYER_YARD_SIZE =
  BOARD_SIZE - BOARD_SIZE / 2 - WIDTH_OF_SQUARES_ALONG_HOME / 2
export const MARGIN_FOR_HOME_INNER_SQUARE = PLAYER_YARD_SIZE / 3
export const PLAYER_HOME_INNER_SQUARE_SIZE =
  PLAYER_YARD_SIZE - MARGIN_FOR_HOME_INNER_SQUARE
export const DISTANCE_TO_CENTER = SMALL_BOX_SIZE / 2
export const PAWN_RADIUS = SMALL_BOX_SIZE / 5
