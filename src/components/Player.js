import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { SEAT_COLORS } from '../constants/colors'
import { DESKTOP_BREAKPOINT } from '../styles/breakpoints'
import { COLORS } from '../styles/colors'
import px2vw from '../utils/px2vw'

const BASE_SIZE_MOBILE = 75
const PLAYER_CIRCLE_SIZE_MOBILE = px2vw(BASE_SIZE_MOBILE)
const PLAYER_LETTER_SIZE_MOBILE = px2vw(BASE_SIZE_MOBILE / 2)

const BASE_SIZE_DESKTOP = BASE_SIZE_MOBILE * 2
const PLAYER_CIRCLE_SIZE_DESKTOP = px2vw(BASE_SIZE_DESKTOP)
const PLAYER_LETTER_SIZE_DESKTOP = px2vw(BASE_SIZE_DESKTOP / 2)

const PlayerStyledDiv = styled.div`
  width: ${PLAYER_CIRCLE_SIZE_MOBILE};
  height: ${PLAYER_CIRCLE_SIZE_MOBILE};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${px2vw(10)};
  padding: ${px2vw(10)};
  font-size: ${PLAYER_LETTER_SIZE_MOBILE};
  text-transform: uppercase;
  border: 5px solid ${props => SEAT_COLORS[props.seat] || 'black'};
  color: ${props => (props.active ? COLORS.WHITE : SEAT_COLORS[props.seat])};
  border-radius: 50%;
  background-color: ${props =>
    props.active ? SEAT_COLORS[props.seat] : COLORS.TRANSPARENT};
  font-weight: bold;
  white-space: nowrap;

  @media (min-width: ${DESKTOP_BREAKPOINT}px) {
    width: ${PLAYER_CIRCLE_SIZE_DESKTOP};
    height: ${PLAYER_CIRCLE_SIZE_DESKTOP};
    font-size: ${PLAYER_LETTER_SIZE_DESKTOP};
  }
`
const findBySeat = seat => p => p.seat === seat

const Player = props => {
  const { seat } = props
  const { currentPlayerSeat, players = [] } = useSelector(state => state.game)
  const player = players.find(findBySeat(seat))
  const isInTurn = player?.seat === currentPlayerSeat
  return (
    <PlayerStyledDiv active={isInTurn} seat={player && seat}>
      {player?.name.substr(0, 1)}
    </PlayerStyledDiv>
  )
}

export default Player
