import React from 'react'
import styled from 'styled-components'
import Dice from './Dice'

const Heading = styled.div`
  display: inline-block;
   color: white;
  letter-spacing: 20px;
  font-size: 60px;
`

const LudoHero = props => (
  <div className='flex-centered'>
    <Heading>LUDO</Heading>
    <Dice number={Math.floor(Math.random() * 6) + 1} />
  </div>
)

export default LudoHero
