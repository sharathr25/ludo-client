import styled from 'styled-components'
import px2vw from '../utils/px2vw'

const Button = styled.button`
  display: inline-block;
  padding: 0.5rem 2rem;
  margin: 0.5rem;
  border-radius: 0.15rem;
  text-decoration: none;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  color: #ffffff;
  background-color: ${props => (props.disabled ? '#8264b7' : '#673ab7')};
  box-shadow: inset 0 -0.6rem 0 -0.35rem rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  min-width: ${px2vw(120)};
`

export default Button
