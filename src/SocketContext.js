import React from 'react'
import Socket from './api/socket'

const socket = new Socket()
socket.connect()
const SocketContext = React.createContext(socket)

export default SocketContext
