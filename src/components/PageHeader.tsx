import styled from 'styled-components'

const Title = styled.h1`
  text-align: center;
  font-size: 5rem;
  color: #00a3ff;
  margin: 16px 0 0 0;
`

const SharnSubTitle = styled.h2`
  text-align: center;
  font-size: 1rem;
  color: #00a3ff;
  margin: 0 0 32px 0;
`

/**
 * PageHeader component.
 */
export const PageHeader: React.FC = () => {
  return (
    <>
      <div>
        <Title>sharn</Title>
        <SharnSubTitle>テキストを簡単にシェアできるアプリ#BETA</SharnSubTitle>
      </div>
    </>
  )
}
