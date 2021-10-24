const host = '192.168.1.33:5000' // host address when connected to wifi to check in mobile
// const host = 'localhost:5000'
export const WEBSOCKET_URL =
  process.env.NODE_ENV === 'development'
    ? `ws://${host}/socket`
    : 'wss://thawing-waters-18867.herokuapp.com/socket'

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:5000`
    : 'https://thawing-waters-18867.herokuapp.com'
