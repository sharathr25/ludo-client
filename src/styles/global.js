import { createGlobalStyle } from 'styled-components'
import { DESKTOP_BREAKPOINT, TABLET_BREAKPOINT } from './breakpoints'

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  *::after {
    box-sizing: border-box;
  }
  *::before { 
    box-sizing: border-box;
  }
  :root {
      font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      font-size: 100%;

      @media (min-width: ${TABLET_BREAKPOINT}px) {
        font-size: 110%;
      }

      @media (min-width: ${DESKTOP_BREAKPOINT}px) {
        font-size: 120%;
      }
    }

  h1 {
    font-size: 3.052rem;
  }

  h2 {
    font-size: 2.441rem;
  }

  h3 {
    font-size: 1.953rem;
  }
  
  h4 {
    font-size: 1.563rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }

  p {
    font-size: 1rem
  }
`

export default Global
