const { getPath } = require('./utils.js')

describe('getPath', () => {
  test('initially when we have only current position', () => {
    const path = getPath({
      currentPosition: { squareNumber: 1, group: 'HOME', no: 1 },
      prevPosition: undefined,
      seat: 1
    })
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
  test('when we need to move from home to community square', () => {
    const path = getPath({
      currentPosition: { squareNumber: 6, group: 'COMMUNITY', no: 1 },
      prevPosition: { squareNumber: 1, group: 'HOME', no: 1 },
      seat: 1
    })
    expect(path).toHaveLength(6)
    expect(path).toEqual([
      {
        fill: 'white',
        group: 'HOME',
        seat: 1,
        squareNumber: 1,
        stroke: 'white',
        x: 75,
        y: 75
      },
      {
        fill: 'white',
        group: 'HOME',
        seat: 1,
        squareNumber: 2,
        stroke: 'white',
        x: 175,
        y: 175
      },
      {
        fill: 'white',
        group: 'HOME',
        seat: 1,
        squareNumber: 3,
        stroke: 'white',
        x: 175,
        y: 75
      },
      {
        fill: 'white',
        group: 'HOME',
        seat: 1,
        squareNumber: 4,
        stroke: 'white',
        x: 75,
        y: 175
      },
      {
        fill: '#ea5455',
        group: 'HOME_COLUMN',
        seat: 1,
        squareNumber: 5,
        x: 250,
        y: 350
      },
      { group: 'COMMUNITY', squareNumber: 6, x: 300, y: 250 }
    ])
  })
  test('when we need to move from community to community square', () => {
    const path = getPath({
      currentPosition: { squareNumber: 10, group: 'COMMUNITY', no: 1 },
      prevPosition: { squareNumber: 6, group: 'COMMUNITY', no: 1 },
      seat: 1
    })
    expect(path).toHaveLength(5)
    expect(path).toEqual([
      { group: 'COMMUNITY', squareNumber: 6, x: 300, y: 250 },
      { group: 'COMMUNITY', squareNumber: 7, x: 300, y: 200 },
      { group: 'COMMUNITY', squareNumber: 8, x: 300, y: 150 },
      { group: 'COMMUNITY', squareNumber: 9, x: 300, y: 100 },
      { group: 'COMMUNITY', squareNumber: 10, x: 300, y: 50 }
    ])
  })
  test('when we need to move from community to home column square', () => {
    const path = getPath({
      currentPosition: { squareNumber: 2, group: 'HOME_COLUMN', no: 1 },
      prevPosition: { squareNumber: 48, group: 'COMMUNITY', no: 1 },
      seat: 1
    })
    expect(path).toHaveLength(6)
    expect(path).toEqual([
      { group: 'COMMUNITY', squareNumber: 48, x: 100, y: 400 },
      { group: 'COMMUNITY', squareNumber: 49, x: 50, y: 400 },
      { group: 'COMMUNITY', squareNumber: 50, x: 0, y: 400 },
      { group: 'COMMUNITY', squareNumber: 51, x: 0, y: 350 },
      {
        fill: '#ea5455',
        group: 'HOME_COLUMN',
        seat: 1,
        squareNumber: 1,
        x: 50,
        y: 350
      },
      {
        fill: '#ea5455',
        group: 'HOME_COLUMN',
        seat: 1,
        squareNumber: 2,
        x: 100,
        y: 350
      }
    ])
  })
  test('when we need to move from community to home column square for seats other than 1', () => {
    const path = getPath({
      currentPosition: { squareNumber: 2, group: 'HOME_COLUMN', no: 1 },
      prevPosition: { squareNumber: 9, group: 'COMMUNITY', no: 1 },
      seat: 2
    })
    expect(path).toHaveLength(6)
    expect(
      path.map(p => ({ group: p.group, squareNumber: p.squareNumber }))
    ).toEqual([
      { group: 'COMMUNITY', squareNumber: 9 },
      { group: 'COMMUNITY', squareNumber: 10 },
      { group: 'COMMUNITY', squareNumber: 11 },
      { group: 'COMMUNITY', squareNumber: 12 },
      {
        group: 'HOME_COLUMN',
        squareNumber: 1
      },
      {
        group: 'HOME_COLUMN',
        squareNumber: 2
      }
    ])
  })
  test('when we need to move from home column to win triangle', () => {
    const path = getPath({
      currentPosition: { group: 'WIN_TRIANGLE', no: 1 },
      prevPosition: { squareNumber: 2, group: 'HOME_COLUMN', no: 1 },
      seat: 2
    })
    expect(path).toHaveLength(5)
    expect(
      path.map(p => ({ group: p.group, squareNumber: p.squareNumber }))
    ).toEqual([
      { group: 'HOME_COLUMN', squareNumber: 2 },
      { group: 'HOME_COLUMN', squareNumber: 3 },
      { group: 'HOME_COLUMN', squareNumber: 4 },
      { group: 'HOME_COLUMN', squareNumber: 5 },
      {
        group: 'WIN_TRIANGLE'
      }
    ])
  })
})
