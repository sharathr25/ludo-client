import React from 'react'
import styled from 'styled-components'
import Dice3D from './Dice3D'

const Heading = styled.div`
  display: inline-block;
   color: white;
  letter-spacing: 20px;
  font-size: 60px;
`

const LudoHero = props => (
  <div className='flex-centered'>
    <Heading>LUDO</Heading>
    <Dice3D />
  </div>
)

export default LudoHero
