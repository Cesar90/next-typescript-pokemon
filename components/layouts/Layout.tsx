import React from 'react'
import Head from 'next/head'
import { FC } from 'react'
import { Navbar } from '@components/ui'

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

interface IProps{
  title?: string
}

export const Layout:FC<IProps> = ({ children, title }) => {

  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name="author" content="Cesar Cordero" />
        <meta name="description" content="Information about pokemon" />
        <meta name="keywords" content={`${ title }, pokemon, pokedex`} />
        <meta property="og:title" content={`Information about ${ title }`} />
        <meta property="og:description" content={`This is image ${ title }`} />
        <meta property="og:image" content={`${ origin }/img/banner.png`} />
      </Head>

      <Navbar />

      {/* Navbar */}
      <main style={{
        padding: '0px 20px'
      }}>
        { children }
      </main>
    </>
  )
}
