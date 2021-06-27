import React from 'react'
import styled from 'styled-components'
import { flexCenteredWrap } from '../styles/flex'

const DICE_SIZE = 50
const DICE_DOT_SIZE = 8

const Heading = styled.div`
  display: inline-block;
   color: white;
  letter-spacing: 20px;
  font-size: 60px;
`

const Dice = styled.div`
  ${flexCenteredWrap}
  width: ${DICE_SIZE}px;
  height: ${DICE_SIZE}px;
  border-radius: 5px;
  background: white;
  padding: 6px;
`

const DiceDot = styled.div`
  width: ${DICE_DOT_SIZE}px;
  height: ${DICE_DOT_SIZE}px;
  background: black;
  border-radius: 4px;
  margin: 1px 2px;
`

const LudoHeading = props => (
  <div className='flex-centered'>
    <Heading {...props}>LUDO</Heading>
    <Dice>
      <DiceDot />
      <DiceDot />
      <DiceDot />
      <DiceDot />
      <DiceDot />
      <DiceDot />
    </Dice>
  </div>
)

export default LudoHeading
