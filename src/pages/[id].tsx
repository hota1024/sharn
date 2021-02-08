import { NextPage } from 'next'
import Link from 'next/link'
import { Main } from '../components/Main'
import { Content } from '../components/Content'
import { PageHead } from '../components/PageHead'
import { Container } from '../components/Container'
import { PageHeader } from '../components/PageHeader'
import styled from 'styled-components'
import axios from 'axios'
import { Card } from '../components/Card'
import { Text } from '../types/Text'
import { Button } from '../components/Button'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Words = styled.div`
  display: flex;

  margin-bottom: 24px;
`

const Word = styled.div`
  padding: 16px;
  margin: 0 8px;

  border-radius: 8px;

  background: white;

  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
`

const Divider = styled.div`
  margin: 48px 0;

  width: 100%;
  height: 1px;

  border: 1px solid rgba(0, 0, 0, 0.2);
`

/**
 * TextPage component.
 */
export const TextPage: NextPage<{ text?: Text }> = ({ text }) => {
  return (
    <>
      {text ? (
        <>
          <PageHead title={text.id} />

          <Main>
            <Container>
              <Content>
                <PageHeader />

                <Card>
                  <div style={{ margin: '16px' }}>
                    {text.text.split('\n').map((l, k) => (
                      <p key={k}>{l}</p>
                    ))}
                  </div>
                </Card>

                <Link href="/">
                  <Button fullWidth>トップに戻る</Button>
                </Link>

                <Divider />

                <Words>
                  {text.words.map((w, k) => (
                    <Word key={k}>{w}</Word>
                  ))}
                </Words>

                <CopyToClipboard
                  text={`https://sharn.now.sh/${text.id}`}
                  onCopy={() => toast.success('コピーしました')}
                >
                  <Button>リンクをコピー</Button>
                </CopyToClipboard>
              </Content>
            </Container>
          </Main>
          <ToastContainer position="bottom-right" />
        </>
      ) : (
        <>
          <PageHead title="テキストが見つかりませんでした" />

          <Main>
            <Container>
              <Content>
                <PageHeader />

                <h1>テキストが見つかりませんでした</h1>

                <Link href="/">
                  <Button>トップに戻る</Button>
                </Link>
              </Content>
            </Container>
          </Main>
        </>
      )}
    </>
  )
}

TextPage.getInitialProps = async (ctx) => {
  try {
    const { data } = await axios.get(
      'https://sharn.now.sh/api/get?id=' + ctx.query.id
    )

    return {
      text: data,
    }
  } catch {
    return {}
  }
}

export default TextPage
