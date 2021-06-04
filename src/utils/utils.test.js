const { getPath } = require('./utils.js')

describe('getPath', () => {
  test('initially when we have only current position', () => {
    const path = getPath(
      { squareNumber: 1, group: 'HOME', no: 1 },
      undefined,
      1
    )
    expect(path).toHaveLength(1)
    expect(path[0]).toEqual({
      fill: 'white',
      group: 'HOME',
      seat: 1,
      squareNumber: 1,
      stroke: 'white',
      x: 75,
      y: 75
    })
  })
})
