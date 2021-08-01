import staticGameObjects from '../constants/gameObjects'

export function getPlayerHomeInnerSquare (home, margin) {
  return {
    id: `${home.id}IS`,
    x: home.x + margin / 2,
    y: home.y + margin / 2,
    margin
  }
}

const getCentroid = ({ points, ...rest }) => {
  return {
    ...rest,
    x: (points[0] + points[2] + points[4]) / 3 - 25,
    y: (points[1] + points[3] + points[5]) / 3 - 25
  }
}

export function getPath ({ currentPosition, prevPosition, seat }) {
  const START_SQUARES = [undefined, 1, 14, 27, 40]
  const END_SQUARES = [undefined, 51, 12, 25, 38]
  const BOARD_END_SQUARE = 52
  if (prevPosition.group === 'ORIGIN') {
    if (currentPosition.group === 'WIN_TRIANGLE') {
      return staticGameObjects.filter(wt => wt.seat === seat).map(getCentroid)
    } else {
      return staticGameObjects.filter(
        s =>
          (s.seat ? s.seat === seat : true) &&
          s.positionNumber === currentPosition.positionNumber &&
          currentPosition.group === s.group
      )
    }
  }
  if (prevPosition.group === 'HOME' && currentPosition.group === 'COMMUNITY') {
    const pathSquares = [
      ...range(START_SQUARES[seat], currentPosition.positionNumber)
    ]
    return staticGameObjects.filter(
      s =>
        pathSquares.includes(s.positionNumber) &&
        currentPosition.group === s.group
    )
  }
  if (
    prevPosition.group === 'COMMUNITY' &&
    currentPosition.group === 'HOME_COLUMN'
  ) {
    const pathSquares1 = [
      ...range(prevPosition.positionNumber, END_SQUARES[seat])
    ]
    const pathSquares2 = [...range(1, currentPosition.positionNumber)]
    return [
      ...staticGameObjects.filter(s => pathSquares1.includes(s.positionNumber)),
      ...staticGameObjects.filter(
        s =>
          pathSquares2.includes(s.positionNumber) &&
          s.group === currentPosition.group &&
          s.seat === seat
      )
    ]
  }
  if (
    prevPosition.group === 'COMMUNITY' &&
    currentPosition.group === 'WIN_TRIANGLE'
  ) {
    const squaresFrom1to5 = [...range(1, 5)]
    return [
      ...staticGameObjects.filter(
        s =>
          squaresFrom1to5.includes(s.positionNumber) &&
          s.group === 'HOME_COLUMN' &&
          s.seat === seat
      ),
      ...staticGameObjects.filter(wt => wt.seat === seat).map(getCentroid)
    ]
  }
  if (
    prevPosition.group === 'HOME_COLUMN' &&
    currentPosition.group === 'HOME_COLUMN'
  ) {
    const pathSquares = [
      ...range(prevPosition.positionNumber, currentPosition.positionNumber)
    ]
    return staticGameObjects.filter(
      s =>
        pathSquares.includes(s.positionNumber) &&
        currentPosition.group === s.group &&
        s.seat === seat
    )
  }
  if (
    prevPosition.group === 'HOME_COLUMN' &&
    currentPosition.group === 'WIN_TRIANGLE'
  ) {
    const pathSquares = [...range(prevPosition.positionNumber, 5)]
    return [
      ...staticGameObjects.filter(
        s =>
          pathSquares.includes(s.positionNumber) &&
          s.group === prevPosition.group &&
          s.seat === seat
      ),
      ...staticGameObjects
        .filter(wt => wt.seat === seat && wt.group === currentPosition.group)
        .map(getCentroid)
    ]
  }

  if (
    prevPosition.positionNumber <= BOARD_END_SQUARE &&
    currentPosition.positionNumber >= 1 &&
    currentPosition.positionNumber !== BOARD_END_SQUARE &&
    prevPosition.positionNumber > currentPosition.positionNumber
  ) {
    const pathSquares1 = [
      ...range(prevPosition.positionNumber, BOARD_END_SQUARE)
    ]
    const pathSquares2 = [...range(1, currentPosition.positionNumber)]
    return [
      ...staticGameObjects.filter(
        s =>
          pathSquares1.includes(s.positionNumber) &&
          currentPosition.group === s.group
      ),
      ...staticGameObjects.filter(
        s =>
          pathSquares2.includes(s.positionNumber) &&
          currentPosition.group === s.group
      )
    ]
  }

  const pathSquares = [
    ...range(prevPosition.positionNumber, currentPosition.positionNumber)
  ]
  return staticGameObjects.filter(
    s =>
      pathSquares.includes(s.positionNumber) &&
      currentPosition.group === s.group
  )
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

export function * range (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}
