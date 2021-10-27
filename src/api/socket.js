import { Socket as PhoenixSocket } from 'phoenix'
import { WEBSOCKET_URL } from '../config'
import reduxEventDispacher from '../redux/dispatcher'

class Socket {
  constructor () {}

  connect (data) {
    this.socket = new PhoenixSocket(WEBSOCKET_URL, { params: data })
    if (this.isSocketConnected()) return this.socket
    this.socket.connect()
  }

  joinChannel (channelName) {
    return new Promise((resolve, reject) => {
      this.channel = this.socket.channel(channelName)
      this.channel
        .join()
        .receive('ok', response => {
          console.log('joined room')
          this.listenForIncomingMessages()
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

  listenForIncomingMessages () {
    this.socket.onMessage(message => {
      const { event, payload, topic, params } = message
      if (topic === 'phoenix' || event === 'phx_reply') return
      reduxEventDispacher({ type: event, payload })
    })
  }

  isSocketConnected () {
    this.socket && this.socket.isConnected()
  }
}

export default Socket
