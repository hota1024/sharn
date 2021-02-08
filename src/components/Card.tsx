import styled from 'styled-components'

export const Card = styled.div<{ error?: boolean }>`
  width: 100%;
  margin-bottom: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);

  ${({ error }) => error && `background: #f25c45;color: white;`}
`
