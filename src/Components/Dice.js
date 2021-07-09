import React from 'react'
import styled from 'styled-components'

import { flexCenteredWrap } from '../styles/flex'

const DICE_SIZE = 50
const MARGINS_TO_NUMBER_MAP = [undefined, 0, 4, 2, 4, 2, 2]

const Dice = styled.div`
  ${flexCenteredWrap}
  width: ${props => `${props.size || DICE_SIZE}px`};
  height: ${props => `${props.size || DICE_SIZE}px`};
  border-radius: 5px;
  background: white;
`

const DiceDot = styled.div`
  flex-basis: 20%;
  height: 25%;
  background: black;
  border-radius: 50%;
  margin: 0 ${props => MARGINS_TO_NUMBER_MAP[props.number]}px;
`

const DiceWrapper = props => (
  <Dice {...props}>
    {[1, 2, 3, 4, 5, 6]
      .filter(n => n <= props.number)
      .map(n => (
        <DiceDot {...props} key={n} />
      ))}
  </Dice>
)

export default DiceWrapper
