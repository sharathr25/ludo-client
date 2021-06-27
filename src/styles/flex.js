import { css } from 'styled-components'

export const flexCentered = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const flexColumnCentered = css`
  ${flexCentered}
  flex-direction: column;
`

export const flexCenteredWrap = css`
  ${flexCentered}
  flex-wrap: wrap;
`
