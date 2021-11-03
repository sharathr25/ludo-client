import React from 'react'
import styled from 'styled-components'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import CopyButton from './CopyButton'
import { COLORS } from '../styles/colors'

const CopyRoomCodeStyler = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${COLORS.WHITE};
    font-size: 1rem;
    .label-and-value {
        display: flex;
        flex-direction: column;
        .value {
            font-weight: bold;
        }
    }
}
`

const CopyRoomCode = ({ roomId }) => {
  const onCopy = () => {
    toast.info('Room code copied!!!', { position: 'top-right' })
  }

  return (
    <CopyRoomCodeStyler>
      <div className='label-and-value'>
        <div className='label'>ROOM ID</div>
        <div className='value'>{roomId}</div>
      </div>
      <div className='copy-btn'>
        <CopyToClipboard text={roomId} onCopy={onCopy}>
          <CopyButton />
        </CopyToClipboard>
      </div>
    </CopyRoomCodeStyler>
  )
}

export default CopyRoomCode
