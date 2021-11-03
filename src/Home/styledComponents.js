import styled from 'styled-components'
import { DESKTOP_BREAKPOINT } from '../styles/breakpoints'
import { flexColumnCentered } from '../styles/flex'

export const DummyPlayerYards = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  height: 100vh;
  @media (min-width: ${DESKTOP_BREAKPOINT}px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
`

export const DummyPlayerYard = styled.div`
  ${flexColumnCentered}
  background-color: ${props => props.backgroundColor};
`
