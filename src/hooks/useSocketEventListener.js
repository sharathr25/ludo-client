import { useEffect } from 'react'

const useSocketEventListener = (socket, events = []) => {
  useEffect(() => {
    if (!socket?.channel?.topic) return
    events.forEach(({ eventName, cb }) => {
      socket.receive(eventName, cb)
    })
  }, [socket?.channel?.topic])
}

export default useSocketEventListener
