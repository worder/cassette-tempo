import Head from 'next/head'

import Calc from '../components/Calc';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Calc />
    </div>
  )
}
