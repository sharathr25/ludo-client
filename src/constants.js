export const NO_OF_SQUARES_BETWEEN_HOMES = 3
export const NO_OF_SQUARES_ALONG_HOMES = 6
export const SMALL_BOX_SIZE = 50
export const BOARD_SIZE =
  NO_OF_SQUARES_ALONG_HOMES * SMALL_BOX_SIZE * 2 +
  NO_OF_SQUARES_BETWEEN_HOMES * SMALL_BOX_SIZE
export const WIDTH_OF_SQUARES_ALONG_HOME =
  SMALL_BOX_SIZE * NO_OF_SQUARES_BETWEEN_HOMES
export const PLAYER_HOME_SIZE =
  BOARD_SIZE - BOARD_SIZE / 2 - WIDTH_OF_SQUARES_ALONG_HOME / 2
export const MARGIN_FOR_HOME_INNER_SQUARE = PLAYER_HOME_SIZE / 3
export const PLAYER_HOME_INNER_SQUARE_SIZE =
  PLAYER_HOME_SIZE - MARGIN_FOR_HOME_INNER_SQUARE

export const COLORS = {
  LIGHT_GRAY: '#f5f5f5',
  GREEN: 'green',
  RED: 'red',
  YELLOW: 'yellow',
  BLUE: 'blue',
  ORANGE: 'orange',
  WHITE: 'white',
  BLACK: 'black'
}
