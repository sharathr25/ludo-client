import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import StartGame from './StartGame'
import RollDice from './RollDice'
import { ACTIONS_DIV_HEIGHT } from '../constants/sizes'
import { COLORS } from '../styles/colors'
import { SEAT_COLORS } from '../constants/colors'
import px2vw from '../utils/px2vw'
import Button from './Button'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'

const PlayerActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${ACTIONS_DIV_HEIGHT}px;
  font-size: ${px2vw(30)};
  div {
    flex: 0 1 50%;
  }
`

const Text = styled.div`
  color: ${COLORS.WHITE};
`

const PlayerSeatNumber = styled.span`
  color: ${props => SEAT_COLORS[props.seat]};
  margin: ${px2vw(2)};
`

const PlayerActions = () => {
  const game = useSelector(state => state.game)
  const { players = [], gameStatus, hostId, currentPlayerSeat, roomId } = game
  const myId = sessionStorage.getItem('MY_ID')
  const myPlayer = players.find(p => p.id === myId)
  const isHost = myPlayer?.id === hostId
  const isInTurn = myPlayer?.seat === currentPlayerSeat

  const onCopy = () => {
    toast.info('Room code copied!!!', { position: 'bottom-right' })
  }

  return (
    <PlayerActionsWrapper>
      {isHost && <StartGame />}
      {gameStatus == 'ON_GOING' && isInTurn && <RollDice isInTurn={isInTurn} />}
      {gameStatus == 'ON_GOING' && !isInTurn && (
        <Text>
          Player
          <PlayerSeatNumber seat={currentPlayerSeat}>
            {currentPlayerSeat}
          </PlayerSeatNumber>
          turn
        </Text>
      )}
      <CopyToClipboard text={roomId} onCopy={onCopy}>
        <Button>COPY ROOM CODE</Button>
      </CopyToClipboard>
    </PlayerActionsWrapper>
  )
}

export default PlayerActions
