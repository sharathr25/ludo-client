import staticGameObjects from '../constants/gameObjects'

export function getPlayerHomeInnerSquare (home, margin) {
  return {
    id: `${home.id}IS`,
    x: home.x + margin / 2,
    y: home.y + margin / 2,
    margin
  }
}

const getCentroid = points => {
  return {
    x: (points[0] + points[2] + points[4]) / 3 - 25,
    y: (points[1] + points[3] + points[5]) / 3 - 25
  }
}

export function getPath ({ currentPosition, prevPosition, seat }) {
  const START_SQUARES = [undefined, 1, 14, 27, 40]
  const END_SQUARES = [undefined, 51, 12, 25, 38]
  const BOARD_END_SQUARE = 52
  if (!prevPosition) {
    if (currentPosition.group !== 'WIN_TRIANGLE') {
      return [
        staticGameObjects.find(
          s =>
            (s.seat ? s.seat === seat : true) &&
            s.positionNumber === currentPosition.positionNumber &&
            currentPosition.group === s.group
        )
      ]
    } else {
      const winTriangle = staticGameObjects.find(wt => wt.seat === seat)
      const { points } = winTriangle
      const centroid = getCentroid(points)
      return [{ ...winTriangle, ...centroid }]
    }
  }
  if (prevPosition.group === 'HOME' && currentPosition.group === 'COMMUNITY') {
    return [...range(START_SQUARES[seat], currentPosition.positionNumber)].map(
      n =>
        staticGameObjects.find(
          s => s.positionNumber === n && currentPosition.group === s.group
        )
    )
  }
  if (
    prevPosition.group === 'COMMUNITY' &&
    currentPosition.group === 'HOME_COLUMN'
  ) {
    return [
      ...[...range(prevPosition.positionNumber, END_SQUARES[seat])].map(n =>
        staticGameObjects.find(s => s.positionNumber === n)
      ),
      ...[...range(1, currentPosition.positionNumber)].map(n =>
        staticGameObjects.find(
          s =>
            s.positionNumber === n &&
            s.group === currentPosition.group &&
            s.seat === seat
        )
      )
    ]
  }
  if (
    prevPosition.group === 'COMMUNITY' &&
    currentPosition.group === 'WIN_TRIANGLE'
  ) {
    const winTriangle = staticGameObjects.find(wt => wt.seat === seat)
    const { points } = winTriangle
    const centroid = getCentroid(points)
    return [
      ...[...range(1, 5)].map(n =>
        staticGameObjects.find(
          s =>
            s.positionNumber === n &&
            s.group === 'HOME_COLUMN' &&
            s.seat === seat
        )
      ),
      { ...winTriangle, ...centroid }
    ]
  }
  if (
    prevPosition.group === 'HOME_COLUMN' &&
    currentPosition.group === 'HOME_COLUMN'
  ) {
    return [
      ...range(prevPosition.positionNumber, currentPosition.positionNumber)
    ].map(n =>
      staticGameObjects.find(
        s =>
          s.positionNumber === n &&
          currentPosition.group === s.group &&
          s.seat === seat
      )
    )
  }
  if (
    prevPosition.group === 'HOME_COLUMN' &&
    currentPosition.group === 'WIN_TRIANGLE'
  ) {
    const winTriangle = staticGameObjects.find(
      wt => wt.seat === seat && wt.group === currentPosition.group
    )
    const { points } = winTriangle
    const centroid = getCentroid(points)
    return [
      ...[...range(prevPosition.positionNumber, 5)].map(n =>
        staticGameObjects.find(
          s =>
            s.positionNumber === n &&
            s.group === prevPosition.group &&
            s.seat === seat
        )
      ),
      { ...winTriangle, ...centroid }
    ]
  }

  if (
    prevPosition.positionNumber <= BOARD_END_SQUARE &&
    currentPosition.positionNumber >= 1 &&
    currentPosition.positionNumber !== BOARD_END_SQUARE &&
    prevPosition.positionNumber > currentPosition.positionNumber
  ) {
    return [
      ...[...range(prevPosition.positionNumber, BOARD_END_SQUARE)].map(n =>
        staticGameObjects.find(
          s => s.positionNumber === n && currentPosition.group === s.group
        )
      ),
      ...[...range(1, currentPosition.positionNumber)].map(n =>
        staticGameObjects.find(
          s => s.positionNumber === n && currentPosition.group === s.group
        )
      )
    ]
  }

  return [
    ...range(prevPosition.positionNumber, currentPosition.positionNumber)
  ].map(n =>
    staticGameObjects.find(
      s => s.positionNumber === n && currentPosition.group === s.group
    )
  )
}

export const getRadians = deg => (deg * Math.PI) / 180

export const getDegree = radians => (radians * 180) / Math.PI

export function * range (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}
