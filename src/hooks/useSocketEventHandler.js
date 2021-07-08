import { useEffect } from 'react'

const useSocketEventHandler = (socket, events = []) => {
  useEffect(() => {
    if (!socket?.channel?.topic) return
    events.forEach(({ eventName, cb }) => {
      socket.receive(eventName, cb)
    })
  }, [[socket?.channel?.topic]])
}

export default useSocketEventHandler
