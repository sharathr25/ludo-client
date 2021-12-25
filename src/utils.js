function * rangeGen (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

export const range = (start, end) => {
  return [...rangeGen(start, end)]
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

export const px2vw = (size, width = window.innerWidth) =>
  `${(size / width) * 100}vw`
