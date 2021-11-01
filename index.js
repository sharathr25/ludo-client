import './wdyr'
import 'react-hot-loader'
import { hot } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/App'

const HotApp = hot(module)(App)

ReactDOM.render(<App />, document.getElementById('root'))
