import React, { useContext, useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import GameRoom from './GameRoom'
import Home from './Home'
import SocketContext from './SocketContext'

const App = () => {
  return (
    <div>
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
    </div>
  )
}

export default App
