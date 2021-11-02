import styled from 'styled-components'
import { DESKTOP_BREAKPOINT } from '../styles/breakpoints'

export const GameContainer = styled.div`
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
  }

  .player-1 {
    grid-area: player-1;
  }

  .player-2 {
    grid-area: player-2;
    justify-self: end;
  }

  .player-3 {
    grid-area: player-3;
    justify-self: end;
  }

  .player-4 {
    grid-area: player-4;
  }

  .stage {
    grid-area: stage;
  }

  .footer {
    grid-area: footer;
  }

  @media (min-width: ${DESKTOP_BREAKPOINT}px) {
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 0.25fr 0.5fr 2fr 0.5fr 0.25fr;
    grid-template-areas:
      'header header header'
      'player-1 stage player-2'
      '. stage .'
      'player-4 stage player-3'
      'footer footer footer';
    justify-items: center;
  }
`
