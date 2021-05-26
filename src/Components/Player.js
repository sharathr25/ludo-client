import styled from 'styled-components'
import { SEAT_COLORS } from '../constants'

const Player = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px;
  padding: 10px;
  border: 2px solid ${props => SEAT_COLORS[props.seat] || 'black'};
  border-radius: 50%;
  background-color: ${props =>
    props.active ? SEAT_COLORS[props.seat] : 'transparent'};
  font-weight: bold;
  white-space: nowrap;
`

export default Player
