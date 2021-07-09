import styled from 'styled-components'

import { flexCentered } from '../styles/flex'

const DummyPlayerYard = styled.div`
  display: flex;
  flex: 0 0 50%;
  height: 50vh;
  background-color: ${props => props.backgroundColor};
  .flex-centered {
    ${flexCentered}
  }
`

export default DummyPlayerYard
