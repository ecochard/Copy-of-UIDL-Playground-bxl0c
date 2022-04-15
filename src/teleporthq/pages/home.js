import React from 'react'

import { Helmet } from 'react-helmet'

import styles from './home.module.css'

const Home = (props) => {
  return (
    <div className={styles['container']}>
      <Helmet>
        <title>Copy of UIDL Playground</title>
        <meta property="og:title" content="Copy of UIDL Playground" />
      </Helmet>
      <span>UIDL DEMO</span>
    </div>
  )
}

export default Home
