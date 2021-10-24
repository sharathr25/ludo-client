import styled from 'styled-components'
import px2vw from '../utils/px2vw'

const Button = styled.button`
  display: inline-block;
   padding: 0.5em 2em;
  margin: 0.5em;
   border-radius: 0.15em;
   box-sizing: border-box;
   text-decoration: none;
  font-size: 1.5rem;
   font-family: 'Roboto', sans-serif;
   text-transform: uppercase;
   font-weight: bold;
   color: #ffffff;
   background-color: ${props => (props.disabled ? '#8264b7' : '#673ab7')};
   box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
   text-align: center;
   position: relative;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  min-width: ${px2vw(120)};
`

export default Button
