import { toast } from 'react-toastify'
import store from './store'
import { GAME_EVENTS } from '../constants/gameEvents'
import { ERROR_MSGS } from '../constants/texts'
import { updateGame, setCurrentPlayerSeat } from './gameSlice'

const DICE_ROLL_WAIT_TIME_IN_MS = 1000
const {
  GET_GAME_STATE_NOTIFY,
  PLAYER_JOINED_NOTIFY,
  MOVE_PAWN_NOTIFY,
  ROLL_DICE_NOTIFY,
  START_GAME_NOTIFY,
  START_GAME_ERROR
} = GAME_EVENTS
const { dispatch } = store

const dispatchReduxEvent = action => {
  const { type, payload } = action
  switch (type) {
    case START_GAME_NOTIFY:
    case MOVE_PAWN_NOTIFY:
    case PLAYER_JOINED_NOTIFY:
    case GET_GAME_STATE_NOTIFY:
      dispatch(updateGame(payload))
      break
    case ROLL_DICE_NOTIFY:
      const { currentPlayerSeat, ...rest } = payload
      dispatch(updateGame(rest))
      setTimeout(
        () => dispatch(setCurrentPlayerSeat(payload.currentPlayerSeat)),
        DICE_ROLL_WAIT_TIME_IN_MS
      )
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
