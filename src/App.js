import React, { useRef } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { Provider } from 'react-redux'

import GameRoom from './GameRoom'
import Home from './Home'
import store from './redux/store'
import Socket from './api/socket'
import SocketContext from './SocketContext'

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
  const socket = useRef(new Socket())
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <SocketContext.Provider value={socket.current}>
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
        </SocketContext.Provider>
      </Provider>
    </>
  )
}

export default App
