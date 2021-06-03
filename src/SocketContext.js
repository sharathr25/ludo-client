import React from 'react'
import Socket from './api/socket'

const socket = new Socket()
const SocketContext = React.createContext(socket)

export default SocketContext
