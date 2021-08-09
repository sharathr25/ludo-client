import styled from 'styled-components'
import { TABLET_BREAKPOINT } from '../constants/sizes'
import { DESKTOP_BREAKPOINT } from '../styles/breakpoints'
import { flexColumnCentered } from '../styles/flex'

export const DummyPlayerYards = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: ${window.innerHeight}px;

  @media (min-width: ${TABLET_BREAKPOINT}px) {
    flex-direction: row;
  }

  @media (min-width: ${DESKTOP_BREAKPOINT}px) {
    flex-direction: row;
  }
`

export const DummyPlayerYard = styled.div`
  ${flexColumnCentered}
  flex: 1 1 25%;
  background-color: ${props => props.backgroundColor};

  @media (min-width: ${TABLET_BREAKPOINT}px) {
    flex: 0 0 50%;
  }

  @media (min-width: ${DESKTOP_BREAKPOINT}px) {
    flex: 0 0 50%;
  }
`
