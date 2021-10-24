import { createGlobalStyle } from 'styled-components'
import { DESKTOP_BREAKPOINT, TABLET_BREAKPOINT } from './breakpoints'
import px2vw from '../utils/px2vw'

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
      font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      font-size: ${px2vw(8)};

      @media (min-width: ${TABLET_BREAKPOINT}px) {
          font-size: ${px2vw(10)};
      }

      @media (min-width: ${DESKTOP_BREAKPOINT}px) {
          font-size: ${px2vw(12)};
      }
    }
`

export default Global
