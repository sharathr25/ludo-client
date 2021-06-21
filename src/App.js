import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import GameRoom from './GameRoom'
import Home from './Home'
import store from './redux/store'

const App = () => {
  return (
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
  )
}

export default App
