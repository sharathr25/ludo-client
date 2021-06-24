import styled from 'styled-components'
import { BOARD_CONTAINER_SIZE } from '../constants/sizes'

const PlayersAndBoard = styled.div`
  max-width: ${BOARD_CONTAINER_SIZE};
  max-height: ${BOARD_CONTAINER_SIZE};
  margin: auto;
  display: flex;
`

export default PlayersAndBoard
