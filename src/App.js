import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { Provider } from 'react-redux'
import GameRoom from './GameRoom'
import Home from './Home'
import store from './redux/store'

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    margin: 0;
  }
`

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/room/:roomId'>
              <GameRoom />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </>
  )
}

export default App
