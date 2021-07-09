import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { SEAT_COLORS, COLORS } from '../constants/colors'

const PLAYER_CIRCLE_SIZE = 120

const PlayerStyledDiv = styled.div`
  width: ${PLAYER_CIRCLE_SIZE}px;
  height: ${PLAYER_CIRCLE_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px;
  padding: 10px;
  font-size: 50px;
  text-transform: uppercase;
  border: 5px solid ${props => SEAT_COLORS[props.player?.seat] || 'black'};
  color: ${props =>
    props.active ? COLORS.WHITE : SEAT_COLORS[props.player?.seat]};
  border-radius: 50%;
  background-color: ${props =>
    props.active ? SEAT_COLORS[props.player?.seat] : COLORS.TRANSPARENT};
  font-weight: bold;
  white-space: nowrap;
`

const Player = props => {
  const { currentPlayerSeat } = useSelector(state => state.game)
  const { player } = props
  const isInTurn = player?.seat === currentPlayerSeat
  return (
    <PlayerStyledDiv {...props} active={isInTurn}>
      {player?.name.substr(0, 1)}
    </PlayerStyledDiv>
  )
}

export default Player
