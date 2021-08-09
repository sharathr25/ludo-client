import styled, { css } from 'styled-components'
import { DESKTOP_BREAKPOINT } from '../constants/sizes'
import { flexColumnCentered } from '../styles/flex'

const SEAT_TO_DICE_POSITION = {
  1: css`
    top: 125px;
    left: 155px;
    @media only screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
      top: 160px;
      left: 65px;
    }
  `,
  2: css`
    top: 10%;
    left: 155px;
    @media only screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
      top: 160px;
      left: 998px;
    }
  `,
  3: css`
    top: 940px;
    right: 155px;
    @media only screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
      top: 540px;
      left: 998px;
    }
  `,
  4: css`
    @media only screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
      top: 540px;
      left: 65px;
    }
  `
}

const GameContainer = styled.div`
  ${flexColumnCentered}
  height: 100vh;
  background-color: black;
  .details-and-actions {
    display: flex;
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
  }
`

export default GameContainer
