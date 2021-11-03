import React from 'react'
import styled from 'styled-components'

import Dice3D from './Dice3D'
import { flexCentered } from '../styles/flex'
import { COLORS } from '../styles/colors'

const HeadingWrapper = styled.div`
  ${flexCentered}
  color: ${COLORS.WHITE}
`

const LudoHero = () => (
  <HeadingWrapper>
    <h1>LUDO</h1>
    <Dice3D />
  </HeadingWrapper>
)

export default LudoHero
