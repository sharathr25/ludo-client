export const PLAYER_JOINED_NOTIFY = 'PLAYER_JOINED_NOTIFY'
export const GET_GAME_STATE = 'GET_GAME_STATE'
export const GET_GAME_STATE_NOTIFY = 'GET_GAME_STATE_NOTIFY'
export const START_GAME = 'START_GAME'
export const START_GAME_NOTIFY = 'START_GAME_NOTIFY'
export const START_GAME_ERROR = 'START_GAME_ERROR'
export const ROLL_DICE = 'ROLL_DICE'
export const ROLL_DICE_NOTIFY = 'ROLL_DICE_NOTIFY'
export const ROLL_DICE_ERROR = 'ROLL_DICE_ERROR'
export const MOVE_PAWN = 'MOVE_PAWN'
export const MOVE_PAWN_NOTIFY = 'MOVE_PAWN_NOTIFY'

const roomReducer = (state, action) => {
  switch (action.type) {
    case PLAYER_JOINED_NOTIFY:
    case GET_GAME_STATE_NOTIFY:
    case START_GAME_NOTIFY:
      return action.payload
    default:
      return state
  }
}

export default roomReducer
