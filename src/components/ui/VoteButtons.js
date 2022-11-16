import React from 'react'
import { css } from '@emotion/react'

const VoteButtons = () => (
  <ul
    css={css`
      display: flex;
      justify-content: space-between;
    `}
  >
    <li>
      <button>동의합니다</button>
    </li>
    <li>
      <button>동의하지 않습니다</button>
    </li>
  </ul>
)

export default VoteButtons
