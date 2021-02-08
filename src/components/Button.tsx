import styled from 'styled-components'

/**
 * ButtonProps type.
 */
export type ButtonProps = {
  fullWidth?: boolean
}

export const Button = styled.button<ButtonProps>`
  display: flex;

  justify-content: center;
  align-items: center;

  font-size: 0.9rem;

  border: none;
  border-radius: 8px;
  outline: none;

  ${(p) => (p.fullWidth ? 'width: 100%;' : 'min-width: 200px;')}
  height: 48px;

  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  background: #00a3ff;
  color: white;

  cursor: pointer;
`
