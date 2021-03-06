import React, { useRef } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import Game from './Game'
import store from './redux/store'
import Socket from './api/socket'
import SocketContext from './SocketContext'
import Global from './styles/global'
import Home from './Home'

import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const socket = useRef(new Socket())
  return (
    <>
      <Global />
      <ReduxProvider store={store}>
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
      </ReduxProvider>
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
