import styled, { css } from 'styled-components'
import { ACTIONS_DIV_HEIGHT } from '../constants/sizes'
import { DESKTOP_BREAKPOINT } from '../styles/breakpoints'
import { flexColumnCentered } from '../styles/flex'

const SEAT_TO_DICE_POSITION = {
  1: css`
    top: 125px;
    left: 155px;
  `,
  2: css`
    top: 10%;
    left: 155px;
  `,
  3: css`
    bottom: 940px;
    right: 155px;
  `,
  4: css`
    bottom: 0;
    left: 0;
  `
}

export const GameContainer = styled.div`
  ${flexColumnCentered}
  height: 100vh;
  background-color: black;
`

export const PlayersAndBoard = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
    flex-direction: row;
    justify-content: center;
  }
`
export const Dice = styled.div`
  position: absolute;
  transition: all 1s linear;
  ${props => SEAT_TO_DICE_POSITION[props.currentPlayerSeat]}
`

export const TwoPlayers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media only screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
    align-self: flex-start;
    height: calc(100% - ${ACTIONS_DIV_HEIGHT}px);
    flex-direction: column;
    padding: 100px 0;
  }
`
export const StageAndDice = styled.div`
  position: relative;
`

export const StageAndActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
