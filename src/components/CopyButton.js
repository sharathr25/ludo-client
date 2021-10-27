import React from 'react'
import styled from 'styled-components'

const CopyButton = styled.button`
  width: 15px;
  height: 20px;
  background: transparent;
  border: 1px solid white;
  border-radius: 2px;
  box-shadow: 4px 4px 0px 0px white;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    border: 1px solid #673ab7;
    box-shadow: 4px 4px 0px 0px #673ab7;
  }
`

const CopyButtonWrapper = props => {
  return <CopyButton {...props} />
}

export default CopyButtonWrapper
