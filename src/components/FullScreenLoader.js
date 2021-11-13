import React from 'react'
import styled from 'styled-components'
import Loader from './Loader'

const FullScreenLoaderStyler = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000a8;
`

const FullScreenLoader = () => {
  return (
    <FullScreenLoaderStyler>
      <h1>LOADING</h1>
      <Loader />
    </FullScreenLoaderStyler>
  )
}

export default FullScreenLoader
