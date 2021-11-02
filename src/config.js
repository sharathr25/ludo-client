const LOCALHOST = 'localhost:5000'
const HEROKU = 'thawing-waters-18867.herokuapp.com'

export const WEBSOCKET_URL =
  process.env.NODE_ENV === 'development'
    ? `ws://${LOCALHOST}/socket`
    : `wss://${HEROKU}/socket`

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? `http://${LOCALHOST}`
    : `https://${HEROKU}`
