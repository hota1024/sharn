import { NextPage } from 'next'
import Link from 'next/link'
import { PageHead } from '../components/PageHead'
import { Main } from '../components/Main'
import { Container } from '../components/Container'
import { PageHeader } from '../components/PageHeader'
import { Editor } from '../components/Editor'
import { useState } from 'react'
import { Button } from '../components/Button'
import { Content } from '../components/Content'
import { Card } from '../components/Card'
import axios, { AxiosError } from 'axios'
import { MAX_COUNT } from '../constants/MAX_COUNT'

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  const [text, setText] = useState('')
  const [error, setError] = useState<undefined | string>()
  const maxTextLength = MAX_COUNT

  const storeText = async () => {
    setError(undefined)
    await axios
      .post('/api/store', {
        text,
      })
      .then((r) => {
        console.log(r.data)
      })
      .catch((e: AxiosError<{ error: { message: string } }>) => {
        setError(e.response.data.error.message)
      })
  }

  return (
    <>
      <PageHead />

      <Main>
        <Container>
          <Content>
            <PageHeader />
            {error && (
              <Card error>
                <div style={{ margin: '16px' }}>{error}</div>
              </Card>
            )}
            <Editor
              name="text-input"
              placeholder={`共有するテキスト（${maxTextLength}文字以内）\nhttps://~からはじまるテキストはリンクとして扱われます。`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={maxTextLength}
            />
            <Card>
              <ul>
                <li>有効期限は24時間です</li>
                <li>
                  シェアする前に
                  <Link href="/terms-of-use">
                    <a>利用規約</a>
                  </Link>
                  をご確認ください
                </li>
              </ul>
            </Card>
            <div style={{ width: '100%' }}>
              <Button fullWidth onClick={storeText}>
                利用規約 に同意してシェアする
              </Button>
            </div>
          </Content>
        </Container>
      </Main>

      <style jsx>{`
        a {
          color: #00a3ff;
        }
      `}</style>
    </>
  )
}

export default HomePage
