import styled from 'styled-components'

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  caret-color: white;
  color: white;
  background: transparent;
  border: none;
  border-bottom: 1px solid white;

  &:focus {
    outline-width: 0;
  }

  &::placeholder {
    color: white;
    opacity: 0.6;
  }
`

export default Input
