import styled from 'styled-components'
import { BOARD_CONTAINER_SIZE } from '../constants/sizes'
import { flexColumnCentered } from '../styles/flex'

const GameContainer = styled.div`
  ${flexColumnCentered}
  height: 100vh;
  background-color: black;

  .details-and-actions {
    min-height: 126px;
  }
  .two-players {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .players-and-board {
    max-width: ${BOARD_CONTAINER_SIZE};
    max-height: ${BOARD_CONTAINER_SIZE};
    margin: auto;
    display: flex;
  }
`

export default GameContainer
