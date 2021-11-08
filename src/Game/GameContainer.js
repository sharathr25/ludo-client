import styled from 'styled-components'
import { DESKTOP_BREAKPOINT } from '../styles/breakpoints'

const GameContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.25fr 0.5fr 2fr 0.5fr 0.25fr;
  grid-template-areas:
    'header header'
    'player-1 player-2'
    'stage stage'
    'player-4 player-3'
    'footer footer';
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: black;

  .header {
    grid-area: header;
    padding: 0.1rem;
  }

  .player-1 {
    grid-area: player-1;
    justify-self: start;
    @media (min-width: ${DESKTOP_BREAKPOINT}px) {
      justify-self: end;
    }
  }

  .player-2 {
    grid-area: player-2;
    justify-self: end;
    @media (min-width: ${DESKTOP_BREAKPOINT}px) {
      justify-self: start;
    }
  }

  .player-3 {
    grid-area: player-3;
    justify-self: end;
    @media (min-width: ${DESKTOP_BREAKPOINT}px) {
      justify-self: start;
    }
  }

  .player-4 {
    grid-area: player-4;
    justify-self: start;
    @media (min-width: ${DESKTOP_BREAKPOINT}px) {
      justify-self: end;
    }
  }

  .stage {
    grid-area: stage;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .footer {
    grid-area: footer;
  }

  @media (min-width: ${DESKTOP_BREAKPOINT}px) {
    grid-template-columns: 0.5fr 1fr 0.5fr;
    grid-template-rows: 0.25fr 0.5fr 0.25fr 0.5fr 0.25fr;
    grid-template-areas:
      'header header header'
      'player-1 stage player-2'
      '. stage .'
      'player-4 stage player-3'
      'footer footer footer';
  }
`

export default GameContainer
