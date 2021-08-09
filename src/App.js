import React, { useRef } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import GameRoom from './GameRoom'
import store from './redux/store'
import Socket from './api/socket'
import SocketContext from './SocketContext'
import Global from './styles/global'
import Home from './Home'

const App = () => {
  const socket = useRef(new Socket())
  return (
    <>
      <Global />
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
