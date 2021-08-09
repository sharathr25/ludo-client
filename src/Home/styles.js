import styled from 'styled-components'
import { DESKTOP_BREAKPOINT } from '../constants/sizes'
import { flexColumnCentered } from '../styles/flex'

export const DummyPlayerYards = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100vh;
  @media only screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
    flex-direction: row;
  }
`

export const DummyPlayerYard = styled.div`
  ${flexColumnCentered}
  flex: 1 1 25%;
  height: 50vh;
  background-color: ${props => props.backgroundColor};
  @media only screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
    flex: 0 0 50%;
  }
`
