import Head from 'next/head'

/**
 * PageHeadProps type.
 */
export type PageHeadProps = {
  /**
   * page title.
   */
  title?: string
}

/**
 * PageHead component.
 */
export const PageHead: React.FC<PageHeadProps> = (props) => {
  return (
    <Head>
      <title>{props.title ? `${props.title} | sharn` : 'sharn'}</title>
      <meta name="description" content="テキストを簡単にシェアできるアプリ" />
    </Head>
  )
}
