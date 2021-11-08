import styled from 'styled-components'
import { COLORS } from '../styles/colors'
import px2vw from '../utils/px2vw'

const Button = styled.button`
  display: inline-block;
  padding: 0.5rem 2rem;
  margin: 0.5rem;
  border-radius: 0.25rem;
  text-decoration: none;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  color: ${props => (props.disabled ? COLORS.DARK_GRAY : COLORS.WHITE)};
  background-color: ${props =>
    props.disabled ? `${COLORS.PRIMARY}AB` : COLORS.PRIMARY};
  box-shadow: inset 0 -0.3rem 0 0 rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  min-width: ${px2vw(120)};
  border: 0;
`

export default Button
