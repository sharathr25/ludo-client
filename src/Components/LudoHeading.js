import React from 'react'
import styled from 'styled-components'

const Heading = styled.div`
  display: inline-block;
   color: white;
  letter-spacing: 20px;
  font-size: 60px;
`

const Dice = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background: white;
  padding: 6px;
`

const DiceDot = styled.div`
  width: 8px;
  height: 8px;
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
