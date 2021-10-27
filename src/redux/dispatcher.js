import store from './store'
import { GAME_EVENTS } from '../constants/gameEvents'
import { updateGame } from './gameSlice'

const {
  GET_GAME_STATE_NOTIFY,
  PLAYER_JOINED_NOTIFY,
  MOVE_PAWN_NOTIFY,
  ROLL_DICE_NOTIFY,
  START_GAME_NOTIFY,
  START_GAME_ERROR
} = GAME_EVENTS

const dispatchReduxEvent = action => {
  const { type, payload } = action
  const { dispatch } = store
  switch (type) {
    case START_GAME_NOTIFY:
    case MOVE_PAWN_NOTIFY:
    case PLAYER_JOINED_NOTIFY:
    case GET_GAME_STATE_NOTIFY:
      dispatch(updateGame(payload))
      break
    case ROLL_DICE_NOTIFY:
      dispatch(updateGame(payload))
      break
    case START_GAME_ERROR:
      if (ERROR_MSGS[payload.reason]) {
        toast.error(ERROR_MSGS[payload.reason])
      } else {
        console.error(payload)
      }
      break
    default:
      break
  }
}

export default dispatchReduxEvent
