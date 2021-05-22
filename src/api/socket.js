import { Socket as PhoenixSocket } from 'phoenix'

const WEBSOCKET_URL = 'ws://localhost:4000/socket'

class Socket {
  constructor () {}

  connect () {
    if (this.isSocketConnected()) return this.socket
    this.socket = new PhoenixSocket(WEBSOCKET_URL, {})
    this.socket.connect()
  }

  joinChannel (channelName) {
    return new Promise((resolve, reject) => {
      this.channel = this.socket.channel(channelName)
      this.channel
        .join()
        .receive('ok', response => {
          console.log('joined room')
          resolve(response)
        })
        .receive('error', error => {
          console.error(`error when trying to join ${roomToken}`, error)
          reject(error)
        })
        .receive('timeout', () =>
          console.log('time out, some problem with network')
        )
      this.channel.onClose(() => {
        console.log(`${channelName} closed`)
      })
    })
  }

  leaveChannel () {
    return new Promise((resolve, reject) => {
      this.channel
        .leave()
        .receive('ok', response => {
          console.log('left channel')
          resolve(response)
        })
        .receive('error', error => {
          console.error('error when trying to leave room', error)
          reject(error)
        })
        .receive('timeout', () =>
          console.log('time out, some problem with network')
        )
    })
  }

  send (event, data) {
    return new Promise((resolve, reject) => {
      this.channel
        .push(event, data)
        .receive('ok', response => {
          resolve(response)
        })
        .receive('error', error => {
          console.error(`receiving data for ${action} failed`, error)
          reject(error)
        })
        .receive('timeout', () =>
          console.log('time out, some problem with network')
        )
    })
  }

  receive (event, cb) {
    this.channel && this.channel.on(event, cb)
  }

  isSocketConnected () {
    this.socket && this.socket.isConnected()
  }
}

export default Socket
