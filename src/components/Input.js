import styled from 'styled-components'
import { DESKTOP_BREAKPOINT, TABLET_BREAKPOINT } from '../styles/breakpoints'

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  caret-color: white;
  color: white;
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  font-size: 1rem;

  &:focus {
    outline-width: 0;
  }

  &::placeholder {
    color: white;
    opacity: 0.6;
  }
`

export default Input
