import React, { useRef } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import Game from './Game'
import store from './redux/store'
import Socket from './api/socket'
import SocketContext from './SocketContext'
import Global from './styles/global'
import Home from './Home'
import { ToastContainer } from 'react-toastify'

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
                <Game />
              </Route>
            </Switch>
          </Router>
        </SocketContext.Provider>
      </Provider>
      <ToastContainer
        position='top-left'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
