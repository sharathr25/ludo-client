import staticGameObjects, {
  BOARD_END_SQUARE,
  END_SQUARES,
  START_SQUARES
} from '../constants/gameObjects'

function * rangeGen (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

const range = (start, end) => {
  return [...rangeGen(start, end)]
}

const getCentroid = ({ points, ...rest }) => {
  const [x1, y1, x2, y2, x3, y3] = points
  return {
    ...rest,
    x: (x1 + x2 + x3) / 3 - 25,
    y: (y1 + y2 + y3) / 3 - 25
  }
}

const seatSelector = seat => s => (s.seat ? s.seat === seat : true)
const groupSelector = group => s => s.group === group
const pathSelector = path => s => path.includes(s.positionNumber)

export function getPlayerHomeInnerSquare (home, margin) {
  return {
    id: `${home.id}IS`,
    x: home.x + margin / 2,
    y: home.y + margin / 2,
    margin
  }
}

export function getPath ({ currentPosition, prevPosition, seat }) {
  // From ORIGIN
  if (prevPosition.group === 'ORIGIN') {
    return staticGameObjects
      .filter(seatSelector(seat))
      .filter(groupSelector(currentPosition.group))
      .filter(pathSelector([currentPosition.positionNumber]))
      .map(currentPosition.group === 'WIN_TRIANGLE' ? getCentroid : s => s)
  }
  // From HOME to COMMUNITY
  if (prevPosition.group === 'HOME' && currentPosition.group === 'COMMUNITY') {
    const pathSquares = range(
      START_SQUARES[seat],
      currentPosition.positionNumber
    )

    return staticGameObjects
      .filter(pathSelector(pathSquares))
      .filter(groupSelector(currentPosition.group))
  }
  // From COMMUNITY to HOME_COLUMN
  if (
    prevPosition.group === 'COMMUNITY' &&
    currentPosition.group === 'HOME_COLUMN'
  ) {
    const pathSquares1 = range(prevPosition.positionNumber, END_SQUARES[seat])
    const pathSquares2 = [...range(1, currentPosition.positionNumber)]

    return [
      ...staticGameObjects.filter(pathSelector(pathSquares1)),
      ...staticGameObjects
        .filter(pathSelector(pathSquares2))
        .filter(groupSelector(currentPosition.group))
        .filter(seatSelector(seat))
    ]
  }
  // From COMMUNITY to WIN_TRIANGLE
  if (
    prevPosition.group === 'COMMUNITY' &&
    currentPosition.group === 'WIN_TRIANGLE'
  ) {
    const squaresFrom1to5 = range(1, 5)

    return [
      ...staticGameObjects
        .filter(pathSelector(squaresFrom1to5))
        .filter(groupSelector('HOME_COLUMN'))
        .filter(seatSelector(seat)),
      ...staticGameObjects
        .filter(seatSelector(seat))
        .filter(groupSelector(currentPosition.group))
        .map(getCentroid)
    ]
  }
  // From HOME_COLUMN to HOME_COLUMN
  if (
    prevPosition.group === 'HOME_COLUMN' &&
    currentPosition.group === 'HOME_COLUMN'
  ) {
    const pathSquares = range(
      prevPosition.positionNumber,
      currentPosition.positionNumber
    )

    return staticGameObjects
      .filter(pathSelector(pathSquares))
      .filter(groupSelector(currentPosition.group))
      .filter(seatSelector(seat))
  }
  // From HOME_COLUMN to WIN_TRIANGLE
  if (
    prevPosition.group === 'HOME_COLUMN' &&
    currentPosition.group === 'WIN_TRIANGLE'
  ) {
    const pathSquares = range(prevPosition.positionNumber, 5)

    return [
      ...staticGameObjects
        .filter(pathSelector(pathSquares))
        .filter(groupSelector(prevPosition.group))
        .filter(seatSelector(seat)),
      ...staticGameObjects
        .filter(groupSelector(currentPosition.group))
        .filter(seatSelector(seat))
        .map(getCentroid)
    ]
  }

  // From COMMUNTI to COMMUNTY(when new position crosses end square)
  if (
    prevPosition.positionNumber <= BOARD_END_SQUARE &&
    currentPosition.positionNumber >= 1 &&
    currentPosition.positionNumber !== BOARD_END_SQUARE &&
    prevPosition.positionNumber > currentPosition.positionNumber
  ) {
    const pathSquares1 = range(prevPosition.positionNumber, BOARD_END_SQUARE)
    const pathSquares2 = range(1, currentPosition.positionNumber)

    return [
      ...staticGameObjects
        .filter(pathSelector(pathSquares1))
        .filter(groupSelector(currentPosition.group)),
      ...staticGameObjects
        .filter(pathSelector(pathSquares2))
        .filter(groupSelector(currentPosition.group))
    ]
  }

  // From COMMUNITY to COMMUNITY
  const pathSquares = range(
    prevPosition.positionNumber,
    currentPosition.positionNumber
  )

  return staticGameObjects
    .filter(pathSelector(pathSquares))
    .filter(groupSelector(currentPosition.group))
}

export const getRadians = deg => (deg * Math.PI) / 180

export const getDegree = radians => (radians * 180) / Math.PI

export const addDistance = ({ xDistance, yDistance = xDistance }) => ({
  x,
  y,
  ...rest
}) => ({
  ...rest,
  x: x + xDistance,
  y: y + yDistance
})
