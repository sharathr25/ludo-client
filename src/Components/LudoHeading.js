import React from 'react'
import styled from 'styled-components'
import Dice3D from './Dice3D'
import { flexCentered } from '../styles/flex'

const HeadingWrapper = styled.div`
  ${flexCentered}
`

const Heading = styled.div`
  display: inline-block;
   color: white;
  letter-spacing: 20px;
  font-size: 60px;
`

const LudoHero = () => (
  <HeadingWrapper>
    <Heading>LUDO</Heading>
    <Dice3D />
  </HeadingWrapper>
)

export default LudoHero
