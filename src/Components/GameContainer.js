import styled, { css } from 'styled-components'
import { DESKTOP_BREAKPOINT } from '../constants/sizes'
import { flexColumnCentered } from '../styles/flex'

const SEAT_TO_DICE_POSITION = {
  1: css`
    top: 155px;
    left: 120px;
  `,
  2: css`
    top: 155px;
    left: 940px;
  `,
  3: css`
    top: 550px;
    left: 940px;
  `,
  4: css`
    top: 550px;
    left: 120px;
  `
}

const GameContainer = styled.div`
  ${flexColumnCentered}
  height: 100vh;
  background-color: black;
  .details-and-actions {
    min-height: 126px;
    margin-bottom: 25px;
  }
  .two-players {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media only screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
      flex-direction: column;
    }
  }
  .players-and-board {
    position: relative;
    display: flex;
    flex-direction: column;
    .dice {
      position: absolute;
      transition: all 1s linear;
      ${props => SEAT_TO_DICE_POSITION[props.currentPlayerSeat]}
    }
    @media only screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
      flex-direction: row;
    }
  }
`

export default GameContainer
