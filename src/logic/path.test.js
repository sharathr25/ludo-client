import { getPath } from './path'

describe('getPath', () => {
  test('initially when we have only current position', () => {
    const path = getPath({
      currentPosition: { positionNumber: 1, group: 'HOME', no: 1 },
      prevPosition: { group: 'ORIGIN' },
      seat: 1,
      boardSize: 750
    })
    expect(path).toHaveLength(1)
    expect(path[0]).toEqual({
      fill: '#FF0202',
      group: 'HOME',
      seat: 1,
      positionNumber: 1,
      x: 75,
      y: 75
    })
  })
  test('when we need to move from home to community square', () => {
    const path = getPath({
      currentPosition: { positionNumber: 6, group: 'COMMUNITY', no: 1 },
      prevPosition: { positionNumber: 1, group: 'HOME', no: 1 },
      seat: 1,
      boardSize: 750
    })
    expect(path).toHaveLength(6)
    expect(path).toEqual([
      { fill: '#FF0202', group: 'COMMUNITY', positionNumber: 1, x: 50, y: 300 },
      { fill: null, group: 'COMMUNITY', positionNumber: 2, x: 100, y: 300 },
      { fill: null, group: 'COMMUNITY', positionNumber: 3, x: 150, y: 300 },
      { fill: null, group: 'COMMUNITY', positionNumber: 4, x: 200, y: 300 },
      { fill: null, group: 'COMMUNITY', positionNumber: 5, x: 250, y: 300 },
      { group: 'COMMUNITY', positionNumber: 6, x: 300, y: 250 }
    ])
  })
  test('when we need to move from community to community square', () => {
    const path = getPath({
      currentPosition: { positionNumber: 10, group: 'COMMUNITY', no: 1 },
      prevPosition: { positionNumber: 6, group: 'COMMUNITY', no: 1 },
      seat: 1,
      boardSize: 750
    })
    expect(path).toHaveLength(5)
    expect(path).toEqual([
      { group: 'COMMUNITY', positionNumber: 6, x: 300, y: 250 },
      { group: 'COMMUNITY', positionNumber: 7, x: 300, y: 200 },
      { group: 'COMMUNITY', positionNumber: 8, x: 300, y: 150 },
      { group: 'COMMUNITY', positionNumber: 9, x: 300, y: 100 },
      { group: 'COMMUNITY', positionNumber: 10, x: 300, y: 50 }
    ])
  })
  test('when we need to move from community to home column square', () => {
    const path = getPath({
      currentPosition: { positionNumber: 2, group: 'HOME_COLUMN', no: 1 },
      prevPosition: { positionNumber: 48, group: 'COMMUNITY', no: 1 },
      seat: 1,
      boardSize: 750
    })
    expect(path).toHaveLength(6)
    expect(path).toEqual([
      { group: 'COMMUNITY', positionNumber: 48, x: 100, y: 400 },
      { group: 'COMMUNITY', positionNumber: 49, x: 50, y: 400 },
      { group: 'COMMUNITY', positionNumber: 50, x: 0, y: 400 },
      { group: 'COMMUNITY', positionNumber: 51, x: 0, y: 350 },
      {
        fill: '#FF0202',
        group: 'HOME_COLUMN',
        positionNumber: 1,
        seat: 1,
        x: 50,
        y: 350
      },
      {
        fill: '#FF0202',
        group: 'HOME_COLUMN',
        positionNumber: 2,
        seat: 1,
        x: 100,
        y: 350
      }
    ])
  })
  test('when we need to move from community to home column square for seats other than 1', () => {
    const path = getPath({
      currentPosition: { positionNumber: 2, group: 'HOME_COLUMN', no: 1 },
      prevPosition: { positionNumber: 9, group: 'COMMUNITY', no: 1 },
      seat: 2,
      boardSize: 750
    })
    expect(path).toHaveLength(6)
    expect(
      path.map(p => ({ group: p.group, positionNumber: p.positionNumber }))
    ).toEqual([
      { group: 'COMMUNITY', positionNumber: 9 },
      { group: 'COMMUNITY', positionNumber: 10 },
      { group: 'COMMUNITY', positionNumber: 11 },
      { group: 'COMMUNITY', positionNumber: 12 },
      {
        group: 'HOME_COLUMN',
        positionNumber: 1
      },
      {
        group: 'HOME_COLUMN',
        positionNumber: 2
      }
    ])
  })
  test('when we need to move from home column to win triangle', () => {
    const path = getPath({
      currentPosition: { group: 'WIN_TRIANGLE', no: 1, positionNumber: 1 },
      prevPosition: { positionNumber: 2, group: 'HOME_COLUMN', no: 1 },
      seat: 2,
      boardSize: 750
    })
    expect(path).toHaveLength(5)
    expect(
      path.map(p => ({ group: p.group, positionNumber: p.positionNumber }))
    ).toEqual([
      { group: 'HOME_COLUMN', positionNumber: 2 },
      { group: 'HOME_COLUMN', positionNumber: 3 },
      { group: 'HOME_COLUMN', positionNumber: 4 },
      { group: 'HOME_COLUMN', positionNumber: 5 },
      {
        group: 'WIN_TRIANGLE',
        positionNumber: 1
      }
    ])
  })
})
